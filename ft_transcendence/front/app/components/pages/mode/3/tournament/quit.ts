import { state } from "../../../../../index.js";
import { vues } from "../../../../../vues/vues.js";
import { render } from "../../../../core/render.js";
import { quitTournamentCallAPI } from "../../../../utils/api.js";
import { close2Event, closeEvent } from "../../../../utils/globalEvents.js";
import { PageInstance } from "../../../../utils/interfaces.js";
import { renderTournament } from "../tournament.js";
import { renderResultsTournament } from "./results.js";

export function renderQuitTournament() {
    const quitPage: PageInstance = {
        content: vues.mode[2]!.tournament!.action.quit,
        level: 2,
        create: quitTournament,
    }
    render(quitPage);
}

export function quitTournament() {

    const stay = document.getElementById("stay");
    const quit = document.getElementById("quitConfirm");

    quit?.addEventListener("click", quitTournamentCallAPI);
    stay?.addEventListener("click", renderResultsTournament);

    state.events.set(quit, {type: "click", callback: quitTournamentCallAPI});
    state.events.set(stay, {type: "click", callback: renderResultsTournament});

    close2Event();
}
