import { state } from "../../../../../index.js";
import { vues } from "../../../../../vues/vues.js";
import { render } from "../../../../core/render.js";
import { StatusTournament } from "../../../../core/state.js";
import { fillPlayerTournament } from "../../../../utils/api.js";
import { chooseModeFunctionRender, closeEvent, renderPlayer } from "../../../../utils/globalEvents.js";
import { PageInstance } from "../../../../utils/interfaces.js";
import { renderQuitTournament } from "./quit.js";

export function renderResultsTournament() {
    const resultsPage: PageInstance = {
        content: vues.mode[2]!.tournament!.action.results,
        level: 1,
        create: resultsTournament
    }
    render(resultsPage);
}

export function resultsTournament() {
    const mode1 = document.getElementById("mode1");
    const mode2 = document.getElementById("mode2");
    const mode3 = document.getElementById("mode3");
    const quit = document.getElementById("quit");
    
    state.actual = "tournament";

    console.log(state.tournament);

    fillPlayerTournament();
    setStatusTournament();

    chooseModeFunctionRender(mode1!, mode2!, mode3!);

    quit?.addEventListener("click", renderQuitTournament);

    state.events.set(quit, {type: "click", callback: renderQuitTournament});

    renderPlayer();
    closeEvent();
}

function setStatusTournament() {
    const statusTournament = document.getElementById("statusTournament");

    switch (state.tournament!.status) {
        case "WAIT": {
            statusTournament!.textContent = "WAIT FOR PLAYERS";
            break ;
        }
        case "START": {
            const interval = setInterval(printTimer, 1000);
            state.interval = interval;
            function printTimer() {
                const statusTournament = document.getElementById("statusTournament");
                if (state.roundTournament != state.tournament!.round) {
                    console.log("en boucle dans timer", state.roundTournament, state.tournament!.round);
                    clearInterval(interval);
                    state.roundTournament++;
                    if (state.tournament!.round >= 3)
                        state.tournament!.status = StatusTournament.FINISHED;
                    renderResultsTournament();
                    return ;
                }
                else if (state.tournament!.time == 0) {
                    clearInterval(interval);
                    statusTournament!.textContent = `0:0`;
                }
                else
                    statusTournament!.textContent = `${Math.floor(state.tournament!.time / 60)}:${state.tournament!.time % 60}`;
            }
            break ;
        }
        case "FINISHED": {
            statusTournament!.textContent = "TOURNAMENT FINISHED";
            break ;
        }
        default: 
            break ;
    }
}