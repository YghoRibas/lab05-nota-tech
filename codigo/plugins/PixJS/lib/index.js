"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pix = __importStar(require("../build/Pix"));
const Pix_1 = require("../build/Pix");
const data = {
    Key: 'eyJpZCI6IjAwNzY0NTUtMWU2Yi0iLCJjb2RpZ29QdWJsaWNhZG9yIjowLCJjb2RpZ29Tb2Z0d2FyZSI6NDA2MTAsInNlcXVlbmNpYWxJbnN0YWxhY2FvIjoxfQ',
    Password: 'eyJpZCI6ImZhNWIiLCJjb2RpZ29QdWJsaWNhZG9yIjowLCJjb2RpZ29Tb2Z0d2FyZSI6NDA2MTAsInNlcXVlbmNpYWxJbnN0YWxhY2FvIjoxLCJzZXF1ZW5jaWFsQ3JlZGVuY2lhbCI6MSwiYW1iaWVudGUiOiJwcm9kdWNhbyIsImlhdCI6MTY3NTcwODQ0NjQ3M30',
    Sequence: '12345678901234567890123456789057',
    Price: 2.50,
    PixKey: '04548553000134',
    AppKey: '102931d7e58411f2768414b49bdc484d'
};
const result = Pix.Generate(Pix_1.PixImps.BancoDoBrasil, data);
console.log({ result });
console.log(Pix.Generate.toString());
//# sourceMappingURL=index.js.map