import { state } from "../../../index.js";
import { renderTournament } from "../../pages/mode/3/tournament.js";
import { requestAPI } from "../../utils/requestApi.js";

export function quitTournamentCallAPI() {
    requestAPI(`${state.link}/api/mode/tournament/quit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tournament: state.tournament!.id
        })
    });
    delete state.tournament;
    renderTournament();
}