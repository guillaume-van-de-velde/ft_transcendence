import { page } from "../../../../../pages/index.js";
import { render } from "../../../../core/render.js";
import { state } from "../../../../core/state.js";
import { close2Event } from "../../../../utils/globalEvents.js";
import { PageInstance } from "../../../../utils/interfaces.js";
import { renderResultsTournamentHandle } from "./results.js";

export function renderJoinTournament() {
    const joinPage: PageInstance = {
        content: page.mode[2]!.tournament!.action.join,
        level: 2,
        create: joinTournament,
    }
    render(joinPage);
}

export function joinTournament() {

    const form = document.querySelector("form");

    form?.addEventListener("submit", renderResultsTournamentHandle);

    state.events.set(form, {type: "submit", callback: renderResultsTournamentHandle});

    close2Event();
}
