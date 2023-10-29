//
// Created by Administrator on 03/08/2023.
//

#include "Helper.h"
#include <iomanip>
#include <chrono>
#include <iostream>
#include <sstream>

static const std::string base64_chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz"
        "0123456789+/";

static inline bool is_base64(char c) {
    return (isalnum(c) || (c == '+') || (c == '/'));
}

char* Helper::ToCharArr(const std::string& text){
    auto result = new char[text.size() + 1];
    result[text.size()] = 0;
    memcpy_s(result, text.size() + 1, text.data(), text.size());
    return result;
}

std::string Helper::Base64Encode(const std::string& data) {
    std::string ret;
    int i = 0;
    int j = 0;
    char char_array_3[3];
    char char_array_4[4];

    const char* buf = data.c_str();
    size_t bufLen = data.length();

    while (bufLen--) {
        char_array_3[i++] = *(buf++);
        if (i == 3) {
            char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
            char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
            char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
            char_array_4[3] = char_array_3[2] & 0x3f;

            for(i = 0; (i <4) ; i++)
                ret += base64_chars[char_array_4[i]];
            i = 0;
        }
    }

    if (i)
    {
        for(j = i; j < 3; j++)
            char_array_3[j] = '\0';

        char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
        char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
        char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
        char_array_4[3] = char_array_3[2] & 0x3f;

        for (j = 0; (j < i + 1); j++)
            ret += base64_chars[char_array_4[j]];

        while((i++ < 3))
            ret += '=';
    }

    return ret;
}

std::string Helper::Base64Decode(const std::string& encoded_string) {
    int in_len = encoded_string.size();
    int i = 0;
    int j = 0;
    int in_ = 0;
    char char_array_4[4], char_array_3[3];
    std::vector<char> ret;

    while (in_len-- && ( encoded_string[in_] != '=') && is_base64(encoded_string[in_])) {
        char_array_4[i++] = encoded_string[in_]; in_++;
        if (i ==4) {
            for (i = 0; i <4; i++)
                char_array_4[i] = base64_chars.find(char_array_4[i]);

            char_array_3[0] = (char_array_4[0] << 2) + ((char_array_4[1] & 0x30) >> 4);
            char_array_3[1] = ((char_array_4[1] & 0xf) << 4) + ((char_array_4[2] & 0x3c) >> 2);
            char_array_3[2] = ((char_array_4[2] & 0x3) << 6) + char_array_4[3];

            for (i = 0; (i < 3); i++)
                ret.push_back(char_array_3[i]);
            i = 0;
        }
    }

    if (i) {
        for (j = i; j <4; j++)
            char_array_4[j] = 0;

        for (j = 0; j <4; j++)
            char_array_4[j] = base64_chars.find(char_array_4[j]);

        char_array_3[0] = (char_array_4[0] << 2) + ((char_array_4[1] & 0x30) >> 4);
        char_array_3[1] = ((char_array_4[1] & 0xf) << 4) + ((char_array_4[2] & 0x3c) >> 2);
        char_array_3[2] = ((char_array_4[2] & 0x3) << 6) + char_array_4[3];

        for (j = 0; (j < i - 1); j++) ret.push_back(char_array_3[j]);
    }

    std::string res;
    res.reserve(ret.size());

    for(auto& b : ret)
        res.push_back(b);

    return res;
}

time_t Helper::ToUnix(const std::string& date, const std::string&& format) {
    std::tm t = {};
    std::istringstream ss(date);
    ss.imbue(std::locale("pt_BR.UTF-8"));
    ss >> std::get_time(&t, format.c_str());
    return mktime(&t);
}

time_t Helper::GetCurrentUnix(){
    std::time_t t = std::time(nullptr);
    return t;
}

double Helper::ParseNumber(const nlohmann::json& json) {
    if(json.is_number())
        return double(json);

    return std::stod(std::string(json));
}

long long int GetUnixTime(){
    auto unix_timestamp = std::chrono::seconds(std::time(nullptr));
    auto unix_timestamp_x_1000 = std::chrono::milliseconds(unix_timestamp).count();
    return unix_timestamp_x_1000;
}