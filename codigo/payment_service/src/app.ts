import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";
import AutoLoad from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import { initSwagger } from "./swagger";
import { join } from "path";
import {
  LOGTAIL_TOKEN,
  NODE_ENV,
  PINO_LOG_LEVEL,
  PORT,
  Server,
} from "./server";
import * as dotenv from "dotenv";
import { connectDB } from "./database/mongo";

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

connectDB()
  .then(() => {
    server.log.info("Database connected successfully.");
    new Server(server)
      .run()
      .then(() => {
        server.log.info(`Server listening on port ${PORT}`);
      })
      .catch((err) => {
        server.log.error(`Failed to start the server: ${err}`);
        process.exit(1);
      });
  })
  .catch((err) => {
    server.log.error(`Failed to connect to database: ${err}`);
  });
