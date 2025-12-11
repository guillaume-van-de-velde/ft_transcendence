import { FastifyReply, FastifyRequest } from "fastify";
import { transporter } from "../../../server";
import { Verify } from "../../utils/enums";
import { createStat, createUser } from "../../db/crud/create";
import { getAllDataForUser } from "./getAllDataForUser";
import { readUserWithEmail } from "../../db/crud/read";
import jwt from "jsonwebtoken";
import { userSockets } from "../../sockets/sockets";

export let verifyCodes: Verify[] = [];

export function generate2FACode(): number {
    return Math.floor(100000 + Math.random() * 900000);
}

export async function createCode(email: string, password: string, language: string | null = "ENG", pseudo: string | null = null, newEmail: string | null = null) {
    const code = generate2FACode();
    const info = await transporter.sendMail({
        from: `"Pong" <${process.env.EMAIL_VERIFY}>`,
        to: email,
        subject: "Verification code",
        text: `Your code is : ${code}\nThis code expire in 5 minutes.`
    });
    const verify: Verify = {
        code,
        expire: Date.now() + 5 * 60 * 1000,
        email,
        language,
        password,
        pseudo,
        newEmail
    };
    verifyCodes.push(verify);
}

export const verifyCode = async (req: FastifyRequest, res: FastifyReply) => {
    const codeReq = parseInt(req.headers.code as string);
    let userId: number = 0;
    let user: any;

    for (const verifyCode of verifyCodes) {
        if (verifyCode.code === codeReq) {
            const { expire, email, password, pseudo, language } = verifyCode;
            verifyCodes.splice(verifyCodes.findIndex(v => v.code == verifyCode.code), 1);
            if (expire < Date.now())
                return res.code(401).send({ error: "code expire" });
            if (pseudo) {
                try {
                    userId = await createUser(email, password, pseudo, "https://www.nicepng.com/png/detail/115-1150821_default-avatar-comments-sign-in-icon-png.png", language!);
                } catch (err) {
                    return res.code(409).send({ error: "error database" });
                }
                await createStat(userId);
                const data = await getAllDataForUser(userId);
                const token = jwt.sign(
                    {
                        id: userId,
                        version: 1
                    },
                    "SecretKeyTest",
                    { expiresIn: '1d' }
                );
                return { token, data };
            } else {
                try {
                    user = await readUserWithEmail(email);
                } catch (err) {
                    return res.code(409).send({ error: "error database" });
                }
                for (const [socket, id] of userSockets) {
                    if (id === user.id) {
                        socket.disconnect(true);
                        userSockets.delete(socket);
                    }
                }
                const data = await getAllDataForUser(user.id);
                const token = jwt.sign(
                    {
                        id: user.id,
                        version: user.version
                    },
                    process.env.SECRET_KEY!,
                    { expiresIn: '1d' }
                );
                return { token, data };
            }
        }
    }
    return res.code(401).send({ error: "code incorrect" });
}