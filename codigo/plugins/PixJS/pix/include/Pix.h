//
// Created by Administrator on 19/07/2023.
//

#pragma once
#include <list>
#include <iostream>
#include "curlpp/Easy.hpp"
#include "../Request.h"

enum class PixImps {
    BancoDoBrasil = 1,
    Sicoob = 756,
    Bradesco = 237,
    Itau = 341
};

class Pix  {
public:
    enum class Status {
        PENDING,
        PAID,
        EXPIRED,
        ERRO
    };

    struct RawData {
        /*Authentication*/
        char* key; //Username
        char* password; //Password

        /*Pix Information*/
        char* seq; //Sequence identity
        double price; //Amount
        char* pixKey; //PIX Key

        /*Application ID*/
        char* appKey;

        /*Certificate*/
        char* pfx; //Certificate
        char* pfxPassword; //PFX Password
    };

    struct Data {
        /*Authentication*/
        std::string key; //Username
        std::string password; //Password

        /*Pix Information*/
        std::string seq; //Sequence identity
        double price; //Amount
        std::string pixKey; //PIX Key

        /*Application ID*/
        std::string appKey;

        /*Certificate*/
        std::string pfx; //Certificate
        std::string pfxPassword; //PFX Password
    };

    struct Information {
        char* seq;
        Status status;
        double original;
        double paid;
        char* hour;
    };

    struct Result {
        char* image; //Image non decoded
        int size; //Size of image
        char* line; //Pix Copy-Paste
    };

    struct Payment {
        double original;
        double paid;
    };

    Pix() = default;

    void Clear();

    virtual Result Generate (RawData) = 0;

    virtual Payment IsPaid (RawData) = 0;

    virtual Information Get(RawData) = 0;

    virtual void Edit (RawData) = 0;

    Result Generate(const Data&);

    virtual ~Pix() = default;

protected:
    void AddContent(char*);

    static std::string QrCodePng(const std::string&);

    static Request Create(std::string_view url, std::string_view token, RawData&);

private:
    std::list<std::shared_ptr<char>> contents;
};

extern "C" Pix* PixFor(PixImps imp);