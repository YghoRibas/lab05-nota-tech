class Nfse {
  Nfse.fromJson(dynamic data)
      : id = data['id'],
        status = data['status'],
        identificacao = Identificacao.fromMap(data['identificacao']),
        prestador = Prestador.fromMap(data['prestador']),
        tomador = Tomador.fromMap(data['tomador']);

  Nfse.fromMap(Map<String, dynamic> data)
      : id = data['id'],
        status = data['status'],
        identificacao = data['identificacao'],
        prestador = data['prestador'],
        tomador = data['tomador'];
  Nfse(
    this.id,
    this.status,
    this.identificacao,
    this.prestador,
    this.tomador,
  );

  String id;
  String status;
  Identificacao identificacao;
  Prestador prestador;
  Tomador tomador;

  Map<String, dynamic> toMap() => {
        'id': id,
        'status': status,
        'identificacao': identificacao,
        'prestador': prestador,
        'tomador': tomador,
      };
}

class Identificacao {
  Identificacao.fromMap(Map<String, dynamic> data)
      : competencia = data['competencia'],
        numero = int.parse(data['numero']);
  late String competencia;
  late int numero;
}

class Prestador {
  Prestador.fromMap(Map<String, dynamic> data)
      : razaosocial = data['razaosocial'];

  late String razaosocial;
}

class Tomador {
  Tomador.fromMap(Map<String, dynamic> data)
      : razaosocial = data['razaosocial'];

  late String razaosocial;
}
