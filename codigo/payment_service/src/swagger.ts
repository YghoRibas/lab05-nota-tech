import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import { writeFileSync } from "fs";
import { join } from "path";
import type { SwaggerDefinition } from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";

// Swagger definition
// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md
const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Nota Tech API",
    version: "0.0.1",
    description: "API para gerenciamento de pagamentos de serviços",
  },
  host: `0.0.0.0:${process.env.PORT ?? 3000}`,
};

const apiDirectory = join(__dirname, "routes");

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${apiDirectory}/**/*.js`, `${apiDirectory}/**/*.ts`],
};

export async function initSwagger(app: FastifyInstance) {
  const swaggerSpec = swaggerJsdoc(options);

  // Write to generated swagger file on development
  writeFileSync(
    join(__dirname, "generated", "swagger.json"),
    JSON.stringify(swaggerSpec, null, 2)
  );

  await app.register(fastifySwagger, {
    mode: "static",
    specification: {
      path: join(__dirname, "generated", "swagger.json"),
      postProcessor(swaggerObject) {
        return swaggerObject;
      },
      baseDir: join(__dirname, "generated"),
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest(request, reply, next) {
        next();
      },
      preHandler(request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
}
