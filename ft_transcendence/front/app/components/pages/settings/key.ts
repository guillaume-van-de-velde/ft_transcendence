import { state } from "../../../index.js";
import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderPlayer } from "./key/player.js";
import { renderSettings } from "./settings.js";

export function renderKey() {
    const keyPage: PageInstance = {
        content: page.settings.key.key,
        level: 1,
        create: key,
    }
    render(keyPage);
}

export function key() {
    const settings = document.getElementById("settingsAction");
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");

    settings?.addEventListener("click", renderSettings);
    player1?.addEventListener("click", renderPlayer);
    player2?.addEventListener("click", renderPlayer);

    state.events = new Map<Element | null, TypeEvent>([
        [settings, {type: "click", callback: renderSettings}],
        [player1, {type: "click", callback: renderPlayer}],
        [player2, {type: "click", callback: renderPlayer}]
    ]);
    closeEvent();
}
