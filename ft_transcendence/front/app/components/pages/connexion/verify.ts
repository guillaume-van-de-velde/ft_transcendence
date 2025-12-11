import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { verifyAPI } from "../../api/connexion/verifyAPI.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderConnexion } from "./connexion.js";

export function renderVerify() {
    const verifyPage: PageInstance = {
        content: vues.connexion.verify,
        level: 0,
        create: verify
    }
    render(verifyPage);
}

export function verify() {
    const connexionBtn = document.getElementById("connexionBtn");
    const form = document.getElementById("formVerify");

    connexionBtn?.addEventListener("click", renderConnexion);
    form?.addEventListener("submit", verifyAPI);

    state.events = new Map<Element | null, TypeEvent>([
        [connexionBtn, { type: "click", callback: renderConnexion }],
        [form, { type: "submit", callback: verifyAPI }]
    ]);
}
