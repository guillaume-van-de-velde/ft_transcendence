import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { TypeEvent } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { deleteAccountCallAPI, placeholderAPI } from "../../../utils/api.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderAccount } from "../account.js";
import { renderSettings } from "../settings.js";

export function renderDeleteAccount() {
    const deletePage: PageInstance = {
        content: vues.settings.account.action.delete,
        level: 1,
        create: deleteAccount,
    }
    render(deletePage);
}

export function deleteAccount() {
    const settings = document.getElementById("settingsAction");
    const account = document.getElementById("account");
    const yesDelete = document.getElementById("yesDelete");
    const noDelete = document.getElementById("noDelete");

    noDelete?.addEventListener("click", renderAccount);
    yesDelete?.addEventListener("click", deleteAccountCallAPI);
    settings?.addEventListener("click", renderSettings);
    account?.addEventListener("click", renderAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [yesDelete, {type: "click", callback: deleteAccountCallAPI}],
        [noDelete, {type: "click", callback: renderAccount}],
        [settings, {type: "click", callback: renderSettings}],
        [account, {type: "click", callback: renderAccount}]
    ]);
    closeEvent();
}
