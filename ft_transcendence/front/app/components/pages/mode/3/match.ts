import { state } from "../../../../index.js";
import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { changeModeCallApi } from "../../../utils/api.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderClassic } from "../1/classic.js";
import { renderOnline } from "../2/online.js";
import { renderTournament } from "./tournament.js";

export function renderMatch() {
    const matchPage: PageInstance = {
        content: page.mode[2]!.match!,
        level: 1,
        create: match,
    }
    render(matchPage);
}

export function match() {

    if (state.mode[2] === "t") {
        state.mode[2] = "m";
        changeModeCallApi();
    }

    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const tournament = document.getElementById("tournament");

    chooseModeFunctionRender(mode1!, mode2!, mode3!);

    tournament?.addEventListener("click", renderTournament);

    state.events.set(tournament, {type: "click", callback: renderTournament});

    closeEvent();
}
