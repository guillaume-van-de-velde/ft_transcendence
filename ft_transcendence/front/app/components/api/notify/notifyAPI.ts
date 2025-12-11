import { state } from "../../../index.js";
import { Notify } from "../../core/state.js";

export function notifyAPI(element: HTMLElement | null) {
    if (!state.messages.notify || !state.messages.notify![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("noNotify")}`;
        element?.appendChild(p);
        return;
    }

    let notifyList = state.messages.notify;
    const blocked = state.profile.blocked;

    if (blocked && blocked[0])
        for (const user of blocked!)
            notifyList = notifyList.filter(notify => notify.user.id != user.id);

    if (!notifyList || !notifyList![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("noNotify")}`;
        element?.appendChild(p);
        return;
    }

    for (let i = notifyList!.length - 1; i >= 0; i--) {
        const notify = notifyList[i]!;
        const div = document.createElement("div");
        const type = notify.type === Notify.ASK ? "WANT TO BE YOUR FRIEND" : "WANTS TO FIGHT YOU";
        const classOptions = `userNotify${notify.id} flex w-7/10 justify-around items-center mx-auto`;

        div.className = classOptions;
        div.innerHTML = `
        <div class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black">
            <div class="h-[75px] w-[100px] flex justify-center items-center">
                <span data-id="${notify.user.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    <img class="w-full h-full rounded-full mx-auto" src="${notify.user.picture}">
                </span>
            </div>
            <div class="flex justify-center items-center">
                <p class="font-julee tracking-widest text-2xl">
                    ${notify.user.pseudo}
                </p>
            </div>
        </div>
        <h2 class="text-4xl w-[50%]">${type}</h2>
        <button class="accept text-2xl h-[60px] w-[60px] mr-2 bg-green-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
            <i class="fa-solid fa-check"></i>
        </button>
        <button class="decline text-2xl h-[60px] w-[60px] bg-red-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
            X
        </button>`;
        element?.appendChild(div);
    }
}