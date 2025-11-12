import "fastify";
import { Database } from "sqlite";

declare module "fastify" {
  interface FastifyInstance {
    db: Database;
  }
  interface FastifyRequest {
    server: FastifyInstance;
  }
}