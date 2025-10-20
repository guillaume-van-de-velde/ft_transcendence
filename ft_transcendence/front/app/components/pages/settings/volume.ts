import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state, TypeEvent } from "../../core/state.js";
import { closeEvent } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderSettings } from "./settings.js";

export function renderVolume() {
    const volumePage: PageInstance = {
        content: page.settings.volume,
        level: 1,
        create: volume,
    }
    render(volumePage);
}

export function volume() {
    const settings = document.getElementById("settingsAction");
    const volumeBar1 = document.getElementById("volumeBar1");
    const volumeBar2 = document.getElementById("volumeBar2");
    const volumeBar3 = document.getElementById("volumeBar3");

    initVolume();

    settings?.addEventListener("click", renderSettings);
    volumeBar1?.addEventListener("mousedown", updateVolume1);
    volumeBar2?.addEventListener("mousedown", updateVolume2);
    volumeBar3?.addEventListener("mousedown", updateVolume3);

    state.events = new Map<Element | null, TypeEvent>([
        [settings, {type: "click", callback: renderSettings}],
        [volumeBar1, {type: "click", callback: updateVolume1}],
        [volumeBar2, {type: "click", callback: updateVolume2}],
        [volumeBar3, {type: "click", callback: updateVolume3}]
    ]);
    closeEvent();
}

function calculVolume(volumeValue:HTMLElement, dot: HTMLElement, pageX:number):number {
    let newValue = Math.round(((pageX - 700) / 576) * 100);
    if (newValue >= 100)
        newValue = 100;
    if (newValue <= 0)
        newValue = 0;
    dot.style.left = `${newValue}%`;
    volumeValue.textContent = `${newValue}%`;
    return newValue;
}

function updateVolume1(e: Event) {
    const dot1 = document.getElementById("dot1");
    const volumeValue1 = document.getElementById("volumeValue1");

    state.volume.general = calculVolume(volumeValue1!, dot1!, (e as MouseEvent).pageX);
}

function updateVolume2(e: Event) {
    const dot2 = document.getElementById("dot2");
    const volumeValue2 = document.getElementById("volumeValue2");

    state.volume.noises = calculVolume(volumeValue2!, dot2!, (e as MouseEvent).pageX);
}

function updateVolume3(e: Event) {
    const dot3 = document.getElementById("dot3");
    const volumeValue3 = document.getElementById("volumeValue3");

    state.volume.music = calculVolume(volumeValue3!, dot3!, (e as MouseEvent).pageX);
}

function initVolume() {
    const dot1 = document.getElementById("dot1");
    const dot2 = document.getElementById("dot2");
    const dot3 = document.getElementById("dot3");

    const volumeValue1 = document.getElementById("volumeValue1");
    const volumeValue2 = document.getElementById("volumeValue2");
    const volumeValue3 = document.getElementById("volumeValue3");

    dot1!.style.left = `${state.volume.general}%`;
    dot2!.style.left = `${state.volume.noises}%`;
    dot3!.style.left = `${state.volume.music}%`;
    volumeValue1!.textContent = `${state.volume.general} %`;
    volumeValue2!.textContent = `${state.volume.noises} %`;
    volumeValue3!.textContent = `${state.volume.music} %`;
}