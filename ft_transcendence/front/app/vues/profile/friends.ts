export function friendsHTML(): string {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <span id="disconnect" class="absolute min-w-[200px] h-[50px] flex items-center justify-center text-2xl cursor-pointer hover:text-black hover:bg-white duration-300 translate-x-90 translate-y-15 rounded-full">
            ${i18next.t("logOut")}
        </span>

        <span id="changePicture" class="absolute min-w-[200px] h-[50px] flex items-center justify-center text-2xl cursor-pointer hover:text-black hover:bg-white duration-300 translate-x-90 translate-y-30 rounded-full">
            ${i18next.t("picture")}
        </span>

        <div class="flex justify-center items-center h-1/4">
            <div class="w-[12%] flex justify-center items-center">
                <button id="picture" class="logout avatar bg-button-white-bg text-black rounded-full h-[100px] w-[100px] text-6xl font-david">
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
                <p class="text-4xl tracking-widest py-3">${i18next.t("stats")}</p>
            </button>
            <button id="history" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">${i18next.t("history")}</p>
            </button>
            <button id="friends" class="bg-button-white-bg text-black flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">${i18next.t("friends")}</p>
            </button>
            <button id="search" class="flex justify-center items-center border-white w-[18%] border-b-2">
                <p class="text-4xl tracking-widest py-3">${i18next.t("search")}</p>
            </button>
        </div>
        <div class="h-1/12 w-full"></div>
        <div id="friendsList" class="flex flex-wrap w-6/10 mx-auto overflow-y-auto hide-scrollbar">
        </div>
    `
}
