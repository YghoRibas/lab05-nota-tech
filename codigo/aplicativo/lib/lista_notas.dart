import 'package:flutter/material.dart';
import 'package:nota_tech/controllers/nfse.dart';
import 'package:nota_tech/models/nfse.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:intl/intl.dart';

class ListaNotas extends StatelessWidget {
  final NfseController _nfseController;

  const ListaNotas(this._nfseController, {super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Nfse>>(
        future: _nfseController.getAll(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          } else {
            return ListView(
                children: _createNfseListTiles(snapshot.data ?? []));
          }
        });
  }

  List<Card> _createNfseListTiles(List<Nfse> nfses) {
    initializeDateFormatting("pt_BR", null);
    final f = DateFormat('dd/MM/yyyy');
    return nfses
        .map((nfse) => Card(
            child: Container(
              alignment: Alignment.center,
              child: ListTile(
                title: Text(
                    "${nfse.identificacao.numero} ${f.format(DateTime.parse(nfse.identificacao.competencia))}",
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                subtitle: Text(nfse.tomador.razaosocial,
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
