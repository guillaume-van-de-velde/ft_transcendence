export function history_user_HTML() {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <div class="flex justify-center items-center h-1/4">
            <div class="w-[12%] flex justify-center items-center">
                <button class="logout avatar cursor-pointer hover:w-[120px] hover:h-[120px] duration-300 bg-button-white-bg text-black rounded-full h-[100px] w-[100px] text-6xl font-david">
                    J
                </button>
            </div>
            <h1 class="font-julee text-6xl tracking-widest">
                MYPSEUDO
            </h1>
        </div>
        <div class="flex justify-center items-center
            [&_button]:cursor-pointer">

            <button id="stats" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">STATS</p>
            </button>
            <button id="history" class="bg-button-white-bg text-black flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">HISTORY</p>
            </button>
            <button id="friends" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">FRIENDS</p>
            </button>
            <button id="search" class="flex justify-center items-center border-white w-[18%] border-b-2">
                <p class="text-4xl tracking-widest py-3">SEARCH</p>
            </button>
        </div>

        <div class="flex flex-col w-9/10 justify-center items-center mx-auto p-20">
            <div class="grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full bg-green-700 py-2 px-8 rounded-full border-4 border-black">
                <div class="score flex justify-center items-center">
                    <p>8 - 5</p>
                </div>
                <div class="ennemy flex justify-center items-center">
                    <div class="flex justify-between items-center w-4/5">
                        <div class="">
                            <button class="player cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                                J
                            </button>
                        </div>
                        <h1 class="tracking-widest">
                            MYPSEUDO
                        </h1>
                    </div>
                </div>
                <div class="mode flex justify-center items-center">
                    <p>COM</p>
                </div>
                <div class="date text-sm flex justify-center items-center">
                    <p>07/04/2025 18h09</p>
                </div>
            </div>
            <div class="grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full bg-red-700 py-2 px-8 rounded-full border-4 border-black">
                <div class="score flex justify-center items-center">
                    <p>4 - 5</p>
                </div>
                <div class="ennemy flex justify-center items-center">
                    <div class="flex justify-between items-center w-4/5">
                        <div class="">
                            <button class="player cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                                J
                            </button>
                        </div>
                        <h1 class="tracking-widest">
                            MYPSEUDO
                        </h1>
                    </div>
                </div>
                <div class="mode flex justify-center items-center">
                    <p>COM</p>
                </div>
                <div class="date text-sm flex justify-center items-center">
                    <p>07/04/2025 18h09</p>
                </div>
            </div>
            <div class="grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full bg-green-700 py-2 px-8 rounded-full border-4 border-black">
                <div class="score flex justify-center items-center">
                    <p>8 - 5</p>
                </div>
                <div class="ennemy flex justify-center items-center">
                    <div class="flex justify-between items-center w-4/5">
                        <div class="">
                            <button class="player cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                                J
                            </button>
                        </div>
                        <h1 class="tracking-widest">
                            MYPSEUDO
                        </h1>
                    </div>
                </div>
                <div class="mode flex justify-center items-center">
                    <p>COM</p>
                </div>
                <div class="date text-sm flex justify-center items-center">
                    <p>07/04/2025 18h09</p>
                </div>
            </div>
            <div class="grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full bg-green-700 py-2 px-8 rounded-full border-4 border-black">
                <div class="score flex justify-center items-center">
                    <p>8 - 5</p>
                </div>
                <div class="ennemy flex justify-center items-center">
                    <div class="flex justify-between items-center w-4/5">
                        <div class="">
                            <button class="player cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                                J
                            </button>
                        </div>
                        <h1 class="tracking-widest">
                            MYPSEUDO
                        </h1>
                    </div>
                </div>
                <div class="mode flex justify-center items-center">
                    <p>COM</p>
                </div>
                <div class="date text-sm flex justify-center items-center">
                    <p>07/04/2025 18h09</p>
                </div>
            </div>
            <div class="grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full bg-gray-500 py-2 px-8 rounded-full border-4 border-black">
                <div class="score flex justify-center items-center">
                    <p>5 - 5</p>
                </div>
                <div class="ennemy flex justify-center items-center">
                    <div class="flex justify-between items-center w-4/5">
                        <div class="">
                            <button class="player cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                                J
                            </button>
                        </div>
                        <h1 class="tracking-widest">
                            MYPSEUDO
                        </h1>
                    </div>
                </div>
                <div class="mode flex justify-center items-center">
                    <p>COM</p>
                </div>
                <div class="date text-sm flex justify-center items-center">
                    <p>07/04/2025 18h09</p>
                </div>
            </div>
        </div>
    `;
}
