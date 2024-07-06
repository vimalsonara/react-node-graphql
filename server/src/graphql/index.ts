import { ApolloServer } from "@apollo/server";
import { prisma } from "../lib/db";
import { User } from "./user";

async function createApploGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        ${User.queries}
      }
      type Mutation {
        ${User.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await server.start();

  return server;
}

export default createApploGraphqlServer;
