import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { languageAddBorder, languageBorder, languageCallAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderSettings } from "./settings.js";

export function renderLanguage() {
    const languagePage: PageInstance = {
        content: vues.settings.language,
        level: 1,
        create: language
    }
    render(languagePage);
}

export function language() {
    const eng = document.getElementById("ENG");
    const fra = document.getElementById("FRA");
    const esp = document.getElementById("ESP");
    const rus = document.getElementById("RUS");
    const valid = document.getElementById("validLanguage");
    const settings = document.getElementById("settingsAction");

    languageAddBorder(state.language);

    eng?.addEventListener("click", languageBorder);
    fra?.addEventListener("click", languageBorder);
    esp?.addEventListener("click", languageBorder);
    rus?.addEventListener("click", languageBorder);
    valid?.addEventListener("click", languageCallAPI);
    settings?.addEventListener("click", renderSettings);

    state.events = new Map<Element | null, TypeEvent>([
        [eng, {type: "click", callback: languageBorder}],
        [fra, {type: "click", callback: languageBorder}],
        [esp, {type: "click", callback: languageBorder}],
        [rus, {type: "click", callback: languageBorder}],
        [valid, {type: "click", callback: languageCallAPI}],
        [settings, {type: "click", callback: renderSettings}]
    ]);
    closeEvent();
}