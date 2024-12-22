import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers.js";

dotenv.config();

const typeDefs = await readFile("src/schema.graphql", "utf8");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await apolloServer.start();

    app.use("/graphql", expressMiddleware(apolloServer));

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

startServer();
