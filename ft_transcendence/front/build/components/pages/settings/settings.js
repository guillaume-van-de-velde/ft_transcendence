import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { renderAccount } from "./account.js";
import { renderKey } from "./key.js";
import { renderLanguage } from "./language.js";
import { renderVolume } from "./volume.js";
export function renderSettings() {
    const settingsPage = {
        content: page.settings.settings,
        level: 1,
        create: settings,
    };
    render(settingsPage);
}
export function settings() {
    const settings = document.getElementById("settingsAction");
    const volume = document.getElementById("volume");
    const key = document.getElementById("key");
    const account = document.getElementById("account");
    const language = document.getElementById("language");
    settings?.addEventListener("click", renderSettings);
    volume?.addEventListener("click", renderVolume);
    key?.addEventListener("click", renderKey);
    account?.addEventListener("click", renderAccount);
    language?.addEventListener("click", renderLanguage);
    state.events = new Map([
        [settings, { type: "click", callback: renderSettings }],
        [volume, { type: "click", callback: renderVolume }],
        [key, { type: "click", callback: renderKey }],
        [account, { type: "click", callback: renderAccount }],
        [language, { type: "click", callback: renderLanguage }],
    ]);
    closeEvent();
}
