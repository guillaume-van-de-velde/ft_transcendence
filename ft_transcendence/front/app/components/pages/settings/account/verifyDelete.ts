import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { verifyFormCallApi, placeholderAPI, verifyDeleteFormCallApi } from "../../../utils/api.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderAccount } from "../account.js";
import { renderSettings } from "../settings.js";

export function renderVerifyDelete() {
    const verifyDeletePage: PageInstance = {
        content: vues.settings.account.action.verify,
        level: 1,
        create: verifyDelete,
    }
    render(verifyDeletePage);
}

export function verifyDelete() {
    const settings = document.getElementById("settingsAction");
    const account = document.getElementById("account");
    const form = document.getElementById("verifyForm");

    form?.addEventListener("submit", verifyDeleteFormCallApi);
    settings?.addEventListener("click", renderSettings);
    account?.addEventListener("click", renderAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [form, {type: "submit", callback: verifyDeleteFormCallApi}],
        [settings, {type: "click", callback: renderSettings}],
        [account, {type: "click", callback: renderAccount}]
    ]);
    closeEvent();
}
