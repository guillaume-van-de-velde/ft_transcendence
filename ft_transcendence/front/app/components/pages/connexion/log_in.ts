import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { PageInstance } from "../../utils/interfaces.js";

export function renderLogIn() {
    const logInPage: PageInstance = {
        content: page.connexion.login,
        level: 1,
        create: logIn,
    }
    render(logInPage);
}

export function logIn() {

}
