import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state, TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderFriends } from "./friends.js";
import { renderHistoryUser } from "./history_user.js";
import { renderSearch } from "./search.js";

export function renderStatsUser() {
    const statsUserPage: PageInstance = {
        content: page.profile.stats,
        level: 1,
        create: statsUser,
    }
    render(statsUserPage);
}

export function statsUser() {
    const history = document.getElementById("history");
    const friends = document.getElementById("friends");
    const search = document.getElementById("search");

    history?.addEventListener("click", renderHistoryUser);
    friends?.addEventListener("click", renderFriends);
    search?.addEventListener("click", renderSearch);

    state.events = new Map<Element | null, TypeEvent>([
        [history, {type: "click", callback: renderHistoryUser}],
        [friends, {type: "click", callback: renderFriends}],
        [search, {type: "click", callback: renderSearch}]
    ]);

    closeEvent();
}
