import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { server } from "../app";

dotenv.config();

export let client: MongoClient;
export let db: Db;

export const connectDB = async () => {
  try {
    if (!client) {
      server.log.info(
        `Connecting to database with url: ${process.env.MONGO_URL}`
      );
      client = await MongoClient.connect(
        process.env.MONGO_URL ||
          "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
      );

      server.log.info("Database connected successfully.");
      db = client.db("test" || process.env.MONGO_DBNAME);
    }
  } catch (err) {
    server.log.error(`Failed to connect to database: ${err}`);
    throw err;
  }
};
