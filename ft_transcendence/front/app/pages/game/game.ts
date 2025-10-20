export function game_HTML(): string {
    return `
    <div class="app bg-home-bg text-white h-screen">
        <header class="h-1/6 flex w-full justify-center items-center gap-12">
            <div class="bg-player-display-bg flex justify-around items-center h-[75px] w-[300px] rounded-2xl">
                <div class="h-[75px] w-[100px] flex justify-center items-center">
                    <span class="h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                        <p class="translate-y-3 text-2xl">P</p>
                    </span>
                </div>
                <div class="h-[75p] w-[200px] flex justify-center items-center">
                    <p class="font-julee tracking-widest text-2xl">
                        PLAYER 1
                    </p>
                </div>
            </div>
            <div class="text-6xl font-julee">
                <p>2 - 1</p>
            </div>
            <div class="bg-player-display-bg flex justify-around items-center h-[75px] w-[300px] rounded-2xl">
                <div class="h-[75p] w-[200px] flex justify-center items-center">
                    <p class="font-julee tracking-widest text-2xl">
                        PLAYER 2
                    </p>
                </div>
                <div class="h-[75px] w-[100px] flex justify-center items-center">
                    <span class="h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                        <p class="translate-y-3 text-2xl">P</p>
                    </span>
                </div>
            </div>
        </header>
        <main class="h-2/3 w-7/10 bg-black mx-auto relative rounded-2xl">
            <span class="absolute h-full w-[1px] bg-white translate-x-[calc(1920px*7/10*1/2)]">
            </span>
            <span class="absolute w-5 h-5 bg-white translate-100 rounded-full">
            </span>
            <span class="absolute w-2 h-25 bg-white rounded-2xl">
            </span>
            <span class="absolute w-2 h-25 translate-x-[calc(1920px*0.7-8px)] translate-y-100 bg-white rounded-2xl">
            </span>
        </main>
        <footer class="w-full h-1/6 bg-gray-600"></footer>
    </div>
    `
}
