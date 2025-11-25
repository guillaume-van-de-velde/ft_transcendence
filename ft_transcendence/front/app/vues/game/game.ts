export function game_HTML(): string {
    return `
    <div class="app bg-home-bg text-white h-screen">
        <header class="h-1/6 flex w-full justify-center items-center gap-12">
            <div class="bg-player-display-bg flex justify-around items-center h-[75px] w-[300px] rounded-2xl">
                <div class="h-[75px] w-[100px] flex justify-center items-center">
                    <span id="playerPicture" class="h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    </span>
                </div>
                <div class="h-[75p] w-[200px] flex justify-center items-center">
                    <p id="playerPseudo" class="font-julee tracking-widest text-2xl">
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-3 w-[300px] text-6xl font-julee">
                <span id="scorePlayer">0</span>
                <span class="mx-auto"> - </span>
                <span class="text-right" id="scoreEnnemy">0</span>
            </div>
            <div class="bg-player-display-bg flex justify-around items-center h-[75px] w-[300px] rounded-2xl">
                <div class="h-[75p] w-[200px] flex justify-center items-center">
                    <p id="ennemyPseudo" class="font-julee tracking-widest text-2xl">
                    </p>
                </div>
                <div class="h-[75px] w-[100px] flex justify-center items-center">
                    <span id="ennemyPicture" class="h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    </span>
                </div>
            </div>
        </header>
        <canvas id="board" class="bg-black mx-auto relative border-t-[5px] border-b-[5px] border-white">
        </canvas>
        <footer class="w-full h-1/6 bg-gray-600"></footer>
    </div>
    `
}
