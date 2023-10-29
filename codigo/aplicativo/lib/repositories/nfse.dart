import 'package:nota_tech/models/nfse.dart';
import 'package:nota_tech/repositories/nfse_interface.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;

class NfseRepository implements INfseRepository {

  NfseRepository();
  String url = "nfse-service.onrender.com";

  @override
  Future<List<Nfse>> getAll() async {
    Uri uri = Uri.https(url, "api/nfses", { "companyId":'c5ec6456-268d-4a42-b7ac-0db0949d1ed1' });
    var response = await http.get(uri);
    Map<String, dynamic> jsonResponse;
    jsonResponse = convert.jsonDecode(response.body) as Map<String, dynamic>;
    List<Nfse> nfses = toResponseList(jsonResponse["data"]);
    return nfses;
  }

  List<Nfse> toResponseList(List<dynamic> data) {
    List<Nfse> value = <Nfse>[];
    data.forEach((element) {
      value.add(Nfse.fromJson(element));
    });
    return value;
  }


  @override
  Future<Nfse?> getOne(int id) async {
    throw "Not implemented";
  }
}