import { FastifyReply, FastifyRequest } from "fastify";
import repositories from "../../repositories";

import { CreatePaymentPayload } from "../../types/createPaymentPayload";
import { CompanyAPI } from "../../apis";
import { PaymentStatus, PaymentType } from "../../types/payment";

/**
 * @swagger
 * /api/payments:
 *   post:
 *     tags: [Payment]
 *     description: Cria uma `Payment`
 *     requestBody:
 *       required: true
 *       description: The `CreatePaymentPayload` data.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentPayload'
 *     responses:
 *       201:
 *         description: Created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: invalid json body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
const create = async (
  req: FastifyRequest<{
    Body: CreatePaymentPayload;
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const company = await CompanyAPI.getById(req.body.companyId);
    const client = await CompanyAPI.getById(req.body.clientId);
    if (company && client) {
      req.log.info(`Creating payment`);
      if (req.body.tipo === PaymentType.PIX) {
        req.log.info(`Payment type is PIX, setting status to PAID`);
        req.body.status = PaymentStatus.PENDING;
      } else {
        req.log.info(`Payment type is NORMAL, setting status to PENDING`);
        req.body.status = PaymentStatus.PAID;
      }
      const payment = await repositories.create({
        ...req.body,
      });
      req.log.info(`Payment created`);
      return reply.send(payment);
    }
    req.log.warn(`Company or client not found`);
    return reply.status(400).send();
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send();
  }
};

export { create };
