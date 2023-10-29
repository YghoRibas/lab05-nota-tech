import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";
var cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({message: err.message})
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error: ${err.message}`
  })
})

const port = 3001

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
