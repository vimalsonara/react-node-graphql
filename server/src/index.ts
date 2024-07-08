import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import createApploGraphqlServer from "./graphql";
import UserService from "./services/user";
dotenv.config();

async function startServer() {

  const app = express();

  app.use(bodyParser.json());

  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ message: "Server is up and running" })
  })

  app.use("/graphql", expressMiddleware(await createApploGraphqlServer(), {
    context: async ({ req }) => {
      const token = req.headers['authorization']

      if (!token) {
        return { user: null }
      }
      try {
        const user = UserService.decodeToken(token)
        return { user }
      } catch (err) {
        return { err }
      }
    },
  }));

  app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port ${process.env.PORT}`)
  );
}

startServer();
