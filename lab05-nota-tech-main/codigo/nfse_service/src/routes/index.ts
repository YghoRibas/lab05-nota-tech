import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     InternalServerError:
   *       type: object
   *       properties:
   *         statusCode:
   *           type: integer
   *           description: HTTP Status Code.
   *           default: 500
   *         error:
   *           type: string
   *           description: HTTP Message Code.
   *           default: "Internal Server Error"
   *         message:
   *           type: string
   *           description: A message describing the reason for the error.
   *     BadRequest:
   *       type: object
   *       properties:
   *         statusCode:
   *           type: integer
   *           description: HTTP Status Code.
   *           default: 400
   *         error:
   *           type: string
   *           description: HTTP Message Code.
   *           default: "Bad Request"
   *         message:
   *           type: string
   *           description: A message describing the reason for the error.
   */
  fastify.get("/", async (_request, _reply) => ({ status: true }));
};

export default root;
