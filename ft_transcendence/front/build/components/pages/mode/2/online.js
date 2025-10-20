import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { state } from "../../../core/state.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { renderAi } from "./ai.js";
import { renderLocal } from "./local.js";
export function renderOnline() {
    const onlinePage = {
        content: page.mode[1].online,
        level: 1,
        create: online,
    };
    render(onlinePage);
}
export function online() {
    state.mode[1] = "o";
    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const ai = document.getElementById("ai");
    const local = document.getElementById("local");
    chooseModeFunctionRender(mode1, mode2, mode3);
    ai?.addEventListener("click", renderAi);
    local?.addEventListener("click", renderLocal);
    state.events.set(ai, { type: "click", callback: renderAi });
    state.events.set(local, { type: "click", callback: renderLocal });
    closeEvent();
}
