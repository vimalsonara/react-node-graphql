import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import createApploGraphqlServer from "./graphql";
import UserService from "./services/user";
import morgan from "morgan";
import { logger } from "./lib/logger";
dotenv.config();

async function startServer() {
  const app = express();

  const morganFormat = ":method :url :status :response-time ms";

  app.use(bodyParser.json());
  app.use(
    morgan(morganFormat, {
      stream: {
        write: (message: string) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    }),
  );
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  const server = await createApploGraphqlServer();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user = null;
        const token = req.headers["authorization"];

        if (token) {
          try {
            user = UserService.decodeToken(token);
          } catch (err) {
            logger.error("Token decoding error:", err);
          }
        }
        return { user, res };
      },
    }),
  );

  app.listen(process.env.PORT, () =>
    logger.info(`Server is listening on port ${process.env.PORT}`),
  );
}

startServer();
