import { state } from "../../../../../index.js";
import { vues } from "../../../../../vues/vues.js";
import { render } from "../../../../core/render.js";
import { createTournamentCallApi } from "../../../../utils/api.js";
import { close2Event, closeEvent } from "../../../../utils/globalEvents.js";
import { PageInstance } from "../../../../utils/interfaces.js";

export function renderCreateTournament() {
    const createPage: PageInstance = {
        content: vues.mode[2]!.tournament!.action.create,
        level: 2,
        create: createTournament
    }
    render(createPage);
}

export function createTournament() {

    const form = document.querySelector("form");

    form?.addEventListener("submit", createTournamentCallApi);

    state.events.set(form, {type: "submit", callback: createTournamentCallApi});

    close2Event();
}
