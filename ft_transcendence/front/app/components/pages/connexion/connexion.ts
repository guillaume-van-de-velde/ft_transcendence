import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { PageInstance } from "../../utils/interfaces.js";

export function renderConnexion() {
    const connexionPage: PageInstance = {
        content: page.connexion.connexion,
        level: 1,
        create: connexion,
    }
    render(connexionPage);
}

export function connexion() {

}
