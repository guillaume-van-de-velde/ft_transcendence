import { page } from "../../../../../pages/index.js";
import { render } from "../../../../core/render.js";
import { state } from "../../../../core/state.js";
import { close2Event } from "../../../../utils/globalEvents.js";
import { renderResultsTournamentHandle } from "./results.js";
export function renderCreateTournament() {
    const createPage = {
        content: page.mode[2].tournament.action.create,
        level: 2,
        create: createTournament,
    };
    render(createPage);
}
export function createTournament() {
    const form = document.querySelector("form");
    form?.addEventListener("submit", renderResultsTournamentHandle);
    state.events.set(form, { type: "submit", callback: renderResultsTournamentHandle });
    close2Event();
}
