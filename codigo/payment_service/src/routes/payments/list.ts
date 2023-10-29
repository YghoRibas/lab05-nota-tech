import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { ListPaymentFilter } from "../../types/repository";
import repositories from "../../repositories";

/**
 * @swagger
 * /api/payments:
 *   get:
 *     tags: [Payment]
 *     description: Lista um `Payment` com paginação.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The quantity of items to be returned per page.
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: The order in which the data should be listed.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [status, competencia, createdAt]
 *         description: The type of ordering.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page o return.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: *PaymentStatus
 *         description: The `Status` of the payment.
 *     responses:
 *       200:
 *         description: retrieving with success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: invalid querystring
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
const list = async (
  req: FastifyRequest<{ Querystring: ListPaymentFilter }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    req.log.info(`Listing payments`);
    const payment = await repositories.list(req.query as any);
    if (payment) {
      req.log.info(`Payments listed`);
      return reply.status(200).send(payment);
    }
    req.log.warn(`Payments not found`);
    return reply.send(payment);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send();
  }
};

export { list };
