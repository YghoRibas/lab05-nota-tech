#include <curlpp/Easy.hpp>
#include <sstream>
#include <curlpp/Options.hpp>
#include <utility>
#include "Request.h"
#include <fstream>
#include <openssl/pem.h>
#include <openssl/err.h>
#include <openssl/pkcs12.h>
#include <curlpp/Multi.hpp>

Request& Request::Payload(std::string_view payload) {
    this->rawPayload = payload.data();

    return *this;
}

Request& Request::Payload(FormPayload payload) {
    this->formPayload = payload;

    return *this;
}

Request& Request::Method(enum Request::Type type) {
    this->method = type;

    return *this;
}

std::string Request::GetMethod() {
    switch (method) {
        case Request::Type::GET:
            return "GET";

        case Request::Type::PATCH:
            return "PATCH";

        case Request::Type::PUT:
            return "PUT";

        case Request::Type::POST:
            return "POST";

        case Request::Type::REMOVE:
            return "DELETE";
    }

    return "";
}

Request& Request::Url(std::string_view url) {
    this->url = url.data();

    return *this;
}

Request& Request::Header(std::string_view key, std::string_view value) {
    headers[key.data()] = value.data();

    return *this;
}

Request& Request::Headers(std::unordered_map<std::string, std::string> headers) {
    this->headers.insert(headers.begin(), headers.end());

    return *this;
}

Request& Request::operator->() {
    return *this;
}

Request& Request::Pfx(std::string cert, std::string pass) {
    pfx = std::move(cert);
    password = std::move(pass);
    return *this;
}

std::string getOpenSSLError()
{
    BIO *bio = BIO_new(BIO_s_mem());
    ERR_print_errors(bio);
    char *buf;
    size_t len = BIO_get_mem_data(bio, &buf);
    std::string ret(buf, len);
    BIO_free(bio);
    return ret;
}

std::tuple<std::string, std::string>
PreparePfx(const std::string& pfx, const std::string& password){
    char tmpDir[52];
    GetTempPath(52, tmpDir);

    OpenSSL_add_all_algorithms();

    BIO* pfxBio = BIO_new_mem_buf(pfx.c_str(), (int) pfx.size());
    if (!pfxBio) {
        std::cerr << "Erro ao criar o objeto BIO." << std::endl;
        throw std::invalid_argument("Formato invalido");
    }

    PKCS12* p12 = d2i_PKCS12_bio(pfxBio, nullptr);
    BIO_free(pfxBio);

    if (!p12) {
        std::cerr << "Erro ao carregar o PFX a partir da string." << std::endl;
        throw std::invalid_argument("Formato invalido");
    }

    EVP_PKEY* pkey {};
    X509* cert {};
    STACK_OF(X509)* ca {};

    int res;

    if (!PKCS12_parse(p12, password.c_str(), &pkey, &cert, &ca)) {
        std::cerr << "Erro ao analisar o conteúdo do PFX." << std::endl;
        PKCS12_free(p12);
        std::cout << getOpenSSLError() << std::endl;
        throw std::invalid_argument("Formato invalido");
    }

    PKCS12_free(p12);

    //Extrair o certificado para um arquivo .crt
    char crtPath[52];
    GetTempFileName(tmpDir, nullptr, 0, crtPath);

    auto crtBio = BIO_new_file(crtPath, "w+");
    PEM_write_bio_X509(crtBio, cert);
    BIO_free(crtBio);
    //END

    // Extrair a chave privada para um arquivo .key
    char keyPath[52];
    GetTempFileName(tmpDir, nullptr, 0, keyPath);

    auto keyBio = BIO_new_file(keyPath, "w+");
    PEM_write_bio_PrivateKey(keyBio, pkey, nullptr, (unsigned char*) password.c_str(), (int) password.size(), nullptr, nullptr);
    BIO_free(keyBio);
    //END

    EVP_PKEY_free(pkey);

    X509_free(cert);

    return { std::string(crtPath), std::string(keyPath) };
}

void Request::Prepare(cURLpp::Easy& handle){
    //curl_global_sslset(CURLSSLBACKEND_OPENSSL, nullptr, nullptr);

    std::list<std::string> header;
    for(auto& key : headers)
        header.push_back(key.first + ": " + key.second);

    std::tuple<std::string, std::string> crypto;
    if(!pfx.empty())
    {
        crypto = PreparePfx(pfx, password);

        handle.setOpt(cURLpp::Options::SslCert(std::get<0>(crypto)));
        handle.setOpt(cURLpp::Options::SslKey(std::get<1>(crypto)));
    }

    handle.setOpt(cURLpp::Options::Url(url));
    handle.setOpt(cURLpp::Options::SslVerifyHost(false));
    handle.setOpt(cURLpp::Options::SslVerifyPeer(false));
    handle.setOpt(cURLpp::Options::Encoding(""));
    handle.setOpt(cURLpp::Options::CustomRequest(GetMethod()));

    if(method != Request::Type::GET) {
        if(formPayload.empty())
            handle.setOpt(cURLpp::Options::PostFields(rawPayload));
        else
        {
            cURLpp::Forms parts;
            for(auto& item : headers)
                parts.push_back(new cURLpp::FormParts::Content(item.first, item.second));

            handle.setOpt(cURLpp::Options::HttpPost(parts));
        }
    }
    handle.setOpt(cURLpp::Options::HttpHeader(header));

    auto hasPfx = !pfx.empty();

    std::function<size_t(char *, size_t, size_t)> cb = [=](char* ptr, size_t size, size_t nmemb){
        if(hasPfx)
        {
            DeleteFile(std::get<0>(crypto).c_str());
            DeleteFile(std::get<1>(crypto).c_str());
        };

        auto realSize = size * nmemb;

        return realSize;
    };

    curlpp::Types::WriteFunctionFunctor callback(cb);

    handle.setOpt(std::make_unique<curlpp::Options::WriteFunction>(cb));
}

std::string Request::Perform() {
    try
    {
        cURLpp::Easy handle;

        std::stringstream response;

        Prepare(handle);

        handle.setOpt(cURLpp::Options::WriteStream(&response));

        handle.perform();

        return response.str();
    }
    catch( curlpp::RuntimeError &e )
    {
        std::cout << e.what() << std::endl;
    }
    catch( curlpp::LogicError &e )
    {
        std::cout << e.what() << std::endl;
    }

    return "";
}