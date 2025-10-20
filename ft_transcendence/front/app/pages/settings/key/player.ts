export function player_HTML(): string {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                SETTINGS
            </h1>
        </div>
        <span class="text-3xl flex justify-center items-center tracking-widest">
            <p>
                <p id="key" class="opacity-100 cursor-pointer hover:tracking-[5px] duration-300">KEY</p><p id="idPlayer" class="whitespace-pre opacity-50"> > PLAYER 2</p>
            </p>
        </span>
        <div class="flex flex-col justify-around items-center h-1/2 [&_h2]:text-5xl mt-10">
            <div class="flex justify-around items-center w-[60%] h-1/2">
                <div class="w-1/2 h-full flex justify-center items-center">
                    <h2 class="opacity-50">
                        UP
                    </h2>
                </div>
                <div class="w-1/2 h-full flex justify-center items-center">
                    <button id="keyName1" class="h-[75px] w-[75px] bg-button-white-bg text-black rounded-full hover:h-[90px] hover:w-[90px] duration-300 cursor-pointer text-5xl">
                    </button>
                </div>
            </div>
            <div class="flex justify-around items-center w-[60%] h-1/2">
                <div class="w-1/2 h-full flex justify-center items-center">
                    <h2 class="opacity-50">
                        DOWN
                    </h2>
                </div>
                <div class="w-1/2 h-full flex justify-center items-center">
                    <button id="keyName2" class="h-[75px] w-[75px] bg-button-white-bg text-black rounded-full hover:h-[90px] hover:w-[90px] duration-300 cursor-pointer text-5xl">
                    </button>
                </div>
            </div>
        </div>
    `
}
