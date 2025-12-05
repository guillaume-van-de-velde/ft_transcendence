import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { changeModeCallApi } from "../../../utils/api.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderClassic } from "./classic.js";

export function renderMusic() {
    const musicPage: PageInstance = {
        content: vues.mode[0]!.music!,
        level: 1,
        create: music,
    }
    render(musicPage);
}

export function music() {

    if (state.mode[0] === "c") {
        state.mode[0] = "m";
        changeModeCallApi();
    }

    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const classic = document.getElementById("classic");

    chooseModeFunctionRender(mode1!, mode2!, mode3!);

    classic?.addEventListener("click", renderClassic);

    state.events.set(classic, {type: "click", callback: renderClassic});

    closeEvent();
}
