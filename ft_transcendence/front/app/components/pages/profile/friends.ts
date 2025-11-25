import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { friendsAPI, profileAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderHistoryUser } from "./history_user.js";
import { renderSearch } from "./search.js";
import { renderStatsUser } from "./stats_user.js";

export function renderFriends() {
    const friendsPage: PageInstance = {
        content: page.profile.friends,
        level: 1,
        create: friends,
    }
    render(friendsPage);
}

export function friends() {
    const stats = document.getElementById("stats");
    const history = document.getElementById("history");
    const search = document.getElementById("search");
    const friendsList = document.getElementById("friendsList");

    profileAPI();
    friendsAPI(friendsList);

    stats?.addEventListener("click", renderStatsUser);
    history?.addEventListener("click", renderHistoryUser);
    search?.addEventListener("click", renderSearch);

    state.events = new Map<Element | null, TypeEvent>([
        [stats, {type: "click", callback: renderStatsUser}],
        [history, {type: "click", callback: renderHistoryUser}],
        [search, {type: "click", callback: renderSearch}]
    ]);

    renderPlayer();
    closeEvent();
}
