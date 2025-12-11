import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { signInAPI } from "../../api/connexion/signInAPI.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderConnexion } from "./connexion.js";

export function renderSignIn() {
    const signInPage: PageInstance = {
        content: vues.connexion.signin,
        level: 0,
        create: signIn
    }
    render(signInPage);
}

export function signIn() {
    const connexionBtn = document.getElementById("connexionBtn");
    const form = document.getElementById("formSignIn");

    connexionBtn?.addEventListener("click", renderConnexion);
    form?.addEventListener("submit", signInAPI);

    state.events = new Map<Element | null, TypeEvent>([
        [connexionBtn, { type: "click", callback: renderConnexion }],
        [form, { type: "submit", callback: signInAPI }]
    ]);
}
