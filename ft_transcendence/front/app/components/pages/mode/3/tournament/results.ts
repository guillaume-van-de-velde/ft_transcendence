import { page } from "../../../../../pages/index.js";
import { render } from "../../../../core/render.js";
import { state } from "../../../../core/state.js";
import { chooseModeFunctionRender, closeEvent, renderPlayer } from "../../../../utils/globalEvents.js";
import { PageInstance } from "../../../../utils/interfaces.js";
import { renderQuitTournament } from "./quit.js";

export function renderResultsTournamentHandle(e: Event) {
    e.preventDefault();
    renderResultsTournament();
}

export function renderResultsTournament() {
    const resultsPage: PageInstance = {
        content: page.mode[2]!.tournament!.action.results,
        level: 1,
        create: resultsTournament,
    }
    render(resultsPage);
}

export function resultsTournament() {
    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const quit = document.getElementById("quit");

    chooseModeFunctionRender(mode1!, mode2!, mode3!);

    quit?.addEventListener("click", renderQuitTournament);

    state.events.set(quit, {type: "click", callback: renderQuitTournament});

    renderPlayer();
    closeEvent();
}
