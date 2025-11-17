import { state } from "../../../../index.js";
import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { placeholderAPI, pseudoFormCallApi } from "../../../utils/api.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderAccount } from "../account.js";
import { renderSettings } from "../settings.js";

export function renderPseudo() {
    const pseudoPage: PageInstance = {
        content: page.settings.account.action.pseudo,
        level: 1,
        create: pseudo,
    }
    render(pseudoPage);
}

export function pseudo() {
    const settings = document.getElementById("settingsAction");
    const account = document.getElementById("account");
    const form = document.getElementById("pseudoForm");

    placeholderAPI("yourpseudo", state.account.pseudo);

    form?.addEventListener("submit", pseudoFormCallApi)
    settings?.addEventListener("click", renderSettings);
    account?.addEventListener("click", renderAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [form, {type: "submit", callback: pseudoFormCallApi}],
        [settings, {type: "click", callback: renderSettings}],
        [account, {type: "click", callback: renderAccount}]
    ]);
    closeEvent();
}
