import * as Pix from "../build/Pix";
import { PixData, PixImps } from "../build/Pix";

const data: PixData = {
  Key: "",
  Password: "",
  Sequence: "12345678901234567890123456789055",
  Price: 2.5,
  PixKey: "04548553000134",
  AppKey: "102931d7e58411f2768414b49bdc484d",
};

const result = Pix.Generate(PixImps.BancoDoBrasil, data);

console.log({ result });

console.log(Pix.Generate.toString());
