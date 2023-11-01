// ignore_for_file: avoid_print

import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class SqfliteHandler {
  SqfliteHandler() {
    abrirBancoDados();
  }

  late Database _database;

  abrirBancoDados() async {
    const name = 'notatech.bd';
    final path = await getDatabasesPath();
    final localBancoDados = join(path, name);

    _database = await openDatabase(
      localBancoDados,
      version: 2,
      onCreate: (db, dbVersaoRecente) {
        String sql = 'CREATE TABLE usuarios ('
            'id INTEGER PRIMARY KEY AUTOINCREMENT, '
            'nome TEXT, '
            'email TEXT UNIQUE, '
            'senha TEXT) ';
        db.execute(sql);
      },
    );

    return _database;
  }

  Future<bool> autenticarDados(String email, String senha) async {
    Database bd = await abrirBancoDados();
    final result = await bd.query(
      'usuarios',
      where: 'email = ? AND senha = ?',
      whereArgs: [email, senha],
    );

    return result.isNotEmpty;
  }

  salvarDados(
    String nome,
    String email,
    String senha,
  ) async {
    Map<String, dynamic> dadosUsuario = {
      'nome': nome,
      'email': email,
      'senha': senha,
    };

    Database bd = await abrirBancoDados();
    int id = await bd.insert('usuarios', dadosUsuario);
    print('Salvo: $id');
  }

  // Future<List> listarUsuarios() async {
  //   List<Map<String, dynamic>> usuarios = await _database.query('usuarios');

  //   for (var usuario in usuarios) {
  //     print(
  //       "id: ${usuario['id']}, nome: ${usuario['nome']}, email: ${usuario['email']}, senha: ${usuario['senha']}",
  //     );
  //   }

  //   return usuarios;
  // }

  Future<List<String>> listarUsuarios() async {
    List<Map<String, dynamic>> usuarios = await _database.query('usuarios');
    List<String> usuariosFormatados = [];

    for (var usuario in usuarios) {
      print(
        "id: ${usuario['id']}, nome: ${usuario['nome']}, email: ${usuario['email']}, senha: ${usuario['senha']}",
      );

      String usuarioFormatado =
          "id: ${usuario['id']}, nome: ${usuario['nome']}, email: ${usuario['email']}, senha: ${usuario['senha']}";

      usuariosFormatados.add(usuarioFormatado);
    }

    return usuariosFormatados;
  }

  Future<dynamic> listarNomeDeUmUsuario(String email) async {
    List<Map<String, dynamic>> usuario = await _database.query(
      'usuarios',
      columns: ['id', 'nome', 'email', 'senha'],
      where: 'email = ?',
      whereArgs: [email],
    );

    for (var usuario in usuario) {
      print(
        "id: ${usuario['id']}, nome: ${usuario['nome']}, email: ${usuario['email']}, senha: ${usuario['senha']}",
      );

      if (usuario['nome'] != null) {
        return usuario['nome'];
      }
    }

    return null;
  }

  excluirUsuario(String email) async {
    int retorno = await _database.delete(
      'usuarios',
      where: 'email = ?',
      whereArgs: [email],
    );

    print('Itens excluídos: $retorno');
  }

  atualizarUsuario(
    int id,
    String novoNome,
    String novoEmail,
    String novaSenha,
    String novoCreatedAt,
  ) async {
    Map<String, dynamic> dadosUsuario = {
      'nome': novoNome,
      'email': novoEmail,
      'senha': novaSenha,
    };

    int retorno = await _database.update(
      'usuarios',
      dadosUsuario,
      where: 'id = ?',
      whereArgs: [id],
    );

    print('Itens atualizados: $retorno');
  }
}
