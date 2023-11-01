import { FastifyReply, FastifyRequest } from "fastify";
import repositories from "../../repositories";

import { IPayment } from "../../types/payment";

/**
 * @swagger
 * /api/payments/:id:
 *   put:
 *     tags: [Payment]
 *     description: Edita uma `Payment`
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The Payment ID
 *         required: true
 *     requestBody:
 *       required: true
 *       description: The `CreatePaymentPayload` data.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentPayload'
 *     responses:
 *       204:
 *         description: Accepted.
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
const edit = async (
  req: FastifyRequest<{
    Body: Partial<IPayment>;
    Params: { id: string };
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    req.log.info(`Editing payment ${req.params.id}`);
    const payment = await repositories.update(req.params.id, req.body);
    if (payment) {
      req.log.info(`Payment edited`);
      return reply.status(204).send();
    }
    req.log.warn(`Payment not found`);
    return reply.status(404).send();
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send();
  }
};

export { edit };
