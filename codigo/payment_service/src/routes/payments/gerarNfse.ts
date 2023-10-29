import { FastifyReply, FastifyRequest } from "fastify";

import { publishMessage } from "../../queues";
import { IPayment, PaymentStatus } from "../../types/payment";

const GERAR_NFSE = "gerar_nfse";

/**
 * @swagger
 * /api/payments/:id/gerar_nfse:
 *   post:
 *     tags: [Payment]
 *     description: Solicita a geração de uma NFSe para um `Payment`
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The Payment ID
 *         required: true
 *     responses:
 *       202:
 *         description: The request has been accepted for processing.
 *       400:
 *         description: invalid json body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       500:
 *         description: Internal Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
const gerarNfse = async (
  req: FastifyRequest<{
    Body: { payment: IPayment };
    Params: { id: string };
  }>,
  reply: FastifyReply
): Promise<void> => {
  if (req.body.payment.status !== PaymentStatus.PAID) {
    req.log.info(
      `Pagamento ${req.params.id} não está pago, não será gerada NFSe`
    );
    return reply.status(202).send();
  }
  req.log.info(`Gerando NFSe para o pagamento ${req.params.id}`);
  reply.status(202).send();

  try {
    req.log.info(`Enviando mensagem para a fila ${GERAR_NFSE}`);
    publishMessage(GERAR_NFSE, req.body.payment);
    req.log.info(`Mensagem enviada para a fila ${GERAR_NFSE}`);
    return;
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send();
  }
};

export { gerarNfse };
