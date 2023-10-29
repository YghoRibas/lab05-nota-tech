class Nfse {
  String id;
  String status;
  Identificacao identificacao;
  Prestador prestador;
  Tomador tomador;

  Nfse(this.id, this.status, this.identificacao, this.prestador, this.tomador);

  Nfse.fromMap(Map<String, dynamic> data) :
    id = data['id'],
    status = data['status'],
    identificacao = data['identificacao'],
    prestador = data['prestador'],
    tomador = data['tomador'];

  Nfse.fromJson(dynamic data) :
    id = data['id'],
    status = data['status'],
    identificacao = Identificacao.fromMap(data['identificacao']),
    prestador = Prestador.fromMap(data['prestador']),
    tomador = Tomador.fromMap(data['tomador']);

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'status': status,
      'identificacao': identificacao,
      'prestador': prestador,
      'tomador': tomador,
    };
  }
}


 class Identificacao {
  late String competencia;
  late int numero;

  Identificacao.fromMap(Map<String, dynamic> data) :
    competencia = data["competencia"],
    numero = int.parse(data["numero"]);

}
 class Prestador {
  late String razaosocial;

  Prestador.fromMap(Map<String, dynamic> data) :
  razaosocial = data["razaosocial"];
}
 class Tomador {
  late String razaosocial;

  Tomador.fromMap(Map<String, dynamic> data) :
  razaosocial = data["razaosocial"];
}