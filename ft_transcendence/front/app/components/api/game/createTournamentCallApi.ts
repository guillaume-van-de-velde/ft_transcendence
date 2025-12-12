import { state } from "../../../index.js";
import { StatusTournament } from "../../core/state.js";
import { renderCreateTournament } from "../../pages/mode/3/tournament/create.js";
import { renderResultsTournament } from "../../pages/mode/3/tournament/results.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function createTournamentCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.inputNameTournament && data.inputNameTournament != "") {
        const tournament = await requestAPI(`${state.link}/api/mode/tournament/open`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.inputNameTournament,
                mode: state.mode.join("").toUpperCase()
            })
        });
        state.tournament = {
            id: tournament.id,
            status: StatusTournament.WAIT,
            mode: state.mode,
            time: 60,
            round: 0,
            users: [{
                user: {
                    id: state.id,
                    picture: state.profile.picture,
                    pseudo: state.account.pseudo
                },
                level: 0
            }]
        }
        renderResultsTournament();
    }
    else
        renderCreateTournament();
}