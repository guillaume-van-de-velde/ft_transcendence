import { state } from "../../../index.js";

export function fillPlayerTournament() {
    for (const [index, player] of state.tournament!.users.entries()) {
        const level = player.level;
        const img = document.createElement("img");
        img.className = "player w-full h-full rounded-full mx-auto";
        img.dataset.id = `${player.user.id}`;
        img.src = player.user.picture;
        if (level === 3) {
            const winner = document.querySelector(".winner");
            winner?.classList.add("hover:opacity-50");
            winner?.classList.add("cursor-pointer");
            winner?.appendChild(img.cloneNode(true) as HTMLImageElement);
        }
        if (level >= 2) {
            const final = document.getElementById(`final${index + 1 > 4 ? "2" : "1"}`);
            final?.classList.add("hover:opacity-50");
            final?.classList.add("cursor-pointer");
            final?.appendChild(img.cloneNode(true) as HTMLImageElement);
        }
        if (level >= 1) {
            const demi = document.getElementById(`demi${index + 1 > 4 ? (index + 1 > 6 ? "4" : "3") : (index + 1 > 2 ? "2" : "1")}`);
            demi?.classList.add("hover:opacity-50");
            demi?.classList.add("cursor-pointer");
            demi?.appendChild(img.cloneNode(true) as HTMLImageElement);
        }
        const quart = document.getElementById(`quart${index + 1}`);
        quart?.classList.add("hover:opacity-50");
        quart?.classList.add("cursor-pointer");
        quart?.appendChild(img);
    }
}