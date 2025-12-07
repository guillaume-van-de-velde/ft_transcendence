export function privateHTML(): string {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <div class="flex justify-center items-center
            [&_button]:cursor-pointer
            h-1/5">

            <button id="private" class="relative flex justify-center items-center border-white w-[18%] border-r-2 border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3">${i18next.t("private")}</p>
            </button>
            <button id="global" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">${i18next.t("global")}</p>
            </button>
            <button id="notify" class="relative flex justify-center items-center border-white w-[18%] border-b-2">
                <p class="text-4xl tracking-widest py-3">${i18next.t("notify")}</p>
            </button>
        </div>

        <div class="grid grid-cols-[1fr_3fr] flex-grow w-9/10 mx-auto gap-5 min-h-0 pb-10">
            <div id="friendsList" class="flex flex-col justify-start items-center pt-10">
            </div>

            <div class="min-h-0 bg-black rounded-4xl relative flex flex-col justify-start items-center font-david">
                <div id="chat" class="hide-scrollbar h-[600px] mb-10 overflow-y-auto w-9/10 mt-5 flex gap-2 flex-col [&_p]:p-4 [&_p]:break-all [&_div]:max-w-1/2 [&_div]:rounded-xl [&_.usermessage]:ml-auto [&_.usermessage]:bg-white [&_.usermessage]:text-black [&_.notusermessage]:mr-auto [&_.notusermessage]:bg-action-page-bg">
                </div>
                <form id="formWriteBar" action="" class="h-1/10 w-9/10 bg-white rounded-full mb-3 text-black flex">
                    <input type="text" id="writeBar" name="writeBar" placeholder="WRITE" class="h-full w-17/20 ml-auto outline-none">
                    <button type="submit" class="w-1/10 h-full cursor-pointer hover:text-4xl duration-300 text-2xl">></button>
                </form>
            </div>
        </div>
    `
}
