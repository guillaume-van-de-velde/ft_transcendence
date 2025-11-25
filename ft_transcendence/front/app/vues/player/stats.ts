export function stats_HTML(): string {
    return `
        <span id="close2" class="close">
            <p class="translate-y-0.5">X</p>
        </span>


        <div id="profilePlayer" class="h-1/4 flex justify-around items-center w-6/10 mx-auto">
            <div class="flex justify-center items-center h-full w-1/2 gap-5">
                <div class="flex justify-center items-center">
                    <div id="picturePlayer" class="logout avatar  bg-button-white-bg text-black rounded-full h-[100px] w-[100px] text-6xl font-david">
                    </div>
                </div>
                <h1 id="pseudoPlayer" class="font-julee text-6xl tracking-widest">
                </h1>
            </div>
            <div id="statusPlayer" class="flex justify-end gap-5 w-1/2">
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
                    <p id="resultPlayed" class="text-left pl-50">30</p>
                </div>
            </div>
            <div class="grid grid-cols-2 [&_p]:text-5xl h-1/4 justify-center items-center">
                <div>
                    <p class="text-right">WINS / LOSES :</p>
                </div>
                <div>
                    <p id="resultRatio" class="text-left pl-50">55%</p>
                </div>
            </div>
            <div class="grid grid-cols-2 [&_p]:text-5xl h-1/4 justify-center items-center">
                <div>
                    <p class="text-right">TOURNAMENTS :</p>
                </div>
                <div>
                    <p id="resultTournaments" class="text-left pl-50">3</p>
                </div>
            </div>
            <div class="grid grid-cols-2 [&_p]:text-5xl h-1/4 justify-center items-center">
                <div>
                    <p class="text-right">WINS TOURNAMENTS :</p>
                </div>
                <div>
                    <p id="resultWinTournaments" class="text-left pl-50">1</p>
                </div>
            </div>
        </div>
    `
}
