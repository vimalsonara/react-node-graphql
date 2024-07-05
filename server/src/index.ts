import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./lib/db";

dotenv.config();

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: /* GraphQL */ `
      type User {
        id: ID!
        name: String!
        email: String!
        userName: String!
      }

      type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean 
      }

      type Query {
        hello: String
        getAllUsers: [User]
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world!",
        getAllUsers: () => [
          {
            id: "1",
            name: "John",
            email: "pKs6k@example.com",
            userName: "john",
          },
        ],
      },
      Mutation: {
        createUser: async (_, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
          await prisma.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: "123",
            }
          })
          return true
        },
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port ${process.env.PORT}`)
  );
}

startServer();
