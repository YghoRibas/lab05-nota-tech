//
// Created by Administrator on 03/08/2023.
//

#pragma once

#include <string>
#include <cctype>
#include <vector>
#include <nlohmann/json.hpp>

class Helper {
public:
    static std::string Base64Encode(const std::string&);

    static std::string Base64Decode(const std::string&);

    static time_t ToUnix(const std::string& date, const std::string&& format);

    static time_t GetCurrentUnix();

    static char* ToCharArr(const std::string&);

    static double ParseNumber(const nlohmann::json &);
};