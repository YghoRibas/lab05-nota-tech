import { FastifyReply, FastifyRequest } from "fastify";
import repositories from "../../repositories";

/**
 * @swagger
 * /api/payments/:id:
 *   delete:
 *     tags: [Payment]
 *     description: Deleta um `Payment`
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The Payment ID
 *         required: true
 *     responses:
 *       200:
 *         description: deleted with success.
 *       400:
 *         description: invalid Params ID.
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
const remove = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    req.log.info(`Deleting payment ${req.params.id}`);
    const result = await repositories.delete(req.params.id);
    if (result) {
      req.log.info(`Payment ${req.params.id} deleted`);
      return reply.status(200).send();
    }
    req.log.warn(`Payment ${req.params.id} not found`);
    return reply.status(404).send();
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send();
  }
};

export { remove };
