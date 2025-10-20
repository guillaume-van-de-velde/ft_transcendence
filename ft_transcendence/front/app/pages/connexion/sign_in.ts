export function signin_HTML(): string {
    return `
    <div class="app bg-home-bg text-white h-screen justify-center items-center font-dangrek flex flex-col">
        <span class="text-3xl flex justify-center items-center tracking-widest">
        <p class="opacity-100 cursor-pointer hover:tracking-[5px] duration-300">
            CONNEXION<p class="whitespace-pre opacity-50"> > SIGN IN</p>
        </p>
        </span>
        <form action="" class="h-1/2 grid grid-rows-4 w-[60%] mt-20 relative -translate-x-30">
            <div class="grid grid-cols-[1fr_2fr] items-center justify-center w-full h-1/4">
                <div class="flex justify-center">
                    <label for="email" class="text-4xl text-center inline-block mx-auto cursor-pointer hover:tracking-widest duration-300">EMAIL : </label>
                </div>
                <input type="text" name="email" id="email" class="bg-form-bg text-white text-5xl w-[100%] rounded-2xl text-center">
            </div>
            <div class="grid grid-cols-[1fr_2fr] items-center justify-center w-full h-1/4">
                <div class="flex justify-center">
                    <label for="password" class="text-4xl text-center inline-block mx-auto cursor-pointer hover:tracking-widest duration-300">PASSWORD : </label>
                </div>
                <input type="text" id="password" name="password" class="bg-form-bg text-white text-5xl w-[100%] rounded-2xl text-center focus:outline-none">
            </div>
            <div class="grid grid-cols-[1fr_2fr] items-center justify-center w-full h-1/4">
                <div class="flex justify-center">
                    <label for="confirm" class="text-4xl text-center inline-block mx-auto cursor-pointer hover:tracking-widest duration-300">CONFIRM : </label>
                </div>
                <input type="text" name="confirm" id="confirm" class="bg-form-bg text-white text-5xl w-[100%] rounded-2xl text-center focus:outline-none">
            </div>
            <div class="grid grid-cols-[1fr_2fr] items-center justify-center w-full h-1/4">
                <div class="flex justify-center">
                    <label for="pseudo" class="text-4xl text-center inline-block mx-auto cursor-pointer hover:tracking-widest duration-300">PSEUDO : </label>
                </div>
                <input type="text" name="pseudo" id="pseudo" class="bg-form-bg text-white text-5xl w-[100%] rounded-2xl text-center focus:outline-none">
            </div>
            <button type="submit" class="absolute h-[75px] w-[75px] rounded-full bg-button-white-bg bottom-1/12 translate-y-1/2 right-0 translate-x-40 text-black text-3xl hover:h-[80px] hover:w-[80px] duration-300 cursor-pointer">
                <i class="fa-solid fa-check"></i>
            </button>
        </form>
    </div>
    `
}
