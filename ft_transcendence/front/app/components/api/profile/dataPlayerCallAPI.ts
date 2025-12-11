import { link, state } from "../../../index.js";
import { renderStatsUser } from "../../pages/profile/statsUser.js";
import { playerLink } from "../../utils/link.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function dataPlayerCallAPI(e: Event) {
    let playerData;

    if (!(state.playerData && state.playerData!.user.id)) {
        let idPlayer = (e.target as HTMLElement).dataset.id;
        if (!idPlayer)
            idPlayer = (e.target as HTMLElement).parentElement!.dataset.id;
        if (idPlayer == state.id.toString())
            return renderStatsUser();
        playerData = await requestAPI(`${link}/api/player`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "idasked": idPlayer!
            }
        });
        state.playerData = playerData;
    } else
        playerData = state.playerData;
    const picturePlayer = document.getElementById("picturePlayer");
    const pseudoPlayer = document.getElementById("pseudoPlayer");
    const resultPlayed = document.getElementById("resultPlayed");
    const resultRatio = document.getElementById("resultRatio");
    const resultTournaments = document.getElementById("resultTournaments");
    const resultWinTournaments = document.getElementById("resultWinTournaments");

    if (playerData.online) {
        const span = document.createElement("span");
        span.classList = "h-3 w-3 absolute bg-green-400 rounded-full right-2 top-2";
        picturePlayer?.classList.add("relative");
        picturePlayer!.appendChild(span);
    }
    const img = document.createElement("img");
    img.className = "w-full h-full rounded-full mx-auto";
    img.src = playerData.user.picture;
    picturePlayer!.appendChild(img);
    pseudoPlayer!.textContent = `${playerData.user.pseudo}`;
    resultPlayed!.textContent = `${playerData.stats.played}`;
    resultRatio!.textContent = `${playerData.stats.ratio}`;
    resultTournaments!.textContent = `${playerData.stats.tournaments}`;
    resultWinTournaments!.textContent = `${playerData.stats.winsTournaments}`;
    playerLink();
}