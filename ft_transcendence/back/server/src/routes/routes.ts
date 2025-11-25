import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../server";
import { resultUserTest } from "../../modelTest";
import { changeUser } from "./changeUser/changeUser";
import { addPlayerToBlockedList, addPlayerToFriendList, addUserList } from "./userList/addUserList";
import { removeUserInBlockedList, removeUserInFriendsList, removeUserList } from "./userList/removeUserList";
import { putNotification } from "./notify/putNotification";
import { removeNotification } from "./notify/removeNotification";
import { openTournament } from "./tournament/openTournament";
import { joinTournament } from "./tournament/joinTournament";
import { quitTournament } from "./tournament/quitTournament";
import { findPlayer } from "./findPlayer/findPlayer";
import { createAccount } from "./connexion/createAccount";
import { connexionAccount } from "./connexion/connexionAccount";
import { getDataPlayer } from "./getDataPlayer/getDataPlayer";
import { takeOffNotification } from "./notify/takeOffNotification";
import { createGame } from "./game/createGame";
import { quitQueue } from "./game/quitQueue";
import { acceptMatch } from "./game/acceptMatch";

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
    app.post("/api/profile/friends/add", addPlayerToFriendList);
    app.post("/api/profile/blocked/add", addPlayerToBlockedList);
    app.delete("/api/profile/friends/remove", removeUserInFriendsList);
    app.delete("/api/profile/blocked/remove", removeUserInBlockedList);
    app.post("/api/profile/notify/put", putNotification);
    app.delete("/api/profile/notify/remove", removeNotification);
    app.delete("/api/profile/notify/takeoff", takeOffNotification);
    app.get("/api/profile/search", findPlayer);
    app.post("/api/mode/tournament/open", openTournament);
    app.put("/api/mode/tournament/join", joinTournament);
    app.put("/api/mode/tournament/quit", quitTournament);
    app.get("/api/player", getDataPlayer);
    app.post("/api/game/search", createGame);
    app.delete("/api/game/quit", quitQueue);
    app.post("/api/game/accept", acceptMatch);
}
