import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state, TypeEvent } from "../../core/state.js";
import { close2Event } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderHistory } from "./history.js";

export function renderStats() {
    const statsPage: PageInstance = {
        content: page.player.stats,
        level: 2,
        create: stats,
    }
    render(statsPage);
}

export function stats() {
    
    const history = document.getElementById("historyPlayer");
    
    history?.addEventListener("click", renderHistory);
    state.events = new Map<Element | null, TypeEvent>([
            [history, {type: "click", callback: renderHistory}],
        ]);
    close2Event();
}
