import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { disconnect } from "../../api/connexion/disconnect.js";
import { profileAPI } from "../../api/profile/profileAPI.js";
import { friendsAPI } from "../../api/profile/friendsAPI.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderHistoryUser } from "./historyUser.js";
import { renderSearch } from "./search.js";
import { renderStatsUser } from "./statsUser.js";
import { renderPicture } from "./picture/picture.js";

export function renderFriends() {
    const friendsPage: PageInstance = {
        content: vues.profile.friends,
        level: 1,
        create: friends
    }
    render(friendsPage);
}

export function friends() {
    const stats = document.getElementById("stats");
    const history = document.getElementById("history");
    const search = document.getElementById("search");
    const friendsList = document.getElementById("friendsList");
    const changePicture = document.getElementById("changePicture");
    const disconnectBtn = document.getElementById("disconnect");

    profileAPI();
    friendsAPI(friendsList);

    disconnectBtn?.addEventListener("click", disconnect);
    changePicture?.addEventListener("click", renderPicture);
    stats?.addEventListener("click", renderStatsUser);
    history?.addEventListener("click", renderHistoryUser);
    search?.addEventListener("click", renderSearch);

    state.events = new Map<Element | null, TypeEvent>([
        [disconnectBtn, { type: "click", callback: disconnect }],
        [changePicture, { type: "click", callback: renderPicture }],
        [stats, { type: "click", callback: renderStatsUser }],
        [history, { type: "click", callback: renderHistoryUser }],
        [search, { type: "click", callback: renderSearch }]
    ]);

    renderPlayer();
    closeEvent();
}
