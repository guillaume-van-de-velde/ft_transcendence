import { FastifyReply, FastifyRequest } from "fastify";
import { getAllDataForUser } from "./getAllDataForUser";
import { Provisionnal } from "../../utils/enums";
import { generate2FACode } from "./code";
import { transporter } from "../../../server";
import bcrypt from "bcrypt";
import { readUserWithEmail } from "../../db/crud/read";

export let provisional:Provisionnal[] = [];

export const sendPassword = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const email = reqBody.email;
    let user:any = null;

    try {
        user = await readUserWithEmail(email);
    } catch (err) {
        return res.code(409).send("email doesn't exist");
    }
    if (!user)
        return res.code(409).send("email doesn't exist");

    const code = generate2FACode();
    await transporter.sendMail({
        from: `"Pong" <${process.env.EMAIL_VERIFY}>`,
        to: email,
        subject: "Provisionnal Password",
        text: `Your code is : ${code}\nThis code expire in 5 minutes.`
    });
    const hash = await bcrypt.hash(code.toString(), 1);
    const password:Provisionnal = {
        email,
        password: hash,
        expire : Date.now() + 5 * 60 * 1000
    };
    provisional.push(password);
}