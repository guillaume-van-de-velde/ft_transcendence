import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { state } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { renderKey } from "../key.js";
import { renderSettings } from "../settings.js";
export function renderPlayer() {
    const playerPage = {
        content: page.settings.key.action.player1,
        level: 1,
        create: player,
    };
    render(playerPage);
}
export function player() {
    const settings = document.getElementById("settingsAction");
    const key = document.getElementById("key");
    settings?.addEventListener("click", renderSettings);
    key?.addEventListener("click", renderKey);
    state.events = new Map([
        [settings, { type: "click", callback: renderSettings }],
        [key, { type: "click", callback: renderKey }]
    ]);
    closeEvent();
}
