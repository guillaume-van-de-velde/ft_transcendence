export function volume_HTML() {
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
        <p>VOLUME</p>
    </span>
    <div class="[&_h2]:text-5xl [&_h2]:text-center h-1/2 flex flex-col justify-around items-center mt-10">
        <div class="flex justify-between w-[70%]">
            <div class="w-[25%]">
                <h2>GENERAL</h2>
            </div>
            <div id="volumeBar1" class="relative w-[576px] cursor-pointer">
                <span id="scrollBar1" class="absolute w-full h-[1px] bg-white top-1/2 -translate-y-1/2"></span>
                <span id="dot1" class="absolute w-[16px] h-[16px] bg-white rounded-full top-1/2 -translate-y-1/2"></span>
            </div>
            <div class="w-[20%]">
                <h2 id="volumeValue1">60 %</h2>
            </div>
        </div>
        <div class="flex justify-between w-[70%]">
            <div class="w-[25%]">
                <h2>NOISES</h2>
            </div>
            <div id="volumeBar2" class="relative w-[576px] cursor-pointer">
                <span id="scrollBar2" class="absolute w-full h-[1px] bg-white top-1/2 -translate-y-1/2"></span>
                <span id="dot2" class="absolute w-[16px] h-[16px] bg-white rounded-full top-1/2 -translate-y-1/2"></span>
            </div>
            <div class="w-[20%]">
                <h2 id="volumeValue2">60 %</h2>
            </div>
        </div>
        <div class="flex justify-between w-[70%]">
            <div class="w-[25%]">
                <h2>MUSIC</h2>
            </div>
            <div id="volumeBar3" class="relative w-[576px] cursor-pointer">
                <span id="scrollBar1" class="absolute w-full h-[1px] bg-white top-1/2 -translate-y-1/2"></span>
                <span id="dot3" class="absolute w-[16px] h-[16px] bg-white rounded-full top-1/2 -translate-y-1/2"></span>
            </div>
            <div class="w-[20%]">
                <h2 id="volumeValue3">60 %</h2>
            </div>
        </div>
    </div>
    `;
}
