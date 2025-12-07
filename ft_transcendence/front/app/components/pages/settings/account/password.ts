import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { passwordFormCallAPI } from "../../../utils/api.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderAccount } from "../account.js";
import { renderSettings } from "../settings.js";

export function renderPassword() {
    const passwordPage: PageInstance = {
        content: vues.settings.account.action.password,
        level: 1,
        create: password
    }
    render(passwordPage);
}

export function password() {
    const settings = document.getElementById("settingsAction");
    const account = document.getElementById("account");
    const form = document.getElementById("passwordForm");

    form?.addEventListener("submit", passwordFormCallAPI);
    settings?.addEventListener("click", renderSettings);
    account?.addEventListener("click", renderAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [form, {type: "click", callback: passwordFormCallAPI}],
        [settings, {type: "click", callback: renderSettings}],
        [account, {type: "click", callback: renderAccount}]
    ]);
    closeEvent();
}
