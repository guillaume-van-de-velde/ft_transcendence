import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { changeModeCallApi } from "../../../api/profile/changeModeCallApi.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
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

    state.events.set(music, { type: "click", callback: renderMusic });

    closeEvent();
}
