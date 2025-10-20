import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state, TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderFriends } from "./friends.js";
import { renderHistoryUser } from "./history_user.js";
import { renderStatsUser } from "./stats_user.js";

export function renderSearch() {
    const searchPage: PageInstance = {
        content: page.profile.search,
        level: 1,
        create: search,
    }
    render(searchPage);
}

export function search() {
    const stats = document.getElementById("stats");
    const history = document.getElementById("history");
    const friends = document.getElementById("friends");

    stats?.addEventListener("click", renderStatsUser);
    history?.addEventListener("click", renderHistoryUser);
    friends?.addEventListener("click", renderFriends);

    state.events = new Map<Element | null, TypeEvent>([
        [stats, {type: "click", callback: renderStatsUser}],
        [history, {type: "click", callback: renderHistoryUser}],
        [friends, {type: "click", callback: renderFriends}],
    ]);

    renderPlayer();
    closeEvent();
}
