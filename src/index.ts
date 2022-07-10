import express, { json } from "express";
import "express-async-errors";

import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/router.js";

const server = express();

dotenv.config();

server.use(cors());
server.use(json());
server.use(router);
server.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(
    chalk.bold.greenBright("\n🚀 Server is running!") +
      chalk.bold.cyanBright("\n\nListening on port " + PORT + "...\n")
  );
});
