import { state } from "../../../../../index.js";
import { page } from "../../../../../pages/index.js";
import { render } from "../../../../core/render.js";
import { joinTournamentCallApi } from "../../../../utils/api.js";
import { close2Event } from "../../../../utils/globalEvents.js";
import { PageInstance } from "../../../../utils/interfaces.js";

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

    form?.addEventListener("submit", joinTournamentCallApi);

    state.events.set(form, {type: "submit", callback: joinTournamentCallApi});

    close2Event();
}
