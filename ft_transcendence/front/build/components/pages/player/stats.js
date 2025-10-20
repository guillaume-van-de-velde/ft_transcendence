import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state } from "../../core/state.js";
import { close2Event } from "../../utils/globalEvents.js";
import { renderHistory } from "./history.js";
export function renderStats() {
    const statsPage = {
        content: page.player.stats,
        level: 2,
        create: stats,
    };
    render(statsPage);
}
export function stats() {
    const history = document.getElementById("historyPlayer");
    history?.addEventListener("click", renderHistory);
    state.events = new Map([
        [history, { type: "click", callback: renderHistory }],
    ]);
    close2Event();
}
