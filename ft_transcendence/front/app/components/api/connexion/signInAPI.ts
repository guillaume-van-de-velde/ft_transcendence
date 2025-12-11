import { link, state } from "../../../index.js";
import { renderSignIn } from "../../pages/connexion/signIn.js";
import { renderVerify } from "../../pages/connexion/verify.js";
import { emailValid, passwordValid, pseudoValid } from "../../utils/formValidity.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function signInAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
        [...formData.entries()].map(([key, value]) => [key, String(value)])
    );

    if (!data.email || !data.password || !data.confirm || !data.pseudo)
        return renderSignIn();

    let { email, password, confirm, pseudo } = data;

    if (!emailValid(email) || !passwordValid(password) || password !== confirm || !pseudoValid(pseudo)) {
        return renderSignIn();
    }

    const response = await requestAPI(`${link}/api/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            pseudo: pseudo,
            language: state.language
        })
    });

    if (response && response.flag == "ok")
        return renderVerify();
    renderSignIn();
}
