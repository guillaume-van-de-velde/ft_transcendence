import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { initDB } from "./src/db/init/initDB.js";
import { Database } from "sqlite";
import { routes } from "./src/routes/routes.js";
import { initTables } from "./src/db/init/initTables.js";
import fastifyCors from "@fastify/cors";
import { Server as SocketIOServer } from "socket.io";
import { activeSocket } from "./src/sockets/sockets.js";
import fs from "fs";
import { authentication } from "./src/authentication/authentication.js";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import fastifyStatic from "@fastify/static";
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
export let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
export let musicLevels: number[] = [];
export let musicTime: number = 1;

async function fillDb() {
	db = await initDB();
	initTables();
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
	res.status(500).send({ error: "error" });
});

process.on("unhandledRejection", (reason) => {
	console.log("Promise :", reason);
});

process.on("uncaughtException", (err) => {
	console.log("Exception :", err);
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
	try {
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
	} catch (err) {
		console.log("error before start");
		return ;
	}
	start();
}

backendStart();