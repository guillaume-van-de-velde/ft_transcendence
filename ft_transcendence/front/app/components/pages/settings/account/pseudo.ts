import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { state, TypeEvent } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
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

    settings?.addEventListener("click", renderSettings);
    account?.addEventListener("click", renderAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [settings, {type: "click", callback: renderSettings}],
        [account, {type: "click", callback: renderAccount}]
    ]);
    closeEvent();
}
