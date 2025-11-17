export function notify_HTML(): string {
    return `
        <span id="close" class="close">
            <p class="translate-y-0.5">X</p>
        </span>

        <div class="flex justify-center items-center 
            [&_button]:cursor-pointer
            h-1/5">

            <button id="private" class="relative flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">PRIVATE</p>
            </button>
            <button id="global" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2">
                <p class="text-4xl tracking-widest py-3">GLOBAL</p>
            </button>
            <button id="notify" class="relative flex justify-center items-center border-white w-[18%] border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3">NOTIFY</p>
            </button>
        </div>
        <div class="h-1/10"></div>
        <div id="notificationsList" class="flex flex-col justify-top items-center gap-10">
            <!-- <span class="absolute h-[80px] w-[10px] bg-form-bg right-0 -translate-x-40 translate-y-5 top-1/4 rounded-full cursor-pointer"></span> -->
        </div>
    `
}
