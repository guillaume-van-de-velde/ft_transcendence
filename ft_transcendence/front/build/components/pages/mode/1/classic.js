import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { state } from "../../../core/state.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { renderMusic } from "./music.js";
export function renderClassic() {
    const classicPage = {
        content: page.mode[0].classic,
        level: 1,
        create: classic,
    };
    render(classicPage);
}
export function classic() {
    state.mode[0] = "c";
    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const music = document.getElementById("music");
    chooseModeFunctionRender(mode1, mode2, mode3);
    music?.addEventListener("click", renderMusic);
    state.events.set(music, { type: "click", callback: renderMusic });
    closeEvent();
}
