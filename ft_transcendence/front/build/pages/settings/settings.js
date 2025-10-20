export function settings_HTML() {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                SETTINGS
            </h1>
        </div>
        <div class="w-full h-1/2 flex flex-col justify-around items-center font-dangrek text-5xl tracking-widest [&_p]:cursor-pointer [&_p]:hover:tracking-[10px] [&_p]:duration-300">
            <div>
                <p id="volume">VOLUME</p>
            </div>
            <div>
                <p id="key">KEY</p>
            </div>
            <div>
                <p id="account">ACCOUNT</p>
            </div>
            <div>
                <p id="language">LANGUAGE</p>
            </div>
        </div>
    `;
}
