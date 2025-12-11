import { link, removeToken } from "../../../index.js";
import { renderVerify } from "../../pages/connexion/verify.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function verifyDeleteFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.code)
        return renderVerify();
    const response = await requestAPI(`${link}/api/settings/delete/verify`, {
        method: "DELETE",
        headers: {
            "code": data.code.toString()
        }
    });
    if (response.delete) {
        removeToken();
        console.log("delete account - rechargement de la page");
        window.location.reload();
        return;
    }
    renderVerify();
}
