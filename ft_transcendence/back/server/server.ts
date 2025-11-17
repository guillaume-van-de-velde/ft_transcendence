import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { initDB } from "./src/db/init/initDB.js";
import { resultUserTest, testDB } from "./modelTest.js";
import { Database } from "sqlite";
import { routes } from "./src/routes/routes.js";
import { initTables } from "./src/db/init/initTables.js";
import fastifyCors from "@fastify/cors";
import { Server as SocketIOServer } from "socket.io";
import { activeSocket } from "./src/socket/socket.js";

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
        app.listen({port});
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