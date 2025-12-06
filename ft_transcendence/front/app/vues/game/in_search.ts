export function insearch_HTML(): string {
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
        <footer class="w-full h-1/6 bg-gray-600"></footer>
    </div>
    `
}
