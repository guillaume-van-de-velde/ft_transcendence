export function private_HTML() {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <div class="flex justify-center items-center
            [&_button]:cursor-pointer
            h-1/5">

            <button id="private" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3">PRIVATE</p>
            </button>
            <button id="global" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">GLOBAL</p>
            </button>
            <button id="notify" class="flex justify-center items-center border-white w-[18%] border-b-2">
                <p class="text-4xl tracking-widest py-3">NOTIFY</p>
            </button>
        </div>

        <div class="grid grid-cols-[1fr_3fr] h-7/10 w-9/10 mx-auto gap-5">
            <div class=" flex flex-col justify-start items-center pt-10 [&_button]:focus:bg-form-bg">

                <button class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black cursor-pointer">
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
                </button>
                <button class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black cursor-pointer">
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
                </button>
                <button class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black cursor-pointer">
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
                </button>
                <span class="absolute h-[80px] w-[10px] bg-form-bg left-0 translate-x-15 translate-y-1 rounded-full cursor-pointer"></span>
            </div>

            <div class="bg-black rounded-4xl relative flex flex-col justify-between items-center font-david">
                <div class="h-8/10 w-9/10 mt-5 flex gap-2 flex-col [&_p]:p-4 [&_p]:break-all [&_div]:max-w-1/2 [&_div]:rounded-xl [&_.usermessage]:ml-auto [&_.usermessage]:bg-white [&_.usermessage]:text-black [&_.friendmessage]:mr-auto [&_.friendmessage]:bg-action-page-bg [&_.matchmessage]:mx-auto [&_.matchmessage]:bg-action-page-bg">
                    <div class="usermessage">
                        <p>1HEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfw</p>
                    </div>
                    <div class="friendmessage">
                        <p>HEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfw</p>
                    </div>
                    <div class="usermessage">
                        <p>HEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfw</p>
                    </div>
                    <div class="matchmessage">
                        <p>MATCH <span class="font-julee text-xl whitespace-pre">  C  </span>
                            <button class="h-[40px] w-[40px] mr-2 bg-green-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                                <i class="fa-solid fa-check"></i>
                            </button>
                            
                            <button class="h-[40px] w-[40px] bg-red-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
                                X
                            </button>
                        </p>
                    </div>
                    <div class="usermessage">
                        <p>HEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfwHEYwejhbfw</p>
                    </div>
                </div>
                <form action="" class="h-1/10 w-9/10 bg-white rounded-full mb-3 text-black flex">
                    <input type="text" placeholder="WRITE" class="h-full w-17/20 ml-auto outline-none">
                    <button type="submit" class="w-1/10 h-full cursor-pointer hover:text-4xl duration-300 text-2xl">></button>
                </form>
            </div>
        </div>
    `;
}
