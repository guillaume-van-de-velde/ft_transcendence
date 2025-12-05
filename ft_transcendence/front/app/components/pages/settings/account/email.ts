import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { emailFormCallApi, placeholderAPI } from "../../../utils/api.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderAccount } from "../account.js";
import { renderSettings } from "../settings.js";

export function renderEmail() {
    const emailPage: PageInstance = {
        content: vues.settings.account.action.email,
        level: 1,
        create: email,
    }
    render(emailPage);
}

export function email() {
    const settings = document.getElementById("settingsAction");
    const account = document.getElementById("account");
    const form = document.getElementById("emailForm");

    placeholderAPI("youremail", state.account.email);

    form?.addEventListener("submit", emailFormCallApi);
    settings?.addEventListener("click", renderSettings);
    account?.addEventListener("click", renderAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [form, {type: "submit", callback: emailFormCallApi}],
        [settings, {type: "click", callback: renderSettings}],
        [account, {type: "click", callback: renderAccount}]
    ]);
    closeEvent();
}
