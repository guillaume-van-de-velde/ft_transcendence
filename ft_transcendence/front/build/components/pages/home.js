import { page } from "../../pages/index.js";
import { render } from "../core/render.js";
import { state } from "../core/state.js";
import { renderInSearch } from "./game/in_search.js";
import { renderPrivateMessage } from "./messages/private.js";
import { renderClassic } from "./mode/1/classic.js";
import { renderMusic } from "./mode/1/music.js";
import { renderStatsUser } from "./profile/stats_user.js";
import { renderSettings } from "./settings/settings.js";
export function renderHome() {
    const homePage = {
        content: page.home,
        level: 0,
        create: home,
    };
    render(homePage);
}
export function home() {
    const settings = document.getElementById("settings");
    const profile = document.getElementById("profile");
    const mode = document.getElementById("mode");
    const play = document.getElementById("play");
    const messages = document.getElementById("messages");
    settings?.addEventListener("click", renderSettings);
    profile?.addEventListener("click", renderStatsUser);
    play?.addEventListener("click", renderInSearch);
    messages?.addEventListener("click", renderPrivateMessage);
    let functionMode;
    state.mode[0] === "c" ? functionMode = renderClassic : functionMode = renderMusic;
    mode?.addEventListener("click", functionMode);
    state.events = new Map([
        [settings, { type: "click", callback: renderSettings }],
        [profile, { type: "click", callback: renderStatsUser }],
        [play, { type: "click", callback: renderInSearch }],
        [messages, { type: "click", callback: renderPrivateMessage }],
        [mode, { type: "click", callback: functionMode }]
    ]);
    mode.textContent = state.mode.join('').toUpperCase();
}
