import 'package:flutter/material.dart';
import 'login_page.dart';
import 'sqflite_handler.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  RegisterState createState() => RegisterState();
}

class RegisterState extends State<RegisterPage> {
  final TextEditingController _controllerNome = TextEditingController();
  final TextEditingController _controllerEmail = TextEditingController();
  final TextEditingController _controllerSenha = TextEditingController();

  final SqfliteHandler bd = SqfliteHandler();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              const Padding(
                padding: EdgeInsets.only(top: 60.0),
                child: Center(
                  child: SizedBox(
                    width: 200,
                    height: 150,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  left: 15.0,
                  right: 15.0,
                  top: 15.0,
                  bottom: 15.0,
                ),
                child: TextField(
                  controller: _controllerNome,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Nome de usuário',
                    hintText: 'Digite seu nome ou apelido',
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 15),
                child: TextField(
                  controller: _controllerEmail,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Email',
                    hintText: 'Digite um email válido, como abc@gmail.com',
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  left: 15.0,
                  right: 15.0,
                  top: 15.0,
                  bottom: 15.0,
                ),
                child: TextField(
                  obscureText: true,
                  controller: _controllerSenha,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Senha',
                    hintText: 'Digite uma senha segura',
                  ),
                ),
              ),
              Container(
                height: 50,
                width: 250,
                decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: ElevatedButton(
                  onPressed: () {
                    bd.salvarDados(
                      _controllerNome.text,
                      _controllerEmail.text,
                      _controllerSenha.text,
                    );

                    _controllerNome.clear();
                    _controllerEmail.clear();
                    _controllerSenha.clear();

                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const LoginPage()),
                    );
                  },
                  child: const Text(
                    'Registrar',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 25,
                    ),
                  ),
                ),
              ),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const LoginPage()),
                  );
                },
                child: const Text('Já possui conta? Fazer login'),
              ),
            ],
          ),
        ),
      );
}
