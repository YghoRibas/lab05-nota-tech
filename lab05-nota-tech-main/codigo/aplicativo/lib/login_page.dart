// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'home_page.dart';
import 'register_page.dart';
import 'sqflite_handler.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  LoginPageState createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  final SqfliteHandler bd = SqfliteHandler();

  final TextEditingController _controllerEmail = TextEditingController();
  final TextEditingController _controllerSenha = TextEditingController();

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
                  top: 15,
                  bottom: 0,
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
              TextButton(
                onPressed: () {},
                child: const Text(
                  'Esqueci a senha',
                  style: TextStyle(
                    color: Colors.blue,
                    fontSize: 15,
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
                  onPressed: () async {
                    bool isAuth = await bd.autenticarDados(
                      _controllerEmail.text,
                      _controllerSenha.text,
                    );

                    if (isAuth) {
                      final prefs = await SharedPreferences.getInstance();
                      await prefs.setString('email', _controllerEmail.text);

                      _controllerEmail.clear();
                      _controllerSenha.clear();

                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => HomePage()),
                      );
                    } else {
                      showDialog<String>(
                        context: context,
                        builder: (BuildContext context) => AlertDialog(
                          title: const Text('Usuário ou senha incorretos'),
                          content: const Text(
                            'Tente novamente verificando seu usuário e senha',
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
                  },
                  child: const Text(
                    'Login',
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
                    MaterialPageRoute(builder: (_) => const RegisterPage()),
                  );
                },
                child: const Text('Novo usuário? Criar conta'),
              ),
            ],
          ),
        ),
      );
}
