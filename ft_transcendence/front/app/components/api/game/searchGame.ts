import { link, state } from "../../../index.js";
import { renderGame } from "../../pages/game/game.js";
import { renderInSearch } from "../../pages/game/inSearch.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function searchGame() {
    if (state.mode[1] == "l" || state.mode[1] == "a") {
        renderGame();
        return;
    }
    requestAPI(`${link}/api/game/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                id: state.id,
                pseudo: state.account.pseudo,
                picture: state.profile.picture
            },
            mode: state.mode.join("").toUpperCase(),
            tournament: (state.tournament && state.tournament.id) ? state.tournament.id : 0
        })
    });
    renderInSearch();
}