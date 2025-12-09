import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { initDB } from "./src/db/init/initDB.js";
import { testDB } from "./modelTest.js";
import { Database } from "sqlite";
import { routes } from "./src/routes/routes.js";
import { initTables } from "./src/db/init/initTables.js";
import fastifyCors from "@fastify/cors";
import { Server as SocketIOServer } from "socket.io";
import { activeSocket } from "./src/sockets/sockets.js";
import fs from "fs";
import util from "util";
import jwt from "jsonwebtoken";
import { authentication } from "./src/authentication/authentication.js";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import fastifyStatic from "@fastify/static";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
export const app = fastify({
	https: {
		key: fs.readFileSync(process.env.KEY_PATH!),
		cert: fs.readFileSync(process.env.CERT_PATH!)
	}
});
const port = parseInt(process.env.PORT!);
export let db: Database;
export let io: SocketIOServer;
export let transporter:nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
export let musicLevels: number[] = [];
export let musicTime:number = 1;

async function fillDb() {
	db = await initDB();
	initTables();
	// testDB(db);
}

async function setupCors() {
	await app.register(fastifyCors, {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["*"]
	})
}

function setupNodemailer() {
	transporter = nodemailer.createTransport({
		service: process.env.SERVICE,
		auth: {
			user: process.env.EMAIL_VERIFY,
			pass: process.env.PASSWORD_VERIFY
		}
	});
}

function setupSocket() {
	io = new SocketIOServer(app.server, {
		cors: { origin: process.env.ORIGIN }
	});
}

app.setErrorHandler((error: FastifyError, req: FastifyRequest, res: FastifyReply) => {
    res.status(500).send({ error: "Une erreur est survenue !" });
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Promise non gérée :", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Exception non catchée :", err);
});

function setupMusic() {
	const json = JSON.parse(fs.readFileSync(process.env.MUSIC!, "utf-8"));

	musicLevels = json.levels;
	musicTime = json.time;
	console.log(`[SERVER] Musique analysée chargée (${musicLevels.length} valeurs)`);
}

function setupFront() {
	const frontPath = process.env.FRONT_PATH!;
	app.register(fastifyStatic, {
		root: frontPath,
		prefix: "/"
	});
}

const start = () => {
	try {
		app.listen({ port, host: process.env.HOST! });
	} catch (err) {
		console.log("The server can't start");
	}
}

async function backendStart() {
	await fillDb();
	routes();
	await setupCors();
	app.decorate("user", null);
	app.decorate('auth', authentication);
	setupFront();
	setupNodemailer();
	setupSocket();
	activeSocket();
	setupMusic();
	start();
}

backendStart();

// function sanitizeForLog(value: any): any {
// 	// Cas simple (primitifs)
// 	if (value === null || typeof value !== "object") return value;

// 	// Tableau : parcours et sanitize chaque élément
// 	if (Array.isArray(value)) {
// 		return value.map(item => sanitizeForLog(item));
// 	}

// 	// Objet Match (ou autre objet) : on reconstruit un objet "safe"
// 	const out: any = {};

// 	for (const key of Object.keys(value)) {
// 		const val = (value as any)[key];

// 		// Gestion spéciale des sockets (plural & singular)
// 		if (key === "sockets" || key === "socket") {
// 			// on attend un tableau [Socket|undefined, Socket|undefined]
// 			if (Array.isArray(val)) {
// 				out[key] = val.map(s => (s ? "[SOCKET]" : null));
// 				out.socketsStatus = val.map(s => !!s);
// 			} else {
// 				// si ce n'est pas un tableau, on masque simplement
// 				out[key] = val ? "[SOCKET]" : null;
// 				out.socketsStatus = [!!val];
// 			}
// 			continue;
// 		}

// 		// Si c'est un objet utilisateur (ex: users array contient UserShortData)
// 		// ou un autre objet métier : on récurse
// 		if (val && typeof val === "object") {
// 			out[key] = sanitizeForLog(val);
// 		} else {
// 			// primitive
// 			out[key] = val;
// 		}
// 	}

// 	return out;
// }

// const logFile = "logs.json";
// export const write = (data: any, match = false) => {
// 	let dataToLog;
// 	if (match)
// 		dataToLog = sanitizeForLog(data);
// 	else
// 		dataToLog = data;
// 	const output = typeof dataToLog === "string"
// 		? dataToLog
// 		: util.inspect(dataToLog, { depth: null, colors: false });

// 	fs.appendFileSync(logFile, output + "\n");
// };