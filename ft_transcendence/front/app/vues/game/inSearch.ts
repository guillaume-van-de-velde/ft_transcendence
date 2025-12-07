export function insearchHTML(): string {
    return `
    <div class="app bg-home-bg text-white h-screen flex flex-col justify-between">
        <main class="flex flex-col justify-evenly w-full mx-auto h-2/3 items-center">
            <h1 class="mx-auto text-6xl font-julee tracking-widest">
                ${i18next.t("inSearch")} . . .
            </h1>
            <button id="quit" class="bg-button-white-bg text-black text-5xl px-20 py-5 rounded-2xl font-dangrek cursor-pointer hover:tracking-[2px] duration-300">
                ${i18next.t("squit")}
            </button>
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
