import { link, state } from "../../../index.js";
import { renderVerify } from "../../pages/connexion/verify.js";
import { renderEmail } from "../../pages/settings/account/email.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function verifyFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.code)
        return renderVerify();

    const response = await requestAPI(`${link}/api/settings/account/verify`, {
        method: "PUT",
        headers: {
            "code": data.code.toString()
        }
    });
    if (response.email) {
        state.account.email = response.email.toString();
        renderEmail();
        return;
    }

    renderVerify();
}