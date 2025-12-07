import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { changeModeCallApi } from "../../../utils/api.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderAi } from "../2/ai.js";
import { renderLocal } from "../2/local.js";
import { renderOnline } from "../2/online.js";
import { renderMatch } from "../3/match.js";
import { renderTournament } from "../3/tournament.js";
import { renderMusic } from "./music.js";

export function renderClassic() {
    const classicPage: PageInstance = {
        content: vues.mode[0]!.classic!,
        level: 1,
        create: classic
    }
    render(classicPage);
}

export function classic() {

    if (state.mode[0] === "m") {
        state.mode[0] = "c";
        changeModeCallApi();
    }

    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const music = document.getElementById("music");

    chooseModeFunctionRender(mode1!, mode2!, mode3!);

    music?.addEventListener("click", renderMusic);

    state.events.set(music, {type: "click", callback: renderMusic});

    closeEvent();
}
