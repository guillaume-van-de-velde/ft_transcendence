export function language_HTML(): string {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                SETTINGS
            </h1>
        </div>
        <span class="text-3xl opacity-50 flex justify-center items-center tracking-widest">
            <p>LANGUAGE</p>
        </span>
        <div class="w-full h-1/2 flex justify-center items-center">
            <div class="w-[80%] h-1/2 grid grid-cols-[1fr_1fr_1fr_1fr] justify-center items-center">
                <button class="bg-blue-800 w-[150px] h-[150px] mx-auto rounded-full hover:tracking-widest hover:w-[175px] hover:h-[175px] duration-300 text-4xl cursor-pointer">
                    ENG
                </button>
                <button class="bg-blue-300 w-[150px] h-[150px] mx-auto rounded-full hover:tracking-widest hover:w-[175px] hover:h-[175px] duration-300 text-4xl cursor-pointer">
                    FRA
                </button>
                <button class="bg-red-500 w-[150px] h-[150px] mx-auto rounded-full hover:tracking-widest hover:w-[175px] hover:h-[175px] duration-300 text-4xl cursor-pointer">
                    ESP
                </button>
                <button class="bg-purple-500 w-[150px] h-[150px] mx-auto rounded-full hover:tracking-widest hover:w-[175px] hover:h-[175px] duration-300 text-4xl cursor-pointer">
                    RUS
                </button>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <button type="submit" class="h-[75px] w-[75px] rounded-full bg-button-white-bg text-black text-3xl hover:h-[80px] hover:w-[80px] duration-300 cursor-pointer">
                <i class="fa-solid fa-check"></i>
            </button>
        </div>
    `
}
