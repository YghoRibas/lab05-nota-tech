//
// Created by Administrator on 19/07/2023.
//

#include "SicoobPix.h"
#include "nlohmann/json.hpp"
#include <fstream>
#include "../../Helper.h"

long long int GetUnixTime();

std::string SicoobPix::GetToken(const std::string& key, const std::string& pfx, const std::string& pfxPassword) {
    if(!tokens.contains(key) ||
        GetUnixTime() >= tokens[key].expiredAt)
    {
        std::string perms = std::string("grant_type=client_credentials&scope=cob.write cob.read pix.read pix.write&client_id=") + key;

        auto response = Request("https://auth.sicoob.com.br/auth/realms/cooperado/protocol/openid-connect/token")
            .Method(Request::Type::POST)
            .Payload(perms)
            .Pfx(Helper::Base64Decode(pfx), pfxPassword)
            .Perform();

        try {
            nlohmann::json result = nlohmann::json::parse(response);

            int expires_in = result["expires_in"];

            auto expiredAt = GetUnixTime() + ((expires_in - 10) * 1000);

            Token token {
                .data = result["access_token"],
                .expiredAt = expiredAt
            };

            tokens.insert(std::make_pair(key, token));
        } catch (...){
            return "";
        }
    }

    return tokens[key].data;
}

Request SicoobPix::GetRequest(Pix::RawData& pd){
    std::string url =
        std::string("https://api.sicoob.com.br/pix/api/v2/cob/") +
        pd.seq;

    auto token = SicoobPix::GetToken(pd.key, pd.pfx, pd.pfxPassword);

    if(token.empty())
        throw std::invalid_argument("Token invalido");

    auto request = Pix::Create(url, token, pd)
        .Pfx(Helper::Base64Decode(pd.pfx), pd.pfxPassword)
        .Headers({{ "client_id", pd.key }});

    return request;
}

Pix::Result SicoobPix::ProcessRequest(Request& request) {
    nlohmann::json resJson = nlohmann::json::parse(request.Perform());

    if(!resJson.contains("brcode"))
        throw std::invalid_argument("Chave invalida");

    std::string data = resJson["brcode"];
    auto qrCode = Pix::QrCodePng(data);
    auto image = Helper::ToCharArr(qrCode);

    AddContent(image);

    auto line = Helper::ToCharArr(data);

    AddContent(line);

    return Result {
        .image = image,
        .size = static_cast<int>(qrCode.size()),
        .line = line
    };
}

Pix::Result SicoobPix::Generate(Pix::RawData pd) {
    try {
        auto request = GetRequest(pd);

        return ProcessRequest(request);
    } catch (...){
        return Result {
            .image = nullptr,
            .size = 0
        };
    }
}

static std::tuple<std::string, double> CalculatePaid(const nlohmann::json& json){
    double paid = 0;

    std::string hour;

    if(json.contains("pix"))
        for(auto& pix : json["pix"]){
            double amount = Helper::ParseNumber(pix["valor"]);

            paid += amount;

            hour = pix["horario"];
        }

    return { hour, paid };
}

Pix::Information SicoobPix::Get(Pix::RawData pd) {
    double original, paid = 0;

    char* hour = nullptr;

    try {
        auto response = GetRequest(pd)
            .Method(Request::Type::GET)
            .Perform();

        nlohmann::json resJson = nlohmann::json::parse(response);

        original = Helper::ParseNumber(resJson["valor"]["original"]);

        auto paidInfo = CalculatePaid(resJson);

        paid = std::get<1>(paidInfo);

        if(paid > 0) {
            auto paidHour = std::get<0>(paidInfo);

            hour = Helper::ToCharArr(paidHour);

            AddContent(hour);
        }

        auto isPaid = original == paid;

        auto createdAt = Helper::ToUnix(
            std::string(resJson["calendario"]["criacao"]),
            "%Y-%m-%dT%H:%M:%S"
        );

        int secs = int(resJson["calendario"]["expiracao"]);

        auto isExpired = createdAt + secs > Helper::GetCurrentUnix();

        return Information {
            .seq = pd.seq,
            .status = isPaid ? Pix::Status::PAID : (
                isExpired ? Pix::Status::EXPIRED : Pix::Status::PENDING
            ),
            .original = original,
            .paid = paid,
            .hour = hour,
        };
    } catch (...){
        return Information {
            .status = Pix::Status::ERRO,
            .original = 0,
            .paid = 0
        };
    }
}

void SicoobPix::Edit(Pix::RawData pd) {
    try {
        GetRequest(pd)
            .Method(Request::Type::PATCH)
            .Perform();
    } catch (...){}
}

Pix::Payment SicoobPix::IsPaid(Pix::RawData pd) {
    double original = 0, paid = 0;

    try {
        auto response = GetRequest(pd)
            .Method(Request::Type::GET)
            .Perform();

        nlohmann::json resJson = nlohmann::json::parse(response);

        original = Helper::ParseNumber(resJson["valor"]["original"]);

        paid = std::get<1>(CalculatePaid(resJson));
    } catch (...){}

    return Payment {
        .original = original,
        .paid = paid
    };
}

std::unordered_map<std::string, SicoobPix::Token> SicoobPix::tokens = std::unordered_map<std::string, SicoobPix::Token>();