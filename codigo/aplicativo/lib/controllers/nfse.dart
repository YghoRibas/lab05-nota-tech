import 'package:nota_tech/models/nfse.dart';
import 'package:nota_tech/repositories/nfse.dart';

class NfseController {
  final NfseRepository _nfseRepo = NfseRepository();

  Future<List<Nfse>> getAll() {
    return _nfseRepo.getAll();
  }

  Future<Nfse?> getOne(int id) {
    throw "Not implemented";
  }
}