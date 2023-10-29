import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";
import AutoLoad from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import { initSwagger } from "./swagger";
import { join } from "path";
import ajvKeywords from "ajv-keywords";
import { LOGTAIL_TOKEN, NODE_ENV, PINO_LOG_LEVEL, Server } from "./server";
import * as queues from "./queues";

import * as dotenv from "dotenv";

dotenv.config();

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: {
    transport: {
      target: "@logtail/pino",
      options: { sourceToken: LOGTAIL_TOKEN },
    },
    level: PINO_LOG_LEVEL,
    formatters: {
      level: (label: string) => ({ level: label.toUpperCase() }),
    },
  },
  test: false,
};

export const app = (
  opts: FastifyServerOptions = {
    ajv: {
      customOptions: {
        discriminator: true,
        removeAdditional: true,
      },
      plugins: [[ajvKeywords] as any],
    },
    logger: envToLogger[NODE_ENV as keyof typeof envToLogger],
  }
) => {
  const app = Fastify(opts);

  void initSwagger(app);
  void app.register(fastifyCors);
  void app.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: { ...opts, prefix: "/api" },
  });

  return app;
};
export const server = app();

new Server(server)
  .run()
  .then(() => {
    server.log.info("Server started successfully");
    queues
      .subscribe()
      .then(() => {
        server.log.info("Subscribed to queue successfully");
      })
      .catch((err) => {
        server.log.error(`Error subscribing to queue: ${err}`);
      });
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
