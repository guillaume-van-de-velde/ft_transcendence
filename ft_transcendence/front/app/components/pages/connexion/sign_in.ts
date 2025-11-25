import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { signInAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderConnexion } from "./connexion.js";

export function renderSignIn() {
    const signInPage: PageInstance = {
        content: page.connexion.signin,
        level: 0,
        create: signIn,
    }
    render(signInPage);
}

export function signIn() {
    const connexionBtn = document.getElementById("connexionBtn");
    const form = document.getElementById("formSignIn");

    connexionBtn?.addEventListener("click", renderConnexion);
    form?.addEventListener("submit", signInAPI);

    state.events = new Map<Element | null, TypeEvent>([
        [connexionBtn, {type: "click", callback: renderConnexion}],
        [form, {type: "submit", callback: signInAPI}]
    ]);
}
