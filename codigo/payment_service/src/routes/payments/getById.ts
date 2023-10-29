import { FastifyReply, FastifyRequest } from "fastify";

import repositories from "../../repositories";

/**
 * @swagger
 * /api/payments/:id:
 *   get:
 *     tags: [Payment]
 *     description: Retorna uma `Payment` pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The Payment ID
 *         required: true
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
 *       500:
 *         description: Internal Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
const getById = async (
  req: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const payment = await repositories.find(req.params.id);
    if (payment) {
      req.log.info(`Payment with id ${req.params.id} found`);
      return reply.send(payment);
    }

    req.log.warn(`Payment with id ${req.params.id} not found`);
    return reply.status(404).send();
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send();
  }
};

export { getById };
