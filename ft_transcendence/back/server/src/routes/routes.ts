import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../server";
import { resultUserTest } from "../../modelTest";
import { changeUser } from "./changeUser/changeUser";
import { addUserList } from "./userList/addUserList";
import { removeUserList } from "./userList/removeUserList";
import { putNotification } from "./notify/putNotification";
import { removeNotification } from "./notify/removeNotification";
import { openTournament } from "./tournament/openTournament";
import { joinTournament } from "./tournament/joinTournament";
import { quitTournament } from "./tournament/quitTournament";
import { findPlayer } from "./findPlayer/findPlayer";
import { createAccount } from "./connexion/createAccount";
import { connexionAccount } from "./connexion/connexionAccount";
import { getDataPlayer } from "./getDataPlayer/getDataPlayer";

export const testAPI = async (req:FastifyRequest, res:FastifyReply) => {
    return ({ resultUserTest });
}

export function routes() {
    app.get("/api/test", testAPI);

    app.get("/api/login", connexionAccount);
    app.post("/api/signin", createAccount);
    app.put("/api/settings/volume/general", changeUser);
    app.put("/api/settings/volume/noises", changeUser);
    app.put("/api/settings/volume/music", changeUser);
    app.put("/api/settings/key/player1/up", changeUser);
    app.put("/api/settings/key/player1/down", changeUser);
    app.put("/api/settings/key/player2/up", changeUser);
    app.put("/api/settings/key/player2/down", changeUser);
    app.put("/api/settings/account/email", changeUser);
    app.put("/api/settings/account/password", changeUser);
    app.put("/api/settings/account/pseudo", changeUser);
    app.put("/api/settings/language", changeUser);
    app.put("/api/mode", changeUser);
    app.put("/api/profile/picture", changeUser);
    app.post("/api/profile/friends/add", addUserList);
    app.post("/api/profile/blocked/add", addUserList);
    app.delete("/api/profile/friends/remove", removeUserList);
    app.delete("/api/profile/blocked/remove", removeUserList);
    app.post("/api/profile/notify/put", putNotification);
    app.delete("/api/profile/notify/remove", removeNotification);
    app.get("/api/profile/search", findPlayer);
    app.post("/api/mode/tournament/open", openTournament);
    app.put("/api/mode/tournament/join", joinTournament);
    app.put("/api/mode/tournament/quit", quitTournament);
    app.get("/api/player", getDataPlayer);
}
