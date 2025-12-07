import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { disconnect, pictureAPI, profileAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderFriends } from "./friends.js";
import { renderHistoryUser } from "./historyUser.js";
import { renderSearch } from "./search.js";
import { renderPicture } from "./picture/picture.js";

export function renderStatsUser() {
    const statsUserPage: PageInstance = {
        content: vues.profile.stats,
        level: 1,
        create: statsUser
    }
    render(statsUserPage);
}

export function statsUser() {
    const history = document.getElementById("history");
    const friends = document.getElementById("friends");
    const search = document.getElementById("search");
    const changePicture = document.getElementById("changePicture");
    const played = document.getElementById("played");
    const ratio = document.getElementById("ratio");
    const tournaments = document.getElementById("tournaments");
    const winsTournaments = document.getElementById("winsTournaments");
    const disconnectBtn = document.getElementById("disconnect");

    profileAPI();
    changePicture?.addEventListener("click", renderPicture);
    played!.textContent = `${state.profile.stats.played}`;
    ratio!.textContent = `${state.profile.stats.ratio}`;
    tournaments!.textContent = `${state.profile.stats.tournaments}`;
    winsTournaments!.textContent = `${state.profile.stats.winsTournaments}`;

    disconnectBtn?.addEventListener("click", disconnect);
    history?.addEventListener("click", renderHistoryUser);
    friends?.addEventListener("click", renderFriends);
    search?.addEventListener("click", renderSearch);

    state.events = new Map<Element | null, TypeEvent>([
        [disconnectBtn, {type: "click", callback: disconnect}],
        [changePicture, {type: "click", callback: renderPicture}],
        [history, {type: "click", callback: renderHistoryUser}],
        [friends, {type: "click", callback: renderFriends}],
        [search, {type: "click", callback: renderSearch}]
    ]);

    closeEvent();
}
