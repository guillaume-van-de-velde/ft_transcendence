import { state } from "../../../index.js";
import { renderPlayer } from "../../utils/globalEvents.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function searchFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    let player = null;

    if (data.pseudoPlayerSearch && data.pseudoPlayerSearch != "") {
        player = await requestAPI(`${state.link}/api/profile/search`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "pseudo": data.pseudoPlayerSearch.toString()
            }
        });
    } else {
        const element = document.getElementById("searchResult");
        element!.innerHTML = '';
        return;
    }

    const element = document.getElementById("searchResult");
    if (player) {
        const playerElement = document.createElement("div");
        const classOptions = "bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black";

        playerElement.className = classOptions;
        playerElement.innerHTML = `
        <div class="h-[75px] w-[100px] flex justify-center items-center">
            <span data-id="${player.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                <img class="w-full h-full rounded-full mx-auto" src="${player.picture}">
            </span>
        </div>
        <div class="flex justify-center items-center">
            <p class="font-julee tracking-widest text-2xl">
                ${player.pseudo}
            </p>
        </div>`;
        element!.innerHTML = '';
        element!.appendChild(playerElement);
        renderPlayer();
    }
    else {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("noPlayer")}`;
        element!.innerHTML = '';
        element?.appendChild(p);
    }
}