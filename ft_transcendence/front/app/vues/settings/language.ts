export function languageHTML(): string {
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
            <p>${i18next.t("language")}</p>
        </span>
        <div class="w-full h-1/2 flex justify-center items-center">
            <div class="w-[80%] h-1/2 grid grid-cols-[1fr_1fr_1fr_1fr] justify-center items-center">
                <button id="ENG" class="bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/langfr-250px-Flag_of_the_United_Kingdom_%283-5%29.svg.png')] bg-center bg-cover w-[150px] h-[150px] mx-auto rounded-full duration-300 text-4xl cursor-pointer"></button>
                <button id="FRA" class="bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-250px-Flag_of_France.svg.png')] bg-center bg-cover w-[150px] h-[150px] mx-auto rounded-full duration-300 text-4xl cursor-pointer"></button>
                <button id="ESP" class="bg-[url('https://img.freepik.com/vecteurs-premium/illustration-vectorielle-du-drapeau-espagne_109161-7904.jpg?semt=ais_hybrid&w=740&q=80')] bg-center bg-cover w-[150px] h-[150px] mx-auto rounded-full duration-300 text-4xl cursor-pointer"></button>
                <button id="RUS" class="bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg')] bg-center bg-cover w-[150px] h-[150px] mx-auto rounded-full duration-300 text-4xl cursor-pointer"></button>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <button id="validLanguage" type="submit" class="h-[75px] w-[75px] rounded-full bg-button-white-bg text-black text-3xl hover:h-[80px] hover:w-[80px] duration-300 cursor-pointer">
                <i class="fa-solid fa-check"></i>
            </button>
        </div>
    `
}
