export function connexion_HTML(): string {
    return `
    <div class="app bg-home-bg text-white h-screen flex justify-center items-center">
        <div class="flex flex-col h-1/2 w-[50%] justify-around items-center">
            <div class="flex justify-center items-center h-1/2 w-full">
                <button id="logInBtn" class="bg-button-white-bg text-black font-dangrek tracking-widest text-8xl rounded-full h-1/2 w-1/2 cursor-pointer hover:h-2/3 hover:w-2/3 hover:tracking-[18px] duration-300">
                    LOG IN
                </button>
            </div>
            <div class="flex justify-center items-center h-1/2 w-full">
                <button id="signInBtn" class="bg-button-white-bg text-black font-dangrek tracking-widest text-8xl rounded-full h-1/2 w-1/2 cursor-pointer hover:h-2/3 hover:w-2/3 hover:tracking-[18px] duration-300">
                    SIGN IN
                </button>
            </div>
        </div>
    </div>
    `
}
