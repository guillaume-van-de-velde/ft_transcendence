import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { updateUsers } from "../../db/crud/update";

export const removeUserList = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const keys = Object.keys(reqBody);
    const value = reqBody[keys[1]!];

    let ArrayUser:string[] = await readUser(id, KeyUser.ID).then(user => user[keys[1]!].split(','));
    ArrayUser = ArrayUser.filter(friendId => friendId != value);
    const listUser = ArrayUser.join(',');
    await updateUsers(id, keys[1]!, listUser);
}