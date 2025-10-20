export function delete_HTML() {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                SETTINGS
            </h1>
        </div>
        <span class="text-3xl flex justify-center items-center tracking-widest">
            <p>
                <p id="account" class="opacity-100 cursor-pointer hover:tracking-[5px] duration-300">ACCOUNT</p><p class="whitespace-pre opacity-50"> > DELETE</p>
            </p>
        </span>
        <div class="h-2/5 flex flex-col justify-around items-center mt-30">
            <div class="h-1/2">
                <h2 class="opacity-50 text-6xl">
                ARE YOU SURE ?
                </h2>
            </div>
            <div class="flex justify-around w-[60%] h-1/2">
                <div class="w-1/2 flex justify-center">
                    <button class="h-[100px] w-[100px] bg-button-white-bg text-black rounded-full text-4xl hover:tracking-[10px] hover:h-[120px] hover:w-[120px] duration-300 cursor-pointer">
                    YES
                    </button>
                </div>
                <div class="w-1/2 flex justify-center">
                    <button class="h-[100px] w-[100px] bg-button-white-bg text-black rounded-full text-4xl hover:tracking-[10px] hover:h-[120px] hover:w-[120px] duration-300 cursor-pointer">
                    NO
                    </button>
                </div>
            </div>
        </div>
    `;
}
