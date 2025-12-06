export function tournament_HTML(): string {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <div class="flex justify-center items-center
            [&_button]:cursor-pointer
            h-1/5">
            <button id="mode1" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3"></p>
            </button>
            <button id="mode2" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3"></p>
            </button>
            <button id="mode3" class="flex justify-center items-center border-white w-[18%] border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3"></p>
            </button>
        </div>
        <div class="flex flex-col items-center justify-between h-1/2 mt-30">
            <h2 class="text-center text-4xl leading-14">
                ${i18next.t("mtournament")}
            </h2>
            <div class="flex justify-around items-center w-1/2">
                <button id="create" class="bg-button-white-bg text-black font-dangrek tracking-widest text-3xl rounded-full h-[70px] w-[250px] hover:scale-110 cursor-pointer duration-300">
                    ${i18next.t("create")}
                </button>
                <button id="join" class="bg-button-white-bg text-black font-dangrek tracking-widest text-3xl rounded-full h-[70px] w-[250px] hover:scale-110 cursor-pointer duration-300">
                    ${i18next.t("join")}
                </button>
            </div>
            <button id="match" class="bg-button-white-bg text-black font-dangrek tracking-widest text-3xl rounded-full h-[100px] w-[500px] hover:scale-110 cursor-pointer duration-300">
                ${i18next.t("goMatch")}
            </button>
        </div>
    `
}
