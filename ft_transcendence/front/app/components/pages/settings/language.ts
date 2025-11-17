import { state } from "../../../index.js";
import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { languageAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderSettings } from "./settings.js";

export function renderLanguage() {
    const languagePage: PageInstance = {
        content: page.settings.language,
        level: 1,
        create: language,
    }
    render(languagePage);
}

export function language() {
    const settings = document.getElementById("settingsAction");

    languageAPI();

    settings?.addEventListener("click", renderSettings);

    state.events = new Map<Element | null, TypeEvent>([
        [settings, {type: "click", callback: renderSettings}]
    ]);
    closeEvent();
}
