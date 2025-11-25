import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { initDB } from "./src/db/init/initDB.js";
import { resultUserTest, testDB } from "./modelTest.js";
import { Database } from "sqlite";
import { routes } from "./src/routes/routes.js";
import { initTables } from "./src/db/init/initTables.js";
import fastifyCors from "@fastify/cors";
import { Server as SocketIOServer } from "socket.io";
import { activeSocket } from "./src/socket/socket.js";
import fs from "fs";
import util from "util";

export const app = fastify();
const port = 4400;
export let db:Database;
export let io:SocketIOServer;

async function fillDb() {
    db = await initDB();
    initTables();
    testDB(db);
}

async function setupCors() {
    await app.register(fastifyCors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["*"]
    })
}

function setupSocket() {
    io = new SocketIOServer(app.server, {
        cors: { origin: "*" }
    });
}

app.get("/", (req, res) => {
    res.send("Hello transcendence");
})

const start = () => {
    try {
        app.listen({port, host: "0.0.0.0"});
    } catch (err) {
        console.log("The server can't start");
    }
}

async function backendStart() {
    await fillDb();
    routes();
    await setupCors();
    setupSocket();
    activeSocket();
    start();
}

backendStart();

function sanitizeForLog(value: any): any {
  // Cas simple (primitifs)
  if (value === null || typeof value !== "object") return value;

  // Tableau : parcours et sanitize chaque élément
  if (Array.isArray(value)) {
    return value.map(item => sanitizeForLog(item));
  }

  // Objet Match (ou autre objet) : on reconstruit un objet "safe"
  const out: any = {};

  for (const key of Object.keys(value)) {
    const val = (value as any)[key];

    // Gestion spéciale des sockets (plural & singular)
    if (key === "sockets" || key === "socket") {
      // on attend un tableau [Socket|undefined, Socket|undefined]
      if (Array.isArray(val)) {
        out[key] = val.map(s => (s ? "[SOCKET]" : null));
        out.socketsStatus = val.map(s => !!s);
      } else {
        // si ce n'est pas un tableau, on masque simplement
        out[key] = val ? "[SOCKET]" : null;
        out.socketsStatus = [!!val];
      }
      continue;
    }

    // Si c'est un objet utilisateur (ex: users array contient UserShortData)
    // ou un autre objet métier : on récurse
    if (val && typeof val === "object") {
      out[key] = sanitizeForLog(val);
    } else {
      // primitive
      out[key] = val;
    }
  }

  return out;
}

const logFile = "logs.json";
export const write = (data: any, match = false) => {
    let dataToLog;
    if (match)
        dataToLog = sanitizeForLog(data);
    else
        dataToLog = data;
    const output = typeof dataToLog === "string"
    ? dataToLog
    : util.inspect(dataToLog, { depth: null, colors: false });

    fs.appendFileSync(logFile, output + "\n");
};