import 'package:nota_tech/models/payment.dart';
import 'package:nota_tech/repositories/payment.dart';

class PaymentController {
  final PaymentRepository _paymentRepo = PaymentRepository();

  Future<List<Payment>> getAll() {
    return _paymentRepo.getAll();
  }

  Future<Payment?> getOne(int id) {
    throw "Not implemented";
  }
}