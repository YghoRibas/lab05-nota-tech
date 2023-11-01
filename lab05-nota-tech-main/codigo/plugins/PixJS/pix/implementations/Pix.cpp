//
// Created by Administrator on 19/07/2023.
//

#include "Pix.h"
#include "../libs/QrToPng/src/QrToPng.h"
#include "BancoDoBrasil/BBPix.h"
#include "Sicoob/SicoobPix.h"
#include "Bradesco/BradescoPix.h"
#include "Itau/ItauPix.h"
#include <nlohmann/json.hpp>


void Pix::AddContent(char* result) {
    contents.push_back(std::shared_ptr<char>(result));
}

std::string Pix::QrCodePng(const std::string& text) {
    auto qrPng = QrToPng(250, 3, text, qrcodegen::QrCode::Ecc::HIGH);
    return qrPng.getPNG();
}

void Pix::Clear() {
    contents.clear();
}

Request Pix::Create(std::string_view url, std::string_view token, Pix::RawData& pd) {
    Request request = std::string(url.data());

    auto description =
        std::string("Pagamento de servicos ") +
        std::string(pd.seq);

    std::stringstream price;
    price << std::fixed << std::setprecision(2) << pd.price;

    auto payload =
    (nlohmann::json {
        {"calendario", {
           {"expiracao", 8640000}
        }},
        {"valor", {
           {"original", price.str()}
        }},
        {"chave", pd.pixKey},
        {"solicitacaoPagador", description}
    }).dump();

    return request
        .Headers({
            { "Authorization", std::string("Bearer ") + std::string(token) },
            { "Accept", "application/json" },
            { "Accept-Encoding", "br" },
            { "Content-Type", "application/json" }
        })
        .Method(Request::Type::PUT)
        .Payload(std::string(payload));
}

Pix::Result Pix::Generate(const Pix::Data& data) {
    return Generate(RawData {
        .key = const_cast<char*>(data.key.data()),
        .password = const_cast<char*>(data.password.data()),
        .seq = const_cast<char*>(data.seq.data()),
        .price = data.price,
        .pixKey = const_cast<char*>(data.pixKey.data()),
        .appKey = const_cast<char*>(data.appKey.data()),
        .pfx = const_cast<char*>(data.pfx.data()),
        .pfxPassword = const_cast<char*>(data.pfxPassword.data()),
    });
}

Pix* PixFor(PixImps imp) {
    Pix* result = nullptr;

    switch (imp) {
        case PixImps::BancoDoBrasil:
            result = new BBPix();
            break;

        case PixImps::Sicoob:
            result = new SicoobPix();
            break;

        case PixImps::Bradesco:
            result = new BradescoPix();
            break;

        case PixImps::Itau:
            result = new ItauPix();
            break;
    }

    return result;
}