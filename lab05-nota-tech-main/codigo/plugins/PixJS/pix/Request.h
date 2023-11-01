#pragma once
#include <map>
#include <string>

class Request {
public:
    using FormPayload = std::map<std::string, std::string>;

    Request(const std::string&& url)
    : url(url){}

    Request(std::string& url)
    : url(url){}

    enum class Type {
       GET,
       POST,
       PUT,
       REMOVE,
       PATCH
    };

    Request& Payload(std::string_view);

    Request& Payload(FormPayload);

    Request& Method(Type);

    Request& Url(std::string_view);

    Request& Header(std::string_view, std::string_view);

    Request& Headers(std::unordered_map<std::string, std::string>);

    std::string Perform();

    typedef void(*Callback)(std::string);

    Request& operator->();

    Request& Pfx(std::string cert, std::string password);

private:
    void Prepare(cURLpp::Easy& handle);

    std::string GetMethod();

    std::string url;

    Type method;

    std::string rawPayload;

    FormPayload formPayload;

    std::string pfx;

    std::string password;

    std::unordered_map<std::string, std::string> headers;
};
