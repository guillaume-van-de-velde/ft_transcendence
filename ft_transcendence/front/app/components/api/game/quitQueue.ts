import { link, state } from "../../../index.js";
import { renderHome } from "../../pages/home.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function quitQueue() {
    requestAPI(`${link}/api/game/quit`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tournament: state.tournament?.id ? state.tournament.id : 0
        })
    });
    renderHome();
}
