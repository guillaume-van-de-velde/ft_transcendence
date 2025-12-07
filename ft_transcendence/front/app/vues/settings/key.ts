export function keyHTML(): string {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                ${i18next.t("settings")}
            </h1>
        </div>
        <span class="text-3xl opacity-50 flex justify-center items-center tracking-widest">
            <p>${i18next.t("key")}</p>
        </span>
        <div class="h-1/3 flex flex-col justify-around items-center mt-20 text-5xl [&_h2]:cursor-pointer [&_h2]:hover:tracking-[10px] [&_h2]:duration-300">
            <div>
                <h2 id="player1">${i18next.t("player")} 1</h2>
            </div>
            <div>
                <h2 id="player2">${i18next.t("player")} 2</h2>
            </div>
        </div>
    `
}
