"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pix = require("../build/Pix");
var Pix_1 = require("../build/Pix");
var data = {
    Key: '',
    Password: '',
    Sequence: '12345678901234567890123456789055',
    Price: 2.50,
    PixKey: '04548553000134',
    AppKey: '102931d7e58411f2768414b49bdc484d'
};
var result = Pix.Generate(Pix_1.PixImps.BancoDoBrasil, data);
console.log({ result: result });
console.log(Pix.Generate.toString());
