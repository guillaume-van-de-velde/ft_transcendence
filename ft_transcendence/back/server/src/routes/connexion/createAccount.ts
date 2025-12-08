import { FastifyReply, FastifyRequest } from "fastify";
import { createStat, createUser } from "../../db/crud/create";
import { getAllDataForUser } from "./getAllDataForUser";
import { app, transporter } from "../../../server";
import { KeyUser, Verify } from "../../utils/enums";
import { readUser } from "../../db/crud/read";
import nodemailer from "nodemailer";
import { createCode } from "./code";
import bcrypt from "bcrypt";
import { emailValid, passwordValid, pseudoValid } from "./formValidity";

export const createAccount = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const { email, pseudo, language } = reqBody;
    const password = await bcrypt.hash(reqBody.password, 1);
    let userId:number = 0;

    if (!emailValid(email) || !passwordValid(reqBody.password) || !pseudoValid(pseudo))
        return res.code(409).send("email, password, or pseudo aren't format correctly");

    try {
        userId = await readUser(email, KeyUser.EMAIL, true);
        if (userId)
            return res.code(409).send("email exists");
        userId = await readUser(pseudo, KeyUser.PSEUDO, true);
        if (userId)
            return res.code(409).send("pseudo exists");
    } catch (err) {
        return res.code(409).send("database error");
    }

    await createCode(email, password, language, pseudo);

    return res.code(200).send({flag: "ok"});
}