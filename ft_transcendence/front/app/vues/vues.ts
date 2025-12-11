import { connexionHTML } from "./connexion/connexion.js";
import { logInHTML } from "./connexion/logIn.js";
import { signInHTML } from "./connexion/signIn.js";
import { verifyHTML } from "./connexion/verify.js";
import { gameHTML } from "./game/game.js";
import { insearchHTML } from "./game/inSearch.js";
import { homeHTML } from "./home.js";
import { globalHTML } from "./messages/global.js";
import { notifyHTML } from "./messages/notify.js";
import { privateHTML } from "./messages/private.js";
import { classicHTML } from "./mode/1/classic.js";
import { musicHTML } from "./mode/1/music.js";
import { aiHTML } from "./mode/2/ai.js";
import { localHTML } from "./mode/2/local.js";
import { onlineHTML } from "./mode/2/online.js";
import { matchHTML } from "./mode/3/match.js";
import { tournamentHTML } from "./mode/3/tournament.js";
import { createHTML } from "./mode/3/tournament/create.js";
import { joinHTML } from "./mode/3/tournament/join.js";
import { quitHTML } from "./mode/3/tournament/quit.js";
import { resultsHTML } from "./mode/3/tournament/results.js";
import { historyHTML } from "./player/history.js";
import { statsHTML } from "./player/stats.js";
import { friendsHTML } from "./profile/friends.js";
import { historyUserHTML } from "./profile/historyUser.js";
import { pictureHTML } from "./profile/picture/picture.js";
import { searchHTML } from "./profile/search.js";
import { statsUserHTML } from "./profile/statsUser.js";
import { accountHTML } from "./settings/account.js";
import { deleteHTML } from "./settings/account/delete.js";
import { emailHTML } from "./settings/account/email.js";
import { passwordHTML } from "./settings/account/password.js";
import { pseudoHTML } from "./settings/account/pseudo.js";
import { verifyEmailHTML } from "./settings/account/verify.js";
import { keyHTML } from "./settings/key.js";
import { playerHTML } from "./settings/key/player.js";
import { languageHTML } from "./settings/language.js";
import { settingsHTML } from "./settings/settings.js";
import { volumeHTML } from "./settings/volume.js";

export let vues: any;

export function setVues() {
    vues = {
        home: homeHTML(),
        connexion: {
            connexion: connexionHTML(),
            login: logInHTML(),
            signin: signInHTML(),
            verify: verifyHTML()
        },
        game: {
            game: gameHTML(),
            insearch: insearchHTML()
        },
        messages: {
            global: globalHTML(),
            notify: notifyHTML(),
            private: privateHTML()
        },
        mode: [
            {
                classic: classicHTML(),
                music: musicHTML()
            },
            {
                ai: aiHTML(),
                local: localHTML(),
                online: onlineHTML()
            },
            {
                tournament: {
                    tournament: tournamentHTML(),
                    action: {
                        create: createHTML(),
                        join: joinHTML(),
                        quit: quitHTML(),
                        results: resultsHTML()
                    }
                },
                match: matchHTML()
            }
        ],
        player: {
            history: historyHTML(),
            stats: statsHTML()
        },
        profile: {
            picture: {
                picture: pictureHTML()
            },
            friends: friendsHTML(),
            history: historyUserHTML(),
            search: searchHTML(),
            stats: statsUserHTML()
        },
        settings: {
            settings: settingsHTML(),
            language: languageHTML(),
            volume: volumeHTML(),
            account: {
                account: accountHTML(),
                action: {
                    delete: deleteHTML(),
                    email: emailHTML(),
                    password: passwordHTML(),
                    pseudo: pseudoHTML(),
                    verify: verifyEmailHTML()
                }
            },
            key: {
                key: keyHTML(),
                action: {
                    player: playerHTML()
                }
            }
        }
    }
}