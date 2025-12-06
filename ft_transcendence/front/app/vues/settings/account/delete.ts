export function delete_HTML(): string {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                ${i18next.t("settings")}
            </h1>
        </div>
        <span class="text-3xl flex justify-center items-center tracking-widest">
            <p>
                <p id="account" class="opacity-100 cursor-pointer hover:tracking-[5px] duration-300">${i18next.t("account")}</p><p class="whitespace-pre opacity-50"> > ${i18next.t("delete")}</p>
            </p>
        </span>
        <div class="h-2/5 flex flex-col justify-around items-center mt-30">
            <div class="h-1/2">
                <h2 class="opacity-50 text-6xl">
                ${i18next.t("sure")}
                </h2>
            </div>
            <div class="flex justify-around w-[60%] h-1/2">
                <div class="w-1/2 flex justify-center">
                    <button id="yesDelete" class="h-[100px] w-[100px] bg-button-white-bg text-black rounded-full text-4xl hover:tracking-[10px] hover:h-[120px] hover:w-[120px] duration-300 cursor-pointer">
                        ${i18next.t("yes")}
                    </button>
                </div>
                <div class="w-1/2 flex justify-center">
                    <button id="noDelete" class="h-[100px] w-[100px] bg-button-white-bg text-black rounded-full text-4xl hover:tracking-[10px] hover:h-[120px] hover:w-[120px] duration-300 cursor-pointer">
                        ${i18next.t("no")}
                    </button>
                </div>
            </div>
        </div>
    `
}
