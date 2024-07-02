import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express, { Application } from "express";
import cors from "cors";

import mongoose from "mongoose";
import { typeDefs } from "../src/graphql/typedefs/typedef";
import { resolvers } from "../src/graphql/resolvers/resolover";

const app: Application = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URL as string)
      .then(() => console.log("database connected: "));
  } catch (error) {
    console.log(error);
  }
};

const startApolloServer = async (app: Application, httpServer: http.Server) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  if (mongoose.connection.readyState !== 1) {
    await connectDatabase();
  }
  await server.start();
  console.log("---server started");
  server.applyMiddleware({ app } as any);
};

startApolloServer(app, httpServer);

export default httpServer;
