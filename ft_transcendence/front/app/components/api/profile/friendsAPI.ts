import { state } from "../../../index.js";

export function friendsAPI(element: HTMLElement | null) {

    if (!state.profile.friends![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("noFriends")}`;
        element?.appendChild(p);
        return;
    }

    for (const friend of state.profile.friends!) {
        const div = document.createElement("div");
        const classOptions = `basis-1/3 bg-player-display-bg flex justify-left items-center h-[75px] w-[300px] rounded-2xl border-3 border-black`;

        div.className = classOptions;
        div.innerHTML = `
            <div class="h-[75px] w-[100px] flex justify-center items-center">
                <span data-id="${friend.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    <img class="w-full h-full rounded-full mx-auto" src="${friend.picture}">
                </span>
            </div>
            <div class="flex justify-center items-center">
                <p class="font-julee tracking-widest text-2xl">
                    ${friend.pseudo}
                </p>
            </div>
        `;
        element?.appendChild(div);
    }

}