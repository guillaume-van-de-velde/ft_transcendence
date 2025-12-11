import "fastify";
import { FastifyReply } from "fastify";
import { Database } from "sqlite";

interface JwtPayload {
  id: number;
  version: number;
}

declare module "fastify" {
  interface FastifyInstance {
    db: Database;
    auth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    server: FastifyInstance;
    user: JwtPayload | null;
  }
}