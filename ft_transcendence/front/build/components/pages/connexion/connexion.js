import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
export function renderConnexion() {
    const connexionPage = {
        content: page.connexion.connexion,
        level: 1,
        create: connexion,
    };
    render(connexionPage);
}
export function connexion() {
}
