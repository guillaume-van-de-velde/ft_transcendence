import { destroyEvents } from "../utils/globalEvents.js";
import { pageRegistery } from "../utils/pageRegistery.js";
import { soundLaunch } from "../utils/sound.js";
import { state } from "./state.js";
const root = document.querySelector(".root");
const displayManager = [];
export function render(newPage, fromPopState = false) {
    if (newPage.level < 0) {
        newPage = getBack();
    }
    if (newPage.level === 0) {
        displayManager.length = 0;
        state.index = 0;
        displayManager.push(newPage);
        pushStateAction(newPage, state.index, true);
    }
    if (!fromPopState && newPage.level) {
        displayManager.push(newPage);
        state.index = displayManager.length - 1;
        pushStateAction(newPage, state.index);
    }
    const currentIndex = state.index;
    const activePage = displayManager[currentIndex];
    const elementParent = activePage.level == 0 ? root : document.querySelector(".app");
    const newElement = document.createElement("div");
    destroyEvents();
    state.events.clear();
    if (currentIndex > 0 && displayManager[currentIndex].level == displayManager[currentIndex - 1].level) {
        let oldElement = document.querySelector(`.level${displayManager[currentIndex - 1].level}`);
        if (oldElement)
            oldElement.remove();
    }
    if (activePage.level) {
        newElement.classList.add(`level${activePage.level}`);
        newElement.innerHTML = activePage.content;
        const oldLevels = document.querySelectorAll(`[class*="level"]`);
        oldLevels.forEach(el => {
            const levelMatch = el.className.match(/level(\d+)/);
            if (levelMatch && Number(levelMatch[1]) >= activePage.level) {
                el.remove();
            }
        });
        elementParent.appendChild(newElement);
    }
    else
        elementParent.innerHTML = activePage.content;
    activePage.create();
    soundLaunch();
}
function pushStateAction(page, index, home = false) {
    if (home) {
        history.pushState(null, "", "");
        history.replaceState({
            index: 0,
            content: page.content,
            level: page.level,
            createName: page.create?.name,
        }, "", "");
    }
    else {
        history.pushState({
            index,
            content: page.content,
            level: page.level,
            createName: page.create?.name
        }, "", "");
    }
}
window.addEventListener("popstate", e => {
    const pageState = e.state;
    if (!pageState)
        return;
    const { index, content, level, createName } = pageState;
    const direction = index > state.index ? "forward" : "backward";
    state.index = index;
    let restoredPage = displayManager[index];
    if (!restoredPage) {
        restoredPage = {
            content,
            level,
            create: pageRegistery[createName],
        };
        displayManager[index] = restoredPage;
    }
    render(restoredPage, true);
});
function getBack() {
    let indexDisplay = state.index;
    const actualLevel = displayManager[indexDisplay].level;
    const previousLevel = actualLevel - 1;
    while (indexDisplay >= 0 && displayManager[indexDisplay].level != previousLevel) {
        indexDisplay--;
    }
    return { ...displayManager[indexDisplay] };
}
function printDisplayManager() {
    console.log("\n");
    for (let i = 0; displayManager[i]; i++) {
        console.log(`[${i}]\n\n` + displayManager[i].create?.name);
    }
    console.log("\n");
}
function printStateEvent() {
    console.log("\n");
    for (const [element, eventType] of state.events) {
        console.log(element?.id, "->", eventType.type);
    }
}
