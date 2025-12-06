export function pseudo_HTML(): string {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                ${i18next.t("settings")}
            </h1>
        </div>
        <span class="text-3xl flex justify-center items-center tracking-widest">
            <p>
                <p id="account" class="opacity-100 cursor-pointer hover:tracking-[5px] duration-300">${i18next.t("account")}</p><p class="whitespace-pre opacity-50"> > ${i18next.t("pseudo")}</p>
            </p>
        </span>
        <form action="" id="pseudoForm" class="h-1/2 grid grid-rows-3 w-[80%] mt-10 relative">
            <div class="opacity-30 grid grid-cols-[1fr_2fr] items-center justify-center w-full">
                <div class="flex justify-center">
                    <label for="yourpseudo" class="text-5xl text-center inline-block mx-auto">${i18next.t("yourPseudo")} : </label>
                </div>
                <input type="text" name="yourpseudo" id="yourpseudo" placeholder="example@gmail.com" class="bg-black text-white text-5xl w-[100%] rounded-2xl text-center cursor-default" disabled>
            </div>
            <div class="grid grid-cols-[1fr_2fr] items-center justify-center w-full">
                <div class="flex justify-center">
                    <label for="newpseudo" class="text-5xl text-center inline-block mx-auto cursor-pointer hover:tracking-widest duration-300">${i18next.t("newPseudo")} : </label>
                </div>
                <input type="text" id="newpseudo" name="newpseudo" class="bg-form-bg text-white text-5xl w-[100%] rounded-2xl text-center focus:outline-none">
            </div>
            <div class="grid grid-cols-[1fr_2fr] items-center justify-center w-full">
                <div class="flex justify-center">
                    <label for="confirm" class="text-5xl text-center inline-block mx-auto cursor-pointer hover:tracking-widest duration-300">${i18next.t("confirm")} : </label>
                </div>
                <input type="text" name="confirm" id="confirm" class="bg-form-bg text-white text-5xl w-[100%] rounded-2xl text-center focus:outline-none">
            </div>
            <button type="submit" class="absolute h-[75px] w-[75px] rounded-full bg-button-white-bg bottom-1/6 translate-y-1/2 right-0 translate-x-40 text-black text-3xl hover:h-[80px] hover:w-[80px] duration-300 cursor-pointer">
                <i class="fa-solid fa-check"></i>
            </button>
        </form>
    `
}
