import { ConsumeMessage } from "amqplib";
import { channel } from "../queues";
import * as dotenv from "dotenv";
import { server } from "../app";
import Ajv, { type JSONSchemaType } from "ajv";
import { CompanyAPI, PaymentAPI } from "../apis";
dotenv.config();

export interface GenerateNfseMessage {
  context: string;
  message: {
    id: string;
    companyID: string;
    payerId: string;
  };
}
const messageSchema: JSONSchemaType<GenerateNfseMessage> = {
  type: "object",
  properties: {
    context: { type: "string" },
    message: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        companyID: {
          type: "string",
        },
        payerId: {
          type: "string",
        },
      },
      required: ["companyID", "id", "payerId"],
    },
  },
  required: ["context", "message"],
};

const generate_nfse_job = async (
  message: ConsumeMessage | null
): Promise<void> => {
  if (!message) {
    server.log.error("Nenhuma mensagem disponível na fila.");
    return;
  }
  const ajv = new Ajv();
  const data = message.content.toJSON();
  const valid = (await ajv.compileAsync(messageSchema))(data);

  if (valid) {
    server.log.info(`Mensagem recebida: ${data}`);
    const company = await CompanyAPI.getById(data.message.companyID);
    const payment = await PaymentAPI.getById(data.message.id);
    const payer = await CompanyAPI.getById(data.message.companyID);
    console.log(company);
    console.log(payer);
    console.log(payment);
    channel.ack(message);
  }
};

export { generate_nfse_job };
