import { PubSub } from "@google-cloud/pubsub";
import { IPayment } from "../interfaces/Payment";
import repositories from "../repositories/";
import { INfse, NfseStatus } from "../types/nfse";
import {
  NaturezaOperacao,
  RegimeEspecialTributacao,
  SimNao,
} from "../types/enums";
import { Uf } from "../interfaces/commons";
import { randomUUID } from "crypto";
import { server } from "../app";
import * as util from "node:util";

const pubsub = new PubSub({ projectId: "nfse-service" });

export async function subscribe() {
  const subscription = pubsub.subscription("nfse-service-sub");

  subscription.on("message", (message) => {
    server.log.info(`Message received: ${message.id}`);
    const msg: IPayment = JSON.parse(message.data.toString());
    server.log.info(`Message data: ${util.inspect(msg)}`);

    message.ack();

    const nfse: INfse = {
      id: randomUUID(),
      servico: {
        codigoMunicipio: msg.servico?.codigoMunicipio,
        discriminacao: msg.servico?.discriminacao,
        itemListaServico: msg.servico?.itemListaServico,
        valores: {
          ...msg.servico?.valores,
          issRetido: false,
          descontoCondicionado: 0,
          descontoIncondicionado: 0,
          outrasRetencoes: 0,
          valorCofins: 0,
          valorCsll: 0,
          valorDeducoes: 0,
          valorInss: 0,
          valorIr: 0,
          valorIss: 0,
          valorIssRetido: 0,
          valorLiquidoNfse: 0,
          valorPis: 0,
        },
      },
      identificacao: {
        competencia: "2021-09-01",
        incetivadorCultural: SimNao.Nao,
        naturezaOperacao: NaturezaOperacao["Tributação no município"],
        optanteSimplesNacional: SimNao.Sim,
        regimeEspecialTributacao:
          RegimeEspecialTributacao["Microempresa municipal"],
      },
      prestador: {
        razaosocial: "Teste",
        identificacao: {
          cpfcnpj: {
            cnpj: "123456789",
          },
        },
        contato: {
          email: "test@gmail.com",
          telefone: "123456789",
        },
        endereco: {
          codigoMunicipio: "123456",
          bairro: "Centro",
          cep: "12345678",
          cidade: "São Paulo",
          complemento: "Casa",
          endereco: "Rua Teste",
          numero: "123",
          uf: Uf.SP,
        },
      },
      tomador: {
        razaosocial: "Teste",
        identificacao: {
          cpfcnpj: {
            cnpj: "123456789",
          },
        },
        contato: {
          email: "test@gmail.com",
          telefone: "123456789",
        },
        endereco: {
          codigoMunicipio: "123456",
          bairro: "Centro",
          cep: "12345678",
          cidade: "São Paulo",
          complemento: "Casa",
          endereco: "Rua Teste",
          numero: "123",
          uf: Uf.SP,
        },
      },
      status: NfseStatus.SENT,
    };

    server.log.info(`Creating nfse`);
    repositories
      .create(nfse)
      .then((nfse) => {
        server.log.info(`Nfse created: ${nfse.id}`);
      })
      .catch((error) => {
        server.log.error(`Error creating nfse: ${error}`);
      });
  });

  subscription.on("error", (error) => {
    server.log.error(error);
  });
}

subscribe()
  .then(() => {
    server.log.info("Subscribed to nfse-servico-sub");
  })
  .catch((error) => {
    server.log.error(error);
  });
