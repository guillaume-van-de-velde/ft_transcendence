import { link, userConnexionAccepted } from "../../../index.js";
import { renderVerify } from "../../pages/connexion/verify.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function verifyAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.code)
        return renderVerify();

    const API = await requestAPI(`${link}/api/verify`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "code": data.code.toString()
        }
    });

    if (API)
        return userConnexionAccepted(API);

    renderVerify();
}