import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const startApolloServer = async (app: Application, httpServer:http.Server) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app } as any);
};

startApolloServer(app, httpServer);

export default httpServer;
