import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { disconnect, profileAPI, searchFormCallApi } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderFriends } from "./friends.js";
import { renderHistoryUser } from "./historyUser.js";
import { renderStatsUser } from "./statsUser.js";
import { renderPicture } from "./picture/picture.js";

export function renderSearch() {
    const searchPage: PageInstance = {
        content: vues.profile.search,
        level: 1,
        create: search
    }
    render(searchPage);
}

export function search() {
    const stats = document.getElementById("stats");
    const history = document.getElementById("history");
    const friends = document.getElementById("friends");
    const form = document.getElementById("searchForm");
    const changePicture = document.getElementById("changePicture");
    const disconnectBtn = document.getElementById("disconnect");

    profileAPI();

    disconnectBtn?.addEventListener("click", disconnect);
    changePicture?.addEventListener("click", renderPicture);
    form?.addEventListener("submit", searchFormCallApi);
    stats?.addEventListener("click", renderStatsUser);
    history?.addEventListener("click", renderHistoryUser);
    friends?.addEventListener("click", renderFriends);

    state.events = new Map<Element | null, TypeEvent>([
        [disconnectBtn, {type: "click", callback: disconnect}],
        [changePicture, {type: "click", callback: renderPicture}],
        [stats, {type: "click", callback: renderStatsUser}],
        [history, {type: "click", callback: renderHistoryUser}],
        [friends, {type: "click", callback: renderFriends}],
    ]);

    closeEvent();
}
