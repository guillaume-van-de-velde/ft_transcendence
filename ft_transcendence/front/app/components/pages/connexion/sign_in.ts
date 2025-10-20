import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { PageInstance } from "../../utils/interfaces.js";

export function renderSignIn() {
    const signInPage: PageInstance = {
        content: page.connexion.signin,
        level: 1,
        create: signIn,
    }
    render(signInPage);
}

export function signIn() {

}
