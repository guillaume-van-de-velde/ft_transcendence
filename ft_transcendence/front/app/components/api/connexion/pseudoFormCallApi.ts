import { state } from "../../../index.js";
import { renderPseudo } from "../../pages/settings/account/pseudo.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function pseudoFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.newpseudo === data.confirm) {
        requestAPI(`${state.link}/api/settings/account/pseudo`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pseudo: data.newpseudo
            })
        });
        state.account.pseudo = data.newpseudo!.toString();
    }
    renderPseudo();
}