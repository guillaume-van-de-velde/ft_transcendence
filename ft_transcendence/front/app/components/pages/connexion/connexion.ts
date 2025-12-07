import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderLogIn } from "./logIn.js";
import { renderSignIn } from "./signIn.js";

export function renderConnexion() {
    const connexionPage: PageInstance = {
        content: vues.connexion.connexion,
        level: 0,
        create: connexion
    }
    render(connexionPage);
}

export function connexion() {
    const logInBtn = document.getElementById("logInBtn");
    const signInBtn = document.getElementById("signInBtn");
    
    logInBtn?.addEventListener("click", renderLogIn);
    signInBtn?.addEventListener("click", renderSignIn);

    state.events = new Map<Element | null, TypeEvent>([
        [logInBtn, {type: "click", callback: renderLogIn}],
        [signInBtn, {type: "click", callback: renderSignIn}]
    ]);
}
