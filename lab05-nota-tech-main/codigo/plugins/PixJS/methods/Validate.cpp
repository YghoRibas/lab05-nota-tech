//
// Created by Administrator on 28/08/2023.
//

#include "Validate.h"
Pix::Data Validate(const Napi::CallbackInfo& info) {
    if (info.Length() != 2)
        throw std::invalid_argument("Expected a ENUM, PixData argument");

    if (!info[0].IsNumber())
        throw std::invalid_argument("First argument must be an ENUM");

    if (!info[1].IsObject())
        throw std::invalid_argument("Second argument must be an PixData");

    auto data = info[1].As<Napi::Object>();

    /*START: Check credentials key/password*/
    auto key = data.Get("Key");
    auto password = data.Get("Password");

    if(!key.IsString() ||
       !password.IsString())
        throw std::invalid_argument("Pix Key/Password must be strings");
    /*END*/

    /*START: Check sequence/price/pixKey*/
    auto seq = data.Get("Sequence");
    auto price = data.Get("Price");
    auto pixKey = data.Get("PixKey");

    if(!seq.IsString() ||
       !price.IsNumber() ||
       !pixKey.IsString())
        throw std::invalid_argument("Check the sequence/price/pixKey args");
    /*END*/

    /*START(OPTIONAL): Check appKey */
    auto appKey = data.Get("AppKey");

    if(!appKey.IsNull() &&
       !appKey.IsString())
        throw std::invalid_argument("appKey must be string");
    /*END*/

    /*START(OPTIONAL): Check pfx/pfxPassword */
    auto pfx = data.Get("Pfx");
    auto pfxPassword = data.Get("PfxPassword");

    auto validPfx = pfx.IsBuffer() || pfx.IsString();

    auto validPfxPass = pfxPassword.IsString();

    if((!pfx.IsUndefined() && !validPfx) ||
       (!pfxPassword.IsUndefined() && !validPfxPass))
        throw std::invalid_argument("PFX must be Buffer and PFXPassword must be string");
    /*END*/

    return {
        .key = key.As<Napi::String>().Utf8Value(),
        .password = password.As<Napi::String>().Utf8Value(),

        .seq = seq.As<Napi::String>().Utf8Value(),
        .price = price.As<Napi::Number>().DoubleValue(),
        .pixKey = pixKey.As<Napi::String>().Utf8Value(),

        .appKey = appKey.As<Napi::String>().Utf8Value(),

        .pfx = validPfx ? pfx.As<Napi::String>().Utf8Value() : std::string(),
        .pfxPassword = validPfxPass ? pfxPassword.As<Napi::String>().Utf8Value() : std::string(),
    };
}