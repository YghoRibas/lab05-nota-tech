import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { ListNfseFilter } from "../../types/repository";
import repositories from "../../repositories";

/**
 * @swagger
 * /api/nfses:
 *   get:
 *     tags: [NFSe]
 *     description: List a `NFSe` by CompanyId with pagination.
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
 *           enum: [identificacao.numero, identificacao.competencia, createdAt]
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
 *           enum: *NfseStatus
 *         description: The `Status` of the nfse.
 *       - in: query
 *         name: numero
 *         schema:
 *           type: number
 *         description: The NFSe's number.
 *       - in: query
 *         name: competencia
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of competencia of nfse
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Date of competencia of nfse
 *         required: true
 *     responses:
 *       200:
 *         description: retrieving with success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFSe'
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
  req: FastifyRequest<{ Querystring: ListNfseFilter }>,
  reply: FastifyReply
): Promise<void> => {
  const nfse = await repositories.list(req.query as any);

  return reply.send(nfse);
};

export { list };
