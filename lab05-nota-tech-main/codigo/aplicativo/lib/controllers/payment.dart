import '../models/payment.dart';
import '../repositories/payment.dart';

class PaymentController {
  final PaymentRepository _paymentRepo = PaymentRepository();

  Future<List<Payment>> getAll() => _paymentRepo.getAll();

  Future<Payment?> getOne(int id) {
    throw 'Not implemented';
  }
}
