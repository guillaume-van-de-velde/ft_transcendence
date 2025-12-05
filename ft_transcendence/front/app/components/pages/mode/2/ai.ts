import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { state } from "../../../../index.js";
import { chooseModeFunctionRender, closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderLocal } from "./local.js";
import { renderOnline } from "./online.js";
import { changeModeCallApi } from "../../../utils/api.js";

export function renderAi() {
    const aiPage: PageInstance = {
        content: vues.mode[1]!.ai!,
        level: 1,
        create: ai,
    }
    render(aiPage);
}

export function ai() {

    if (state.mode[1] === "l" || state.mode[1] === 'o') {
        state.mode[1] = "a";
        changeModeCallApi();
    }

    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const online = document.getElementById("online");
    const local = document.getElementById("local");

    chooseModeFunctionRender(mode1!, mode2!, mode3!);

    online?.addEventListener("click", renderOnline);
    local?.addEventListener("click", renderLocal);

    state.events.set(online, {type: "click", callback: renderOnline});
    state.events.set(local, {type: "click", callback: renderLocal});

    closeEvent();
}
