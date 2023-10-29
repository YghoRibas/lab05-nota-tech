import { FastifyReply, FastifyRequest } from "fastify";
import repositories from "../../repositories";

import { CreateNfsePayload } from "../../interfaces/createNfsePayload";

/**
 * @swagger
 * /api/nfses:
 *   post:
 *     tags: [NFSe]
 *     description: Create a new `NFSe`
 *     requestBody:
 *       required: true
 *       description: The `CreateUpdateNFSePayload` data.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNfsePayload'
 *     responses:
 *       201:
 *         description: deletion success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFSe'
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
const create = async (
  req: FastifyRequest<{ Body: CreateNfsePayload }>,
  reply: FastifyReply
): Promise<void> => {
  const nfse = await repositories.create(req.body as any);

  return reply.send(nfse);
};

export { create };
