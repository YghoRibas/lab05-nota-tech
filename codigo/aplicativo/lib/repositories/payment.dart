import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:nota_tech/models/payment.dart';
import 'package:nota_tech/repositories/payment_interface.dart';

class PaymentRepository implements IPaymentRepository {

  PaymentRepository();
  String url = "payment-service-xrz8.onrender.com";

  @override
  Future<List<Payment>> getAll() async {
    Uri uri = Uri.https(url, "api/payments", { "companyId":'c5ec6456-268d-4a42-b7ac-0db0949d1ed1' });
    var response = await http.get(uri);
    Map<String, dynamic> jsonResponse;
    jsonResponse = convert.jsonDecode(response.body) as Map<String, dynamic>;
    List<Payment> payments = toResponseList(jsonResponse["data"]);
    return payments;
  }

  List<Payment> toResponseList(List<dynamic> data) {
    List<Payment> value = <Payment>[];
    data.forEach((element) {
      value.add(Payment.fromJson(element));
    });
    return value;
  }


  @override
  Future<Payment?> getOne(int id) async {
    throw "Not implemented";
  }
}