#include <napi.h>
#include "methods/Generate.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "Generate"),
                Napi::Function::New(env, Generate));

    return exports;
}

NODE_API_MODULE(Pix, Init)