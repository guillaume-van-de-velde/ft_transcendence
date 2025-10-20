import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
export function renderLogIn() {
    const logInPage = {
        content: page.connexion.login,
        level: 1,
        create: logIn,
    };
    render(logInPage);
}
export function logIn() {
}
