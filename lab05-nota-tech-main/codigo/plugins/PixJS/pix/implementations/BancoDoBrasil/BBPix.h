//
// Created by Administrator on 19/07/2023.
//

#pragma once
#include "Pix.h"
#include <unordered_map>
#include <string>

class BBPix : public Pix {
public:
    BBPix() = default;

    Result Generate(Pix::RawData) override;

    Information Get(Pix::RawData) override;

    Payment IsPaid(Pix::RawData) override;

    void Edit(Pix::RawData) override;

private:
    struct Token {
        std::string data;
        long long expiredAt;
    };

    static std::unordered_map<std::string, Token> tokens;

    static std::string GetToken(const std::string& key, const std::string& credentials);

    static Request GetRequest(Pix::RawData&);

    Result ProcessRequest(Request&);
};