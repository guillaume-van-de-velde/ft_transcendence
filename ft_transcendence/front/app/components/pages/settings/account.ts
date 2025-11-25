import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderDeleteAccount } from "./account/delete.js";
import { renderEmail } from "./account/email.js";
import { renderPassword } from "./account/password.js";
import { renderPseudo } from "./account/pseudo.js";
import { renderSettings } from "./settings.js";

export function renderAccount() {
    const accountPage: PageInstance = {
        content: page.settings.account.account,
        level: 1,
        create: account,
    }
    render(accountPage);
}

export function account() {
    const settings = document.getElementById("settingsAction");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const pseudo = document.getElementById("pseudo");
    const deleteAccount = document.getElementById("delete");

    settings?.addEventListener("click", renderSettings);
    email?.addEventListener("click", renderEmail);
    password?.addEventListener("click", renderPassword);
    pseudo?.addEventListener("click", renderPseudo);
    deleteAccount?.addEventListener("click", renderDeleteAccount);

    state.events = new Map<Element | null, TypeEvent>([
        [settings, {type: "click", callback: renderSettings}],
        [email, {type: "click", callback: renderEmail}],
        [password, {type: "click", callback: renderPassword}],
        [pseudo, {type: "click", callback: renderPseudo}],
        [deleteAccount, {type: "click", callback: renderDeleteAccount}]
    ]);
    closeEvent();
}
