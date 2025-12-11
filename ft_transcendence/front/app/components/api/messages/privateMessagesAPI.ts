import { state } from "../../../index.js";

export function privateMessagesAPI(element: HTMLElement | null) {
    if (!state.messages.private![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("noFriends")}`;
        element?.appendChild(p);
        return;
    }

    for (const [index, friend] of state.messages.private!.entries()) {
        const btn = document.createElement("button");
        const focus = index == state.friend ? "bg-form-bg" : "bg-player-display-bg";
        const seen = friend.seen ? "" : "<span class=\"h-[20px] w-[20px] bg-red-600 absolute translate-x-1/2 right-5 rounded-full\"></span>"
        const classOptions = `friend${index} friendMessage ${focus} relative flex justify-left items-center h-[75px] w-[300px] rounded-2xl border-3 border-black cursor-pointer box-border mb-0`;

        btn.className = classOptions;
        btn.innerHTML = `
            <div class="h-[75px] w-[100px] flex justify-center items-center">
                <span data-id="${friend.user.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    <img class="w-full h-full rounded-full mx-auto" src="${friend.user.picture}">
                </span>
            </div>
            <div class="flex justify-center items-center">
                <p class="font-julee tracking-widest text-2xl">
                    ${friend.user.pseudo}
                </p>
            </div>
            ${seen}
        `;
        element?.appendChild(btn);
    }
}
