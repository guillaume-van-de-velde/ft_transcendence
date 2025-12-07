import { state } from "../../index.js";

const clickSound = new Audio("./style/assets/mp3/click.mp3");

const eventsToCatch = [
    "click",
    "submit"
];

export function soundLaunch() {
    eventsToCatch.forEach(eventType => {
        document.addEventListener(
            eventType,
            (e: Event) => {
                const cursorStyle = window.getComputedStyle(e.target as HTMLElement).cursor;
                if (cursorStyle !== "pointer")
                    return;
                clickSound.currentTime = 0;
                clickSound.volume = state.volume.general / 100 * state.volume.noises / 100;
                clickSound.play();
            },
            true
        );
    });
}