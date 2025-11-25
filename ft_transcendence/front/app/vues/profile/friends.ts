export function friends_HTML(): string {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <div class="flex justify-center items-center h-1/4">
            <div class="w-[12%] flex justify-center items-center">
                <button id="picture" class="logout avatar cursor-pointer hover:w-[120px] hover:h-[120px] duration-300 bg-button-white-bg text-black rounded-full h-[100px] w-[100px] text-6xl font-david">
                    J
                </button>
            </div>
            <h1 id="pseudo" class="font-julee text-6xl tracking-widest">
                MYPSEUDO
            </h1> 
        </div>
        <div class="flex justify-center items-center
            [&_button]:cursor-pointer">
            <button id="stats" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">STATS</p>
            </button>
            <button id="history" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">HISTORY</p>
            </button>
            <button id="friends" class="bg-button-white-bg text-black flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">FRIENDS</p>
            </button>
            <button id="search" class="flex justify-center items-center border-white w-[18%] border-b-2">
                <p class="text-4xl tracking-widest py-3">SEARCH</p>
            </button>
        </div>

        <div class="h-1/6 w-full flex justify-center items-center">
            <form action="" class="bg-form-bg w-1/3 flex justify-between rounded-full h-1/3 text-4xl">
                <input type="text" placeholder="search a friend" class="pl-5">
                <button type="submit" class="cursor-pointer grayscale-100">🔍</button>
            </form>
        </div>
        <div id="friendsList" class="flex flex-wrap w-6/10 mx-auto">
            <!-- <span class="absolute h-[40px] w-[10px] bg-form-bg right-0 -translate-x-60 translate-y-1 rounded-full cursor-pointer"></span> -->
        </div>
    `
}
