export function create_HTML(): string {
    return `
        <span id="close2" class="close">
            <p class="translate-y-0.5">X</p>
        </span>
        <form action="" class="flex flex-col w-full h-8/10 justify-around items-center mt-20">
            <input type="text" name="" id="" class="bg-home-bg w-8/10 h-2/10 rounded-full text-center text-3xl outline-none" placeholder="TOURNAMENT'S NAME">
            <div class="h-[100px] w-[500px] flex justify-center items-center">
                <button type="submit" id="createBtn" class="bg-button-white-bg text-black font-dangrek tracking-widest text-3xl rounded-full h-[100px] w-[300px] hover:h-[calc(100px*1.1)] hover:w-[calc(300px*1.1)] cursor-pointer duration-300">
                    CREATE
                </button>
            </div>
        </form>
    `
}