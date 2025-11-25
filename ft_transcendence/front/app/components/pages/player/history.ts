import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { printHistory } from "../../utils/api.js";
import { close2Event, renderPlayer2 } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderStats } from "./stats.js";

export function renderHistory() {
    const historyPage: PageInstance = {
        content: page.player.history,
        level: 2,
        create: history,
    }
    render(historyPage);
}

export function history() {
    const stats = document.getElementById("statsPlayer");

    printHistory();

    state.actual = "showPlayerHistory";

    stats?.addEventListener("click", renderStats);
    state.events = new Map<Element | null, TypeEvent>([
        [stats, {type: "click", callback: renderStats}],
    ]);

    renderPlayer2();
    close2Event();
}
