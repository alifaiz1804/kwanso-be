import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db";
import { router } from "./routes";

import swaggerUi from "swagger-ui-express";

import * as swaggerDocument from "./swagger.json";

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

connectDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
