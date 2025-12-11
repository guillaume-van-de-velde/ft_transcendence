import { link, state } from "../../../index.js";
import { setVues } from "../../../vues/vues.js";
import { renderHome } from "../../pages/home.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function languageCallAPI() {
    state.language = document.querySelector(".selected")!.id;
    await requestAPI(`${link}/api/settings/language`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: state.language
        })
    });
    await i18next.changeLanguage(state.language);
    setVues();
    renderHome();
}
