import { link } from "../../../index.js";
import { renderLogIn } from "../../pages/connexion/logIn.js";
import { renderVerify } from "../../pages/connexion/verify.js";
import { emailValid, passwordValid } from "../../utils/formValidity.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function logInAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
        [...formData.entries()].map(([key, value]) => [key, String(value)])
    );

    if (!data.email || !data.password)
        return renderLogIn();

    let { email, password } = data;

    if (!emailValid(email) || !passwordValid(password))
        return renderLogIn();

    const response = await requestAPI(`${link}/api/login`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "email": email,
            "password": password
        }
    });

    if (response && response.flag == "ok")
        return renderVerify();
    renderLogIn();
}