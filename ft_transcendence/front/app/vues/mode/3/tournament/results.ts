export function resultsHTML(): string {
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
        <div class="h-7/10 w-9/10 grid grid-cols-9 grid-rows-4 [grid-template-areas:'quart1_quart1_quart1_demi1_demi1_demi1_final_final_final''quart2_quart2_quart2_demi1_demi1_demi1_final_final_final''quart3_quart3_quart3_demi2_demi2_demi2_final_final_final''quart4_quart4_quart4_demi2_demi2_demi2_final_final_final']">
            <div class="[grid-area:quart1] flex justify-around w-full h-full">
                <div class="flex flex-col w-1/3 h-full justify-between">
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart1" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart2" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                </div>
                <div class="relative w-1/3 h-full">
                    <span class="absolute h-[1px] w-6/10 bg-white top-5/20"></span>
                    <span class="absolute h-[1px] w-6/10 bg-white bottom-5/20"></span>
                    <span class="absolute w-[1px] h-1/2 bg-white left-6/10 top-5/20"></span>
                    <span class="absolute h-[1px] w-4/10 bg-white top-1/2 right-0"></span>
                </div>
            </div>
            <div class="[grid-area:quart2] flex justify-around w-full h-full">
                <div class="flex flex-col w-1/3 h-full justify-between">
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart3" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart4" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                </div>
                <div class="relative w-1/3 h-full">
                    <span class="absolute h-[1px] w-6/10 bg-white top-5/20"></span>
                    <span class="absolute h-[1px] w-6/10 bg-white bottom-5/20"></span>
                    <span class="absolute w-[1px] h-1/2 bg-white left-6/10 top-5/20"></span>
                    <span class="absolute h-[1px] w-4/10 bg-white top-1/2 right-0"></span>
                </div>
            </div>
            <div class="[grid-area:quart3] flex justify-around w-full h-full">
                <div class="flex flex-col w-1/3 h-full justify-between">
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart5" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart6" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                </div>
                <div class="relative w-1/3 h-full">
                    <span class="absolute h-[1px] w-6/10 bg-white top-5/20"></span>
                    <span class="absolute h-[1px] w-6/10 bg-white bottom-5/20"></span>
                    <span class="absolute w-[1px] h-1/2 bg-white left-6/10 top-5/20"></span>
                    <span class="absolute h-[1px] w-4/10 bg-white top-1/2 right-0"></span>
                </div>
            </div>
            <div class="[grid-area:quart4] flex justify-around w-full h-full">
                <div class="flex flex-col w-1/3 h-full justify-between">
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart7" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="quart8" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                </div>
                <div class="relative w-1/3 h-full">
                    <span class="absolute h-[1px] w-6/10 bg-white top-5/20"></span>
                    <span class="absolute h-[1px] w-6/10 bg-white bottom-5/20"></span>
                    <span class="absolute w-[1px] h-1/2 bg-white left-6/10 top-5/20"></span>
                    <span class="absolute h-[1px] w-4/10 bg-white top-1/2 right-0"></span>
                </div>
            </div>
            <div class="[grid-area:demi1] flex justify-around w-full h-full">
                <div class="flex flex-col w-1/3 h-full justify-between">
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="demi1" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="demi2" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                </div>
                <div class="relative w-1/3 h-full">
                    <span class="absolute h-[1px] w-6/10 bg-white top-5/20"></span>
                    <span class="absolute h-[1px] w-6/10 bg-white bottom-5/20"></span>
                    <span class="absolute w-[1px] h-1/2 bg-white left-6/10 top-5/20"></span>
                    <span class="absolute h-[1px] w-4/10 bg-white top-1/2 right-0"></span>
                </div>
            </div>
            <div class="[grid-area:demi2] flex justify-around w-full h-full">
                <div class="flex flex-col w-1/3 h-full justify-between">
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="demi3" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="demi4" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                </div>
                <div class="relative w-1/3 h-full">
                    <span class="absolute h-[1px] w-6/10 bg-white top-5/20"></span>
                    <span class="absolute h-[1px] w-6/10 bg-white bottom-5/20"></span>
                    <span class="absolute w-[1px] h-1/2 bg-white left-6/10 top-5/20"></span>
                    <span class="absolute h-[1px] w-4/10 bg-white top-1/2 right-0"></span>
                </div>
            </div>
            <div class="[grid-area:final] flex justify-around w-full h-full">
                <div class="flex flex-col w-1/3 h-full justify-between">
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="final1" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                        </span>
                    </div>
                    <div class="h-1/2 flex justify-center items-center">
                        <span id="final2" class="playerVoid duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                            
                        </span>
                    </div>
                </div>
                <div class="relative w-1/3 h-full">
                    <span class="absolute h-[1px] w-6/10 bg-white top-5/20"></span>
                    <span class="absolute h-[1px] w-6/10 bg-white bottom-5/20"></span>
                    <span class="absolute w-[1px] h-1/2 bg-white left-6/10 top-5/20"></span>
                    <span class="absolute h-[1px] w-4/10 bg-white top-1/2 right-0"></span>
                </div>
            </div>
        </div>
        <span class="winner absolute right-10 top-1/2 translate-y-1/4 duration-300 h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
        </span>
        <span id="statusTournament" class="absolute right-20 top-40 ">
            <p class="text-2xl"></p>
        </span>
        <button id="quit" class="absolute right-20 bottom-20 bg-button-white-bg text-black font-dangrek tracking-widest text-xl rounded-full h-[50px] w-[300px] hover:h-[calc(50px*1.1)] hover:w-[calc(300px*1.1)] cursor-pointer duration-300">
            ${i18next.t("quitTournament")}
        </button>
    `
}
