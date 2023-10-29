import 'package:flutter/material.dart';
import 'package:nota_tech/controllers/payment.dart';
import 'package:nota_tech/models/payment.dart';

class Pagamentos extends StatelessWidget {
  final PaymentController _paymentController;

  const Pagamentos(this._paymentController, {super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Payment>>(
        future: _paymentController.getAll(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          } else {
            return ListView(
                children: _createPaymentListTiles(snapshot.data ?? []));
          }
        });
  }

  List<Card> _createPaymentListTiles(List<Payment> payments) {
    return payments
        .map((payment) => Card(
            child: Container(
              alignment: Alignment.center,
              child: ListTile(
                title: Text(
                    payment.id,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                subtitle: Text(payment.status,
                style: const TextStyle(fontSize: 16)),
                trailing: PopupMenuButton<Text>(
                  onSelected: (Text? value) {},
                  itemBuilder: ((BuildContext context) =>
                      <PopupMenuEntry<Text>>[
                        const PopupMenuItem<Text>(child: Text("Visualizar")),
                        const PopupMenuItem<Text>(child: Text("Editar")),
                        const PopupMenuItem<Text>(child: Text("Cancelar")),
                        const PopupMenuItem<Text>(child: Text("Deletar")),
                      ]),
                ),
                isThreeLine: true,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              ),
            )))
        .toList();
  }
}
