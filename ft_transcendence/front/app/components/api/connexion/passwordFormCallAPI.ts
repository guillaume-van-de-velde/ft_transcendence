import { setToken, state } from "../../../index.js";
import { renderPassword } from "../../pages/settings/account/password.js";
import { passwordValid } from "../../utils/formValidity.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function passwordFormCallAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.newpassword != "" && data.newpassword === data.confirm && passwordValid(data.newpassword!.toString())) {
        const newToken = await requestAPI(`${state.link}/api/settings/account/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                oldpassword: data.yourpassword,
                newpassword: data.newpassword
            })
        });
        if (newToken.token)
            setToken(newToken.token);
    }
    renderPassword();
}