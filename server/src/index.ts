import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import createApploGraphqlServer from "./graphql";
import UserService from "./services/user";
dotenv.config();

async function startServer() {
  const app = express();
  app.use(bodyParser.json());
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
            console.error("Token decoding error:", err);
          }
        }
        return { user, res };
      },
    }),
  );

  app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port ${process.env.PORT}`),
  );
}

startServer();
