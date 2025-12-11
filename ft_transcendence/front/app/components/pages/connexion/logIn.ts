import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { logInAPI } from "../../api/connexion/logInAPI.js";
import { forgotCallAPI } from "../../api/connexion/forgotCallAPI.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderConnexion } from "./connexion.js";

export function renderLogIn() {
    const logInPage: PageInstance = {
        content: vues.connexion.login,
        level: 0,
        create: logIn
    }
    render(logInPage);
}

export function logIn() {
    const connexionBtn = document.getElementById("connexionBtn");
    const form = document.getElementById("formLogIn");
    const forgot = document.getElementById("forgotBtn");

    connexionBtn?.addEventListener("click", renderConnexion);
    form?.addEventListener("submit", logInAPI);
    forgot?.addEventListener("click", forgotCallAPI);

    state.events = new Map<Element | null, TypeEvent>([
        [connexionBtn, { type: "click", callback: renderConnexion }],
        [form, { type: "submit", callback: logInAPI }]
    ]);
}
