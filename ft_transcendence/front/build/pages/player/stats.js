export function stats_HTML() {
    return `
        <span id="close2" class="close">
            <p class="translate-y-0.5">X</p>
        </span>


        <div class="h-1/4 flex justify-around items-center w-6/10 mx-auto">
            <div class="flex justify-center items-center h-full w-1/2 gap-5">
                <div class="flex justify-center items-center">
                    <button class="logout avatar  bg-button-white-bg text-black rounded-full h-[100px] w-[100px] text-6xl font-david">
                        J
                    </button>
                </div>
                <h1 class="font-julee text-6xl tracking-widest">
                    MYPSEUDO
                </h1>
            </div>
            <div class="flex justify-end gap-5 w-1/2">
                <button class="p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300">
                    ADD +
                </button>
                <button class="p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300">
                    🚫
                </button>
            </div>
        </div>
        <div class="flex justify-center items-center 
            [&_button]:cursor-pointer">
            <button id="statsPlayer" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3">STATS</p>
            </button>
            <button id="historyPlayer" class="flex justify-center items-center border-white w-[18%] border-b-2">
                <p class="text-4xl tracking-widest py-3">HISTORY</p>
            </button>
        </div>

        <div class="flex h-1/2 flex-col justify-center items-center mt-20">
            <div class="grid grid-cols-2 [&_p]:text-5xl h-1/4 justify-center items-center">
                <div>
                    <p class="text-right">PLAYED :</p>
                </div>
                <div>
                    <p class="text-left pl-50">30</p>
                </div>
            </div>
            <div class="grid grid-cols-2 [&_p]:text-5xl h-1/4 justify-center items-center">
                <div>
                    <p class="text-right">WINS / LOSES :</p>
                </div>
                <div>
                    <p class="text-left pl-50">55%</p>
                </div>
            </div>
            <div class="grid grid-cols-2 [&_p]:text-5xl h-1/4 justify-center items-center">
                <div>
                    <p class="text-right">TOURNAMENTS :</p>
                </div>
                <div>
                    <p class="text-left pl-50">3</p>
                </div>
            </div>
            <div class="grid grid-cols-2 [&_p]:text-5xl h-1/4 justify-center items-center">
                <div>
                    <p class="text-right">WINS TOURNAMENTS :</p>
                </div>
                <div>
                    <p class="text-left pl-50">1</p>
                </div>
            </div>
        </div>
    `;
}
