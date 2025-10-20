import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { state } from "../../../core/state.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { renderAi } from "./ai.js";
import { renderOnline } from "./online.js";
export function renderLocal() {
    const localPage = {
        content: page.mode[1].local,
        level: 1,
        create: local,
    };
    render(localPage);
}
export function local() {
    state.mode[1] = "l";
    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const online = document.getElementById("online");
    const ai = document.getElementById("ai");
    chooseModeFunctionRender(mode1, mode2, mode3);
    online?.addEventListener("click", renderOnline);
    ai?.addEventListener("click", renderAi);
    state.events.set(online, { type: "click", callback: renderOnline });
    state.events.set(ai, { type: "click", callback: renderAi });
    closeEvent();
}
