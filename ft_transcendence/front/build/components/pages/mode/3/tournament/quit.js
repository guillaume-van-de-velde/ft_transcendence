import { page } from "../../../../../pages/index.js";
import { render } from "../../../../core/render.js";
import { state } from "../../../../core/state.js";
import { close2Event } from "../../../../utils/globalEvents.js";
import { renderTournamentHandle } from "../tournament.js";
import { renderResultsTournament } from "./results.js";
export function renderQuitTournament() {
    const quitPage = {
        content: page.mode[2].tournament.action.quit,
        level: 2,
        create: quitTournament,
    };
    render(quitPage);
}
export function quitTournament() {
    const stay = document.getElementById("stay");
    const quit = document.getElementById("quitConfirm");
    quit?.addEventListener("click", renderTournamentHandle);
    stay?.addEventListener("click", renderResultsTournament);
    state.events.set(quit, { type: "click", callback: renderTournamentHandle });
    state.events.set(stay, { type: "click", callback: renderResultsTournament });
    close2Event();
}
