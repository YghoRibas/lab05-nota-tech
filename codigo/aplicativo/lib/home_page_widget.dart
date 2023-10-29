import 'package:flutter/material.dart';
import 'package:nota_tech/controllers/nfse.dart';
import 'package:nota_tech/controllers/payment.dart';
import 'package:nota_tech/lista_notas.dart';
import 'package:nota_tech/pagamentos.dart';

class HomePage extends StatefulWidget {
  final NfseController _nfseController = NfseController();
  final PaymentController _paymentController = PaymentController();
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String pagina = 'notas';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: pagina == 'notas' ? const Text('Notas Fiscais') : const Text('Pagamentos'),
      ),
      body: Center(
        child: pagina == 'notas'
            ? ListaNotas(widget._nfseController)
            : Pagamentos(widget._paymentController),
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            const UserAccountsDrawerHeader(
              accountEmail: Text('teste@email.com'),
              accountName: Text('Conta Teste'),
              currentAccountPicture: CircleAvatar(
                child: Text('TA'),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.receipt),
              title: const Text('Notas Fiscais'),
              onTap: () {
                Navigator.pop(context);
                setState(() {
                  pagina = 'notas';
                });
              },
            ),
            ListTile(
              leading: const Icon(Icons.attach_money),
              title: const Text('Pagamentos'),
              onTap: () {
                Navigator.pop(context);
                setState(() {
                  pagina = 'pagamentos';
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}
