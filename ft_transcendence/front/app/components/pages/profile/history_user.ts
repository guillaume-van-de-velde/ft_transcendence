import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state, TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderFriends } from "./friends.js";
import { renderSearch } from "./search.js";
import { renderStatsUser } from "./stats_user.js";

export function renderHistoryUser() {
    const historyUserPage: PageInstance = {
        content: page.profile.history,
        level: 1,
        create: historyUser,
    }
    render(historyUserPage);
}

export function historyUser() {
    const stats = document.getElementById("stats");
    const friends = document.getElementById("friends");
    const search = document.getElementById("search");

    stats?.addEventListener("click", renderStatsUser);
    friends?.addEventListener("click", renderFriends);
    search?.addEventListener("click", renderSearch);

    state.events = new Map<Element | null, TypeEvent>([
        [stats, {type: "click", callback: renderStatsUser}],
        [friends, {type: "click", callback: renderFriends}],
        [search, {type: "click", callback: renderSearch}]
    ]);

    renderPlayer();
    closeEvent();
}
