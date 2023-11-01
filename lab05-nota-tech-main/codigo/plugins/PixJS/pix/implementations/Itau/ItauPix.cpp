//
// Created by Administrator on 19/07/2023.
//

#include "ItauPix.h"
#include "nlohmann/json.hpp"
#include <fstream>
#include "../../Helper.h"

long long int GetUnixTime();

std::string ItauPix::GetToken(Pix::RawData& pd) {
    if(!tokens.contains(pd.key) ||
       GetUnixTime() >= tokens[pd.key].expiredAt)
    {
        auto svCredentials =
            Helper::Base64Encode(std::string(pd.key) + ":" + pd.password);

        auto response = Request("https://sts.itau.com.br/api/oauth/token")
            .Method(Request::Type::POST)
            .Payload(std::string("grant_type=client_credentials&client_id=") + pd.key + "&client_secret=" + pd.password)
            .Pfx(Helper::Base64Decode(pd.pfx), pd.pfxPassword)
            .Perform();

        try {
            nlohmann::json result = nlohmann::json::parse(response);

            if(!result.contains("access_token"))
                throw std::invalid_argument("Invalid");

            int expires_in = result["expires_in"];

            auto expiredAt = GetUnixTime() + ((expires_in - 10) * 1000);

            Token token {
                .data = result["access_token"],
                .expiredAt = expiredAt
            };

            tokens.insert(std::make_pair(pd.key, token));
        } catch (...){
            return "";
        }
    }

    return tokens[pd.key].data;
}

Request ItauPix::GetRequest(Pix::RawData& pd){
    std::string url =
        std::string("https://secure.api.itau/pix_recebimentos/v2/cob/") +
        pd.seq;

    auto token = ItauPix::GetToken(pd);

    if(token.empty())
        throw std::invalid_argument("Token invalido");

    auto request = Pix::Create(url, token, pd)
        .Headers({{ "x-itau-apikey", pd.key }})
        .Pfx(Helper::Base64Decode(pd.pfx), pd.pfxPassword);

    return request;
}

Pix::Result ItauPix::ProcessRequest(Request& request) {
    auto res = request.Perform();
    nlohmann::json resJson = nlohmann::json::parse(res);

    if(!resJson.contains("pixCopiaECola"))
        throw std::invalid_argument("Chave invalida");

    std::string data = resJson["pixCopiaECola"];
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

Pix::Result ItauPix::Generate(Pix::RawData pd) {
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

Pix::Information ItauPix::Get(Pix::RawData pd) {
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

        int secs = (int) Helper::ParseNumber(resJson["calendario"]["expiracao"]);

        auto isExpired = Helper::GetCurrentUnix() > createdAt + secs;

        return Information {
            .seq = pd.seq,
            .status = isPaid ? Pix::Status::PAID : (
                isExpired ? Pix::Status::EXPIRED : Pix::Status::PENDING
            ),
            .original = original,
            .paid = paid,
            .hour = hour
        };
    } catch (...){
        return Information {
            .status = Pix::Status::ERRO,
            .original = 0,
            .paid = 0
        };
    }
}

void ItauPix::Edit(Pix::RawData pd) {
    try {
        GetRequest(pd)
            .Method(Request::Type::PATCH)
            .Perform();
    } catch (...){}
}

Pix::Payment ItauPix::IsPaid(Pix::RawData pd) {
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

std::unordered_map<std::string, ItauPix::Token> ItauPix::tokens = std::unordered_map<std::string, ItauPix::Token>();