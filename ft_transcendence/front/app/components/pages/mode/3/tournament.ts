import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { state } from "../../../core/state.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderMatch } from "./match.js";
import { renderCreateTournament } from "./tournament/create.js";
import { renderJoinTournament } from "./tournament/join.js";

export function renderTournamentHandle() {
    renderTournament();
}

export function renderTournament() {
    const tournamentPage: PageInstance = {
        content: page.mode[2]!.tournament!.tournament,
        level: 1,
        create: tournament,
    }
    render(tournamentPage);
}

export function tournament() {
    
    state.mode[2] = "t";

    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const match = document.getElementById("match");
    const create = document.getElementById("create");
    const join = document.getElementById("join");

    chooseModeFunctionRender(mode1!, mode2!, mode3!);

    match?.addEventListener("click", renderMatch);
    create?.addEventListener("click", renderCreateTournament);
    join?.addEventListener("click", renderJoinTournament);

    state.events.set(match, {type: "click", callback: renderMatch});
    state.events.set(create, {type: "click", callback: renderCreateTournament});
    state.events.set(join, {type: "click", callback: renderJoinTournament});

    closeEvent();
}
