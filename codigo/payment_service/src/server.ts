import { FastifyInstance } from "fastify";
import { inspect } from "util";
import { errorParser, InternalServerError } from "./utils/errors";
import { server } from "./app";
import * as dotenv from "dotenv";

dotenv.config();

export const PORT = (process.env.PORT ?? 3000) as number;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const LOGTAIL_TOKEN = process.env.LOGTAIL_TOKEN;
export const PINO_LOG_LEVEL = process.env.PINO_LOG_LEVEL || "info";
export const GRPC_ADDRESS = process.env.GRPC_ADDRESS || "127.0.0.1:50021";

export class Server {
  constructor(private app: FastifyInstance) {}

  async run(): Promise<FastifyInstance> {
    try {
      await this.prepare();
      await this.start();
    } catch (err) {
      throw new InternalServerError(
        errorParser(err as InternalServerError).msg
      );
    }
    return this.app;
  }

  private async prepare(): Promise<Server> {
    try {
      this.app.log.info("Loading the plugin...");
      await this.app.ready();
      this.app.log.info("Plugins loaded successfully.");

      return this;
    } catch (err) {
      throw new InternalServerError(
        `Failed to load plugins: ${inspect(
          errorParser(err as InternalServerError)
        )} `
      );
    }
  }

  private async start(): Promise<string> {
    try {
      this.app.log.info("Starting the server...");
      const address = await this.app.listen({ port: PORT, host: "0.0.0.0" });

      return address;
    } catch (err) {
      throw new InternalServerError(
        `Failed to start the server: ${inspect(
          errorParser(err as InternalServerError)
        )} `
      );
    }
  }

  async close(): Promise<void> {
    try {
      this.app.log.info("Closing the server...");
      await this.app.close();
    } catch (err) {
      throw new InternalServerError(
        `Failed to close the server: ${inspect(
          errorParser(err as InternalServerError)
        )} `
      );
    }
  }

  get _app(): FastifyInstance {
    return this.app;
  }
}

async function catchProcessDeath() {
  await server.close();
  process.exit(0);
}

process.on("SIGTERM", catchProcessDeath);
process.on("SIGINT", catchProcessDeath);
process.on("SIGHUP", catchProcessDeath);

process.on("exit", () => {
  server.log.info("exiting...");
});
