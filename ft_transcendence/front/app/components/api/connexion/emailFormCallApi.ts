import { state } from "../../../index.js";
import { renderEmail } from "../../pages/settings/account/email.js";
import { renderVerifyEmail } from "../../pages/settings/account/verify.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function emailFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.newemail === data.confirm) {
        const response = await requestAPI(`${state.link}/api/settings/account/email`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                oldemail: state.account.email,
                email: data.newemail
            })
        });
        if (response && response.flag)
            return renderVerifyEmail();
    }
    renderEmail();
}