import { FastifyPluginAsync } from "fastify";
import Repository from "../../repositories";
import { create } from "./create";
import { remove } from "./remove";
import { list } from "./list";
import { createSchema } from "../../schemas/create.js";
import { IPayment, NfseStatus } from "../../types/payment";
import { gerarNfse } from "./gerarNfse";
import { getById } from "./getById";
import { edit } from "./edit";
import { listSchema } from "../../schemas/list";
import { stringIdSchema } from "../../schemas/id";
import { updateSchema } from "../../schemas/update";

const payments: FastifyPluginAsync = async (app, _opts): Promise<void> => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Payment:
   *       type: object
   *       properties:
   *         _id:
   *           type: string
   *         servico:
   *           $ref: '#/components/schemas/Servico'
   *         clientId:
   *           $ref: '#/components/schemas/ID'
   *         companyId:
   *           $ref: '#/components/schemas/ID'
   *         status:
   *           type: string
   *           enum:
   *            - PENDING
   *            - PAID
   *           description: Status do pagamento
   *         pix_qrcode:
   *           type: string
   *           description: QRCode do PIX
   *         tipo:
   *           type: string
   *           description: Tipo de pagamento
   *           enum:
   *             - NORMAL
   *             - PIX
   *       required:
   *       - _id
   *       - servico
   *       - companyId
   *       - clientId
   *       - status
   *       - tipo
   *
   *     CreatePaymentPayload:
   *       type: object
   *       properties:
   *         clientId:
   *           $ref: '#/components/schemas/ID'
   *         companyId:
   *           $ref: '#/components/schemas/ID'
   *         servico:
   *           $ref: '#/components/schemas/Servico'
   *         tipo:
   *           type: string
   *           description: Tipo de pagamento
   *           enum:
   *             - NORMAL
   *             - PIX
   *       required:
   *       - tipo
   *       - clientId
   *       - companyId
   *       - servico
   *     ID:
   *       type: string
   *       format: uuid
   *     Valores:
   *       type: object
   *       properties:
   *         valorServicos:
   *           type: number
   *         baseCalculo:
   *           type: number
   *         aliquota:
   *           type: number
   *       required:
   *         - valorServicos
   *         - baseCalculo
   *     Servico:
   *       type: object
   *       properties:
   *         valores:
   *           $ref: "#/components/schemas/Valores"
   *         itemListaServico:
   *           type: string
   *         codigoCnae:
   *           type: string
   *         codigoTributacaoMunicipio:
   *           type: string
   *         discriminacao:
   *           type: string
   *         codigoMunicipio:
   *           type: string
   *       required:
   *         - codigoMunicipio
   *         - discriminacao
   *         - valores
   *         - itemListaServico
   */

  /**
   * @swagger
   * definitions:
   *   KeyTypes:
   *     type: string
   *     enum: &KEY_TYPES
   *     - CPF
   *     - CNPJ
   *     - EMAIL
   *     - TELEFONE
   *     - CHAVE_ALEATORIA
   *   Status:
   *     type: string
   *     enum: &STATUS
   *     - VALIDADO
   *     - RASCUNHO
   *   PaymentStatus:
   *     type: string
   *     enum: &PaymentStatus
   *     - Processando
   *     - Processado
   */

  app.get("/:id", { schema: { params: stringIdSchema } }, getById);
  app.get("/", { schema: { querystring: listSchema } }, list);
  app.delete("/:id", { schema: { params: stringIdSchema } }, remove);
  app.put(
    "/:id",
    { schema: { params: stringIdSchema, body: updateSchema } },
    edit
  );
  app.post(
    "/:id/gerar_nfse",
    { schema: { params: stringIdSchema } },
    gerarNfse
  );
  app.post(
    "/",
    {
      schema: {
        body: createSchema,
      },
    },
    create
  );

  app.addHook<{ Params: { id: string }; Body: { payment: IPayment } }>(
    "preValidation",
    async (req, res) => {
      if (req.method != "GET") {
        req.log.info(`Validating payment ${req.params.id}`);
        const payment = await Repository.find(req.params.id);

        if (payment) {
          if (payment.nfse) {
            if (payment.nfse.status !== NfseStatus.ERROR) {
              req.log.warn(
                `Payment ${req.params.id} already processed with nfse ${payment.nfse.id}`
              );
              return res.status(409).send({
                message: `Payment ${req.params.id} already processed with nfse ${payment.nfse.id}`,
                err: "CONFLICT",
              });
            }
          } else {
            req.body = { ...req.body, payment };
          }
        }
      }
    }
  );
};

export default payments;
