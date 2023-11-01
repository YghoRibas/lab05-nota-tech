import '../models/nfse.dart';
import '../repositories/nfse.dart';

class NfseController {
  final NfseRepository _nfseRepo = NfseRepository();

  Future<List<Nfse>> getAll() => _nfseRepo.getAll();

  Future<Nfse?> getOne(int id) {
    throw 'Not implemented';
  }
}
