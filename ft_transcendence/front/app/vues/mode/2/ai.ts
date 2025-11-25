export function ai_HTML(): string {
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
            <button id="mode2" class="flex justify-center items-center border-white w-[18%] border-r-2 border-b-2 bg-button-white-bg text-black">
                <p class="text-4xl tracking-widest py-3"></p>
            </button>
            <button id="mode3" class="flex justify-center items-center border-white w-[18%] border-b-2">
                <p class="text-4xl tracking-widest py-3"></p>
            </button>
        </div>
        <div class="flex flex-col items-center justify-between h-5/10 mt-15">
            <h2 class="text-center text-4xl leading-14">
                YOU ARE IN AI MODE. <br>
                YOU WILL PLAY AGAINST AN<br>
                ARTIFICIAL INTELLIGENCE.
            </h2>
            <button id="online" class="bg-button-white-bg text-black font-dangrek tracking-widest text-4xl rounded-full h-[100px] w-[500px] hover:h-[calc(100px*1.1)] hover:w-[calc(500px*1.1)] cursor-pointer duration-300">
                GO IN ONLINE MODE
            </button>
            <button id="local" class="bg-button-white-bg text-black font-dangrek tracking-widest text-4xl rounded-full h-[100px] w-[500px] hover:h-[calc(100px*1.1)] hover:w-[calc(500px*1.1)] cursor-pointer duration-300">
                GO IN LOCAL MODE
            </button>
        </div>
    `
}
