//
// Created by Administrator on 28/08/2023.
//

#include "Generate.h"
#include <Pix.h>
#include "Validate.h"

Napi::Value Generate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    Pix* forBank = nullptr;

    try {
        auto pd = Validate(info);

        auto bank = info[0].As<Napi::Number>().Int32Value();

        forBank = PixFor(static_cast<PixImps>(bank));

        if(forBank == nullptr)
            throw std::invalid_argument("Invalid Bank ENUM");

        auto result = forBank->Generate(pd);

        if(result.size == 0)
            throw std::invalid_argument("Price not match");

        Napi::Object obj = Napi::Object::New(env);

        obj.Set(Napi::String::New(env, "image"), Napi::Buffer<char>::New(env, result.image, result.size));
        obj.Set(Napi::String::New(env, "line"), Napi::String::New(env, result.line));

        delete forBank;

        return obj;
    } catch (std::exception& error){
        Napi::TypeError::New(env, error.what())
            .ThrowAsJavaScriptException();

        delete forBank;

        return env.Null();
    } catch (...){
        Napi::TypeError::New(env, "Internal error")
            .ThrowAsJavaScriptException();

        delete forBank;

        return env.Null();
    }
}