import { state } from "../../../index.js";
import { renderJoinTournament } from "../../pages/mode/3/tournament/join.js";
import { renderResultsTournament } from "../../pages/mode/3/tournament/results.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function joinTournamentCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.inputNameTournament && data.inputNameTournament != "") {
        const tournament = await requestAPI(`${state.link}/api/mode/tournament/join`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.inputNameTournament
            })
        });
        if (tournament) {
            state.tournament = {
                id: tournament.id,
                status: tournament.status,
                mode: tournament.mode.toLowerCase().split(""),
                round: 0,
                time: 60,
                users: tournament.users
            }
            renderResultsTournament();
        }
        else
            renderJoinTournament();
    }
    else
        renderJoinTournament();
}