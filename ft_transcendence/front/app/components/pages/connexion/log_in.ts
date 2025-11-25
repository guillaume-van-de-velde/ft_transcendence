import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { logInAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderConnexion } from "./connexion.js";

export function renderLogIn() {
    const logInPage: PageInstance = {
        content: page.connexion.login,
        level: 0,
        create: logIn,
    }
    render(logInPage);
}

export function logIn() {
    const connexionBtn = document.getElementById("connexionBtn");
    const form = document.getElementById("formLogIn");

    connexionBtn?.addEventListener("click", renderConnexion);
    form?.addEventListener("submit", logInAPI);

    state.events = new Map<Element | null, TypeEvent>([
        [connexionBtn, {type: "click", callback: renderConnexion}],
        [form, {type: "submit", callback: logInAPI}]
    ]);
}
