import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { updateUsers } from "../../db/crud/update";

export const addUserList = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const keys = Object.keys(reqBody);
    const value = reqBody[keys[1]!];

    const ArrayUser:string[] = await readUser(id, KeyUser.ID).then(user => user[keys[1]!].split(','));
    if (ArrayUser[0] === "")
        ArrayUser[0] = value;
    else
        ArrayUser.push(value);
    const listUser = ArrayUser.join(',');
    await updateUsers(id, keys[1]!, listUser);
}
