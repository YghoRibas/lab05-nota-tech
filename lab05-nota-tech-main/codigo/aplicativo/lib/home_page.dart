import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'controllers/nfse.dart';
import 'lista_notas_widget.dart';
import 'login_page.dart';
import 'sqflite_handler.dart';

class HomePage extends StatefulWidget {
  HomePage({super.key});

  final NfseController _nfseController = NfseController();

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  final SqfliteHandler bd = SqfliteHandler();
  late String userName = '';
  late String userEmail = '';

  @override
  void initState() {
    super.initState();

    getUserInfo();
  }

  Future<void> getUserInfo() async {
    final prefs = await SharedPreferences.getInstance();

    userEmail = prefs.getString('email') ?? 'Email não encontrado';
    userName =
        await bd.listarNomeDeUmUsuario(userEmail) ?? 'Nome não encontrado';

    setState(() {});
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();

    prefs.remove('email');

    if (mounted) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => const LoginPage()),
      );
    }
  }

  Future<void> deleteUser() async {
    final prefs = await SharedPreferences.getInstance();

    userEmail = prefs.getString('email') ?? 'Nome não encontrado';

    await bd.excluirUsuario(userEmail);

    setState(() {});

    logout();
  }

  void mostrarListaNoAlertDialog(
    BuildContext context,
    List<String> lista,
  ) async {
    await showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: const Text('Usuarios'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: lista
              .map(
                (elemento) => ListTile(
                  title: Text(elemento),
                ),
              )
              .toList(),
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.pop(context, 'OK'),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: const Text('Notas'),
        ),
        body: Center(child: ListaNotasWidget(widget._nfseController)),
        drawer: FutureBuilder(
          future: getUserInfo(),
          builder: (context, snapshot) {
            getUserInfo();

            return Drawer(
              child: ListView(
                children: [
                  UserAccountsDrawerHeader(
                    accountEmail: Text(userEmail),
                    accountName: Text(userName),
                    currentAccountPicture: CircleAvatar(
                      child: Text(userName[0].toUpperCase()),
                    ),
                  ),
                  ListTile(
                    leading: const Icon(Icons.format_list_numbered_rtl),
                    title: const Text('Listar Usuários'),
                    onTap: () async {
                      List<String> usuarios = await bd.listarUsuarios();

                      getUserInfo();

                      // ignore: use_build_context_synchronously
                      mostrarListaNoAlertDialog(
                        context,
                        usuarios,
                      );
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.delete),
                    title: const Text('Deletar sua Conta'),
                    onTap: () {
                      deleteUser();
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.logout),
                    title: const Text('Sair'),
                    onTap: () async {
                      logout();
                    },
                  ),
                ],
              ),
            );
          },
        ),
      );
}
