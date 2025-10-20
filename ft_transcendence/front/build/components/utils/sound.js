const clickSound = new Audio("./style/assets/mp3/click.mp3");
const eventsToCatch = [
    "click",
    "submit"
];
export function soundLaunch() {
    eventsToCatch.forEach(eventType => {
        document.addEventListener(eventType, (e) => {
            const cursorStyle = window.getComputedStyle(e.target).cursor;
            if (cursorStyle !== "pointer")
                return;
            clickSound.currentTime = 0;
        }, true);
    });
}
