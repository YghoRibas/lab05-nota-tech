import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import '../models/payment.dart';
import 'payment_interface.dart';

class PaymentRepository implements IPaymentRepository {
  PaymentRepository();
  String url = 'payment-service-xrz8.onrender.com';

  @override
  Future<List<Payment>> getAll() async {
    Uri uri = Uri.https(
      url,
      'api/payments',
      {'companyId': 'c5ec6456-268d-4a42-b7ac-0db0949d1ed1'},
    );

    var response = await http.get(uri);
    Map<String, dynamic> jsonResponse;
    jsonResponse = convert.jsonDecode(response.body) as Map<String, dynamic>;
    List<Payment> payments = toResponseList(jsonResponse['data']);

    return payments;
  }

  List<Payment> toResponseList(List<dynamic> data) {
    List<Payment> value = <Payment>[];
    for (var element in data) {
      value.add(Payment.fromJson(element));
    }

    return value;
  }

  @override
  Future<Payment?> getOne(int id) async {
    throw 'Not implemented';
  }
}
