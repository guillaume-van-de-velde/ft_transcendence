import { connexion_HTML } from "./connexion/connexion.js";
import { login_HTML } from "./connexion/log_in.js";
import { signin_HTML } from "./connexion/sign_in.js";
import { verify_HTML } from "./connexion/verify.js";
import { game_HTML } from "./game/game.js";
import { insearch_HTML } from "./game/in_search.js";
import { home_HTML } from "./home.js";
import { global_HTML } from "./messages/global.js";
import { notify_HTML } from "./messages/notify.js";
import { private_HTML } from "./messages/private.js";
import { classic_HTML } from "./mode/1/classic.js";
import { music_HTML } from "./mode/1/music.js";
import { ai_HTML } from "./mode/2/ai.js";
import { local_HTML } from "./mode/2/local.js";
import { online_HTML } from "./mode/2/online.js";
import { match_HTML } from "./mode/3/match.js";
import { tournament_HTML } from "./mode/3/tournament.js";
import { create_HTML } from "./mode/3/tournament/create.js";
import { join_HTML } from "./mode/3/tournament/join.js";
import { quit_HTML } from "./mode/3/tournament/quit.js";
import { results_HTML } from "./mode/3/tournament/results.js";
import { history_HTML } from "./player/history.js";
import { stats_HTML } from "./player/stats.js";
import { friends_HTML } from "./profile/friends.js";
import { history_user_HTML } from "./profile/history_user.js";
import { picture_HTML } from "./profile/picture/picture.js";
import { search_HTML } from "./profile/search.js";
import { stats_user_HTML } from "./profile/stats_user.js";
import { account_HTML } from "./settings/account.js";
import { delete_HTML } from "./settings/account/delete.js";
import { email_HTML } from "./settings/account/email.js";
import { password_HTML } from "./settings/account/password.js";
import { pseudo_HTML } from "./settings/account/pseudo.js";
import { verifyEmail_HTML } from "./settings/account/verify.js";
import { key_HTML } from "./settings/key.js";
import { player_HTML } from "./settings/key/player.js";
import { language_HTML } from "./settings/language.js";
import { settings_HTML } from "./settings/settings.js";
import { volume_HTML } from "./settings/volume.js";

export let vues:any;

export function setVues() {
    vues = {
        home: home_HTML(),
        connexion: {
            connexion: connexion_HTML(),
            login: login_HTML(),
            signin: signin_HTML(),
            verify: verify_HTML()
        },
        game: {
            game: game_HTML(),
            insearch: insearch_HTML()
        },
        messages: {
            global: global_HTML(),
            notify: notify_HTML(),
            private: private_HTML()
        },
        mode: [
            {
                classic: classic_HTML(),
                music: music_HTML(),
            },
            {
                ai: ai_HTML(),
                local: local_HTML(),
                online: online_HTML()
            },
            {
                tournament : {
                    tournament: tournament_HTML(),
                    action: {
                        create: create_HTML(),
                        join: join_HTML(),
                        quit: quit_HTML(),
                        results: results_HTML()
                    }
                },
                match: match_HTML(),
            }
        ],
        player: {
            history: history_HTML(),
            stats: stats_HTML(),
        },
        profile: {
            picture: {
                picture: picture_HTML()
            },
            friends: friends_HTML(),
            history: history_user_HTML(),
            search: search_HTML(),
            stats: stats_user_HTML(),
        },
        settings : {
            settings: settings_HTML(),
            language: language_HTML(),
            volume: volume_HTML(),
            account: {
                account: account_HTML(),
                action: {
                    delete: delete_HTML(),
                    email: email_HTML(),
                    password: password_HTML(),
                    pseudo: pseudo_HTML(),
                    verify: verifyEmail_HTML()
                }
            },
            key: {
                key: key_HTML(),
                action: {
                    player: player_HTML()
                }
            }
        }
    }
}