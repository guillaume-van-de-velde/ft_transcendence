export function homeHTML(): string {
    return `
    <div class="app bg-home-bg text-white h-screen flex flex-col justify-between overflow-hidden">
        <header class="flex justify-between w-full mx-auto h-1/6 items-center">
            <div class="flex justify-center w-1/3">
                <h2 id="settings" class="cursor-pointer text-4xl font-julee tracking-widest hover:tracking-[8px] duration-300">
                    ${i18next.t("settings")}
                </h2>
            </div>
            <div class="flex justify-center w-1/3">
                <h1 class="text-6xl font-science tracking-widest opacity-50">
                    P O N G
                </h1>
            </div>
            <div class="flex justify-center w-1/3">
                <button id="profile" class="cursor-pointer text-black bg-button-white-bg h-25 w-25 rounded-full text-7xl hover:scale-110 duration-300">
                </button>
            </div>
        </header>
        <div class="h-1/24"></div>
        <main class="flex justify-between w-full mx-auto h-1/4 items-center -translate-y-10">
            <div class="flex justify-center w-1/3">
                <button id="mode" class="cursor-pointer text-4xl font-david bg-button-white-bg text-center text-black w-25 h-25 hover:h-30 hover:w-30 rounded-full tracking-widest duration-300">
                </button>
            </div>
            <div class="flex justify-center w-1/3">
                <h1 id="play" class="cursor-pointer text-6xl font-julee tracking-widest hover:tracking-[18px] duration-300">
                    ${i18next.t("play")}
                </h1>
            </div>
            <div id="messageHome" class="relative flex justify-center w-1/3">
                <img id="messages" src="./style/assets/images/message.png" class="cursor-pointer bg-button-white-bg h-25 w-25 rounded-full text-7xl inline-block hover:h-30 hover:w-30 duration-300">
            </div>
        </main>
        <div class="h-1/24"></div>
        <footer class="relative w-full h-3/24 bg-gray-600 overflow-hidden">
            <div class="absolute bottom-18 left-0 w-[20%] h-30 rounded-[50%] rounded-l-[90%] bg-home-bg animate-simple-wave"></div>
            <div class="absolute bottom-18 left-[20%] w-[20%] h-30 rounded-[50%] rounded-l-[90%] bg-home-bg animate-simple-wave"></div>
            <div class="absolute bottom-18 left-[40%] w-[20%] h-30 rounded-[50%] rounded-l-[90%] bg-home-bg animate-simple-wave"></div>
            <div class="absolute bottom-18 left-[60%] w-[20%] h-30 rounded-[50%] rounded-l-[90%] bg-home-bg animate-simple-wave"></div>
            <div class="absolute bottom-18 left-[80%] w-[20%] h-30 rounded-[50%] rounded-l-[90%] bg-home-bg animate-simple-wave"></div>
            <div class="absolute bottom-18 left-full w-[20%] h-30 rounded-[50%] rounded-l-[90%] bg-home-bg animate-simple-wave"></div>
        </footer>
    </div>
    `
}