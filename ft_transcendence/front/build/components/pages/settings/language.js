import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { renderSettings } from "./settings.js";
export function renderLanguage() {
    const languagePage = {
        content: page.settings.language,
        level: 1,
        create: language,
    };
    render(languagePage);
}
export function language() {
    const settings = document.getElementById("settingsAction");
    settings?.addEventListener("click", renderSettings);
    state.events = new Map([
        [settings, { type: "click", callback: renderSettings }]
    ]);
    closeEvent();
}
