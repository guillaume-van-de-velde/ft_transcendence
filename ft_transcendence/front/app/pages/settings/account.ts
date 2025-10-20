export function account_HTML(): string {
    return `
        <span id="close" class="close"> 
            <p class="translate-y-0.5">X</p>
        </span>
        <div class="w-full h-1/4 flex justify-center items-center">
            <h1 id="settingsAction" class="text-8xl font-dangrek tracking-widest text-center cursor-pointer hover:tracking-[18px] duration-300">
                SETTINGS
            </h1>
        </div>
        <span class="text-3xl opacity-50 flex justify-center items-center tracking-widest">
            <p>ACCOUNT</p>
        </span>
        <div class="h-1/2 flex flex-col justify-around items-center mt-20 text-5xl [&_h2]:cursor-pointer [&_h2]:hover:tracking-[10px] [&_h2]:duration-300">
        <div>
            <h2 id="email">EMAIL</h2>
        </div>
        <div>
            <h2 id="password">PASSWORD</h2>
        </div>
        <div>
            <h2 id="pseudo">PSEUDO</h2>
        </div>
        <div>
            <h2 id="delete">DELETE</h2>
        </div>
    `
}