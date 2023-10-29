import 'package:nota_tech/models/nfse.dart';

abstract class INfseRepository {
  Future<List<Nfse>> getAll();
  Future<Nfse?> getOne(int id);
}