import { state } from "../../../index.js";

export function historyAPI(element: HTMLElement | null) {

    if (!state.profile.history![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl";
        p.textContent = `${i18next.t("noHistory")}`;
        element?.appendChild(p);
        return;
    }

    for (const match of state.profile.history!) {
        const div = document.createElement("div");
        const colorBg = match.userPoints > match.ennemyPoints ? "bg-green-700" : match.userPoints < match.ennemyPoints ? "bg-red-700" : "bg-gray-500";
        const classOptions = `grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full ${colorBg} py-2 px-8 rounded-full border-4 border-black`;

        div.className = classOptions;
        div.innerHTML = `
            <div class="score flex justify-center items-center">
                <p>${match.userPoints} - ${match.ennemyPoints}</p>
            </div>
            <div class="ennemy flex justify-center items-center">
                <div class="flex justify-between items-center w-4/5">
                    <div class="">
                        <button data-id="${match.ennemy.id}" class="player cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                            <img class="w-full h-full rounded-full mx-auto" src="${match.ennemy.picture}">
                        </button>
                    </div>
                    <h1 class="tracking-widest">
                        ${match.ennemy.pseudo}
                    </h1>
                </div>
            </div>
            <div class="mode flex justify-center items-center">
                <p>${match.mode}</p>
            </div>
            <div class="date text-sm flex justify-center items-center">
                <p>${match.date} ${match.hour}</p>
            </div>
        `;
        element?.appendChild(div);
    }
}
