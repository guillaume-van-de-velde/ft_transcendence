import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { verifyFormCallApi, placeholderAPI } from "../../../utils/api.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderAccount } from "../account.js";
import { renderSettings } from "../settings.js";

export function renderVerifyEmail() {
    const verifyEmailPage: PageInstance = {
        content: vues.settings.account.action.verify,
        level: 1,
        create: verifyEmail,
    }
    render(verifyEmailPage);
}

export function verifyEmail() {
    const settings = document.getElementById("settingsAction");
    const account = document.getElementById("account");
    const form = document.getElementById("verifyForm");

    form?.addEventListener("submit", verifyFormCallApi);
    settings?.addEventListener("click", renderSettings);
    account?.addEventListener("click", renderAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [form, {type: "submit", callback: verifyFormCallApi}],
        [settings, {type: "click", callback: renderSettings}],
        [account, {type: "click", callback: renderAccount}]
    ]);
    closeEvent();
}
