export function notify_HTML(): string {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <div class="flex justify-center items-center 
            [&_button]:cursor-pointer
            h-1/5">

            <button id="private" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">PRIVATE</p>
            </button>
            <button id="global" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">GLOBAL</p>
            </button>
            <button id="notify" class="flex justify-center items-center border-white w-[18%] border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3">NOTIFY</p>
            </button>
        </div>

        <div class="flex flex-col justify-center items-center h-6/10 gap-10">
            <div class="flex w-7/10 justify-around items-center mx-auto">
                <div class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black">
                    <div class="h-[75px] w-[100px] flex justify-center items-center">
                        <span class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            <p class="translate-y-3 text-2xl">P</p>
                        </span>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="font-julee tracking-widest text-2xl">
                            PLAYER 1
                        </p>
                    </div>
                </div>
                <h2 class="text-4xl">WANT TO BE YOUR FRIEND</h2>
                <button class="text-2xl h-[60px] w-[60px] mr-2 bg-green-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="text-2xl h-[60px] w-[60px] bg-red-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    X
                </button>
            </div>
            <div class="flex w-7/10 justify-around items-center mx-auto">
                <div class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black">
                    <div class="h-[75px] w-[100px] flex justify-center items-center">
                        <span class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            <p class="translate-y-3 text-2xl">P</p>
                        </span>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="font-julee tracking-widest text-2xl">
                            PLAYER 1
                        </p>
                    </div>
                </div>
                <h2 class="text-4xl">WANT TO BE YOUR FRIEND</h2>
                <button class="text-2xl h-[60px] w-[60px] mr-2 bg-green-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="text-2xl h-[60px] w-[60px] bg-red-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    X
                </button>
            </div>
            <div class="flex w-7/10 justify-around items-center mx-auto">
                <div class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black">
                    <div class="h-[75px] w-[100px] flex justify-center items-center">
                        <span class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            <p class="translate-y-3 text-2xl">P</p>
                        </span>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="font-julee tracking-widest text-2xl">
                            PLAYER 1
                        </p>
                    </div>
                </div>
                <h2 class="text-4xl">WANT TO BE YOUR FRIEND</h2>
                <button class="text-2xl h-[60px] w-[60px] mr-2 bg-green-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="text-2xl h-[60px] w-[60px] bg-red-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    X
                </button>
            </div>
            <div class="flex w-7/10 justify-around items-center mx-auto">
                <div class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black">
                    <div class="h-[75px] w-[100px] flex justify-center items-center">
                        <span class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            <p class="translate-y-3 text-2xl">P</p>
                        </span>
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="font-julee tracking-widest text-2xl">
                            PLAYER 1
                        </p>
                    </div>
                </div>
                <h2 class="text-4xl">WANT TO BE YOUR FRIEND</h2>
                <button class="text-2xl h-[60px] w-[60px] mr-2 bg-green-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="text-2xl h-[60px] w-[60px] bg-red-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                    X
                </button>
            </div>
            <span class="absolute h-[80px] w-[10px] bg-form-bg right-0 -translate-x-40 translate-y-5 top-1/4 rounded-full cursor-pointer"></span>
        </div>
    `
}

