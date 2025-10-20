export function quit_HTML() {
    return `
        <span id="close2" class="close">
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="flex flex-col items-center justify-around h-6/10 mt-30">
            <h1 class="text-6xl text-center">WARNING</h1>
            <h2 class="text-4xl text-center">
                YOU WILL BE OUT OF THIS<br>
                TOURNAMENT.
            </h2>
            <div class="flex gap-10 w-8/10 items-center justify-around">
                <button id="quitConfirm" class="bg-button-white-bg text-black font-dangrek tracking-widest text-3xl rounded-full h-[100px] w-[300px] hover:scale-110 cursor-pointer duration-300">
                    QUIT
                </button>
                <button id="stay" class="bg-button-white-bg text-black font-dangrek tracking-widest text-3xl rounded-full h-[100px] w-[300px] hover:scale-110 cursor-pointer duration-300">
                    STAY
                </button>
                </div>
            </div>
        </div>
    `;
}
