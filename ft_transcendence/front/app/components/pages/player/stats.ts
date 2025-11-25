import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { dataPlayerCallAPI } from "../../utils/api.js";
import { close2Event } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderHistory } from "./history.js";

export function renderStats(e:Event) {
    if (state.actual == "showPlayerHistory" && clickOnNewPlayer(e))
        delete state.playerData;
    const statsPage: PageInstance = {
        content: page.player.stats,
        level: 2,
        create: stats,
    }
    render(statsPage);
    dataPlayerCallAPI(e);
}

export function stats() {
    const history = document.getElementById("historyPlayer");
    
    history?.addEventListener("click", renderHistory);
    state.events = new Map<Element | null, TypeEvent>([
        [history, {type: "click", callback: renderHistory}],
    ]);
    close2Event();
}

function clickOnNewPlayer(e:Event):boolean {
    let target = (e.target as HTMLElement);

    if (!target.id) {
        target = (e.target as HTMLElement).parentElement!;
    }

    if (target.id && target.id === "statsPlayer")
        return false;

    return true;
}