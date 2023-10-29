import { FastifyReply, FastifyRequest } from "fastify";
import repositories from "../../repositories";

import { NfseStatus } from "../../types/nfse";

/**
 * @swagger
 * /api/nfses/:id/cancel:
 *   post:
 *     tags: [NFSe]
 *     description: Cancela uma `NFSe`
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The NFSe ID
 *         required: true
 *     responses:
 *       202:
 *         description: cancelation success.
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
const cancel = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  reply.status(202).send();
  await repositories.update(req.params.id, {
    status: NfseStatus.CANCELLED,
  });
};

export { cancel };
