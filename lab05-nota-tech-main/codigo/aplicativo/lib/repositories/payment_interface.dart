import '../models/payment.dart';

abstract class IPaymentRepository {
  Future<List<Payment>> getAll();
  Future<Payment?> getOne(int id);
}
