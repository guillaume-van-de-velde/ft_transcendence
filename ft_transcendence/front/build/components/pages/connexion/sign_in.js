import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
export function renderSignIn() {
    const signInPage = {
        content: page.connexion.signin,
        level: 1,
        create: signIn,
    };
    render(signInPage);
}
export function signIn() {
}
