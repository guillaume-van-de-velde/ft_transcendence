export function verify_HTML(): string {
    return `
    <div class="app bg-home-bg text-white h-screen justify-center items-center font-dangrek flex flex-col">
        <div class="felx flex-col h-2/3 w-full justify-around items-center mx-auto">
            <span class="text-3xl flex justify-center items-center tracking-widest">
            <p>
                <p id="connexionBtn" class="opacity-100 cursor-pointer hover:tracking-[5px] duration-300">CONNEXION</p><p class="whitespace-pre opacity-50"> > VERIFY</p>
            </p>
            </span>
            <form id="formVerify" action="" class="grid grid-rows-2 relative -translate-x-30 justify-around items-center h-1/2 mt-20">
                <div class="grid grid-cols-[1fr_2fr] items-center justify-center w-full h-1/2">
                    <div class="flex justify-center">
                        <label for="code" class="text-4xl text-center inline-block mx-auto cursor-pointer hover:tracking-widest duration-300">CODE : </label>
                    </div>
                    <input type="text" name="code" id="code" class="bg-form-bg text-white text-5xl w-[100%] rounded-2xl text-center">
                </div>
                <button type="submit" class="absolute h-[75px] w-[75px] rounded-full bg-button-white-bg -bottom-10 translate-y-1/2 right-140 translate-x-40 text-black text-3xl hover:h-[80px] hover:w-[80px] duration-300 cursor-pointer">
                    <i class="fa-solid fa-check"></i>
                </button>
            </form>
        </div> 
    </div>
    `
}
