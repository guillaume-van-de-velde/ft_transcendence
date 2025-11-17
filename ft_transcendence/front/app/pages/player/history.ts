export function history_HTML(): string {
    return `
        <span id="close2" class="close">
            <p class="translate-y-0.5">X</p>
        </span>


        <div class="h-1/4 flex justify-around items-center w-6/10 mx-auto">
            <div class="flex justify-center items-center h-full w-1/2 gap-5">
                <div class="flex justify-center items-center">
                    <div id="picturePlayer" class="logout avatar  bg-button-white-bg text-black rounded-full h-[100px] w-[100px] text-6xl font-david">
                    </div>
                </div>
                <h1 id="pseudoPlayer" class="font-julee text-6xl tracking-widest">
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

            <button id="statsPlayer" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">STATS</p>
            </button>
            <button id="historyPlayer" class="flex justify-center items-center border-white w-[18%] border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3">HISTORY</p>
            </button>
        </div>

        <div id="historyList" class="flex flex-col w-9/10 justify-center items-center mx-auto p-10">
        </div>
    `
}
