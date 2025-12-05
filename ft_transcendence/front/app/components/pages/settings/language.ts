import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { languageAddBorder, languageCallAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderSettings } from "./settings.js";

export function renderLanguage() {
    const languagePage: PageInstance = {
        content: vues.settings.language,
        level: 1,
        create: language,
    }
    render(languagePage);
}

export function language() {
    const settings = document.getElementById("settingsAction");
    const eng = document.getElementById("ENG");
    const fra = document.getElementById("FRA");
    const esp = document.getElementById("ESP");
    const rus = document.getElementById("RUS");

    languageAddBorder();

    eng?.addEventListener("click", languageCallAPI);
    fra?.addEventListener("click", languageCallAPI);
    esp?.addEventListener("click", languageCallAPI);
    rus?.addEventListener("click", languageCallAPI);
    settings?.addEventListener("click", renderSettings);

    state.events = new Map<Element | null, TypeEvent>([
        [eng, {type: "click", callback: languageCallAPI}],
        [fra, {type: "click", callback: languageCallAPI}],
        [esp, {type: "click", callback: languageCallAPI}],
        [rus, {type: "click", callback: languageCallAPI}],
        [settings, {type: "click", callback: renderSettings}]
    ]);
    closeEvent();
}