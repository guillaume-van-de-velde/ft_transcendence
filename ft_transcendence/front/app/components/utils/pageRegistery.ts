import { connexion } from "../pages/connexion/connexion.js";
import { logIn } from "../pages/connexion/logIn.js";
import { signIn } from "../pages/connexion/signIn.js";
import { verify } from "../pages/connexion/verify.js";
import { game } from "../pages/game/game.js";
import { inSearch } from "../pages/game/inSearch.js";
import { home } from "../pages/home.js";
import { global } from "../pages/messages/global.js";
import { notify } from "../pages/messages/notify.js";
import { privateMessage } from "../pages/messages/private.js";
import { classic } from "../pages/mode/1/classic.js";
import { music } from "../pages/mode/1/music.js";
import { ai } from "../pages/mode/2/ai.js";
import { local } from "../pages/mode/2/local.js";
import { online } from "../pages/mode/2/online.js";
import { match } from "../pages/mode/3/match.js";
import { tournament } from "../pages/mode/3/tournament.js";
import { createTournament } from "../pages/mode/3/tournament/create.js";
import { joinTournament } from "../pages/mode/3/tournament/join.js";
import { quitTournament } from "../pages/mode/3/tournament/quit.js";
import { resultsTournament } from "../pages/mode/3/tournament/results.js";
import { history } from "../pages/player/history.js";
import { stats } from "../pages/player/stats.js";
import { friends } from "../pages/profile/friends.js";
import { historyUser } from "../pages/profile/historyUser.js";
import { picture } from "../pages/profile/picture/picture.js";
import { search } from "../pages/profile/search.js";
import { statsUser } from "../pages/profile/statsUser.js";
import { account } from "../pages/settings/account.js";
import { deleteAccount } from "../pages/settings/account/delete.js";
import { email } from "../pages/settings/account/email.js";
import { password } from "../pages/settings/account/password.js";
import { pseudo } from "../pages/settings/account/pseudo.js";
import { verifyEmail } from "../pages/settings/account/verify.js";
import { key } from "../pages/settings/key.js";
import { player } from "../pages/settings/key/player.js";
import { language } from "../pages/settings/language.js";
import { settings } from "../pages/settings/settings.js";
import { volume } from "../pages/settings/volume.js";

export const pageRegistery: Record<string, Function> = {
    connexion,
    logIn,
    signIn,
    verify,
    home,
    settings,
    volume,
    language,
    key,
    account,
    player,
    deleteAccount,
    email,
    password,
    pseudo,
    verifyEmail,
    picture,
    friends,
    historyUser,
    search,
    statsUser,
    history,
    stats,
    classic,
    music,
    ai,
    local,
    online,
    match,
    tournament,
    createTournament,
    joinTournament,
    quitTournament,
    resultsTournament,
    privateMessage,
    notify,
    global,
    inSearch,
    game
}