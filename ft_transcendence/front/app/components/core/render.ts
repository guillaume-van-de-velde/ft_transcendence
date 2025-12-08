import { closeClicked, destroyEvents } from "../utils/globalEvents.js";
import { stringToHTMLElement } from "../utils/htmlTools.js";
import { PageInstance } from "../utils/interfaces.js";
import { pageRegistery } from "../utils/pageRegistery.js";
import { soundLaunch } from "../utils/sound.js";
import { state } from "../../index.js";
import { home } from "../pages/home.js";
import { history as historyFunction } from "../pages/player/history.js";
import { stats } from "../pages/player/stats.js";

const root = document.querySelector(".root");

const displayManager: PageInstance[] = [];

export function render(newPage:PageInstance, fromPopState = false) {

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
    const elementParent = activePage!.level == 0 ? root : document.querySelector(".app");
    const newElement = document.createElement("div");

    destroyEvents();
    state.events.clear();
    root!.classList.remove("pointer-events-none");
    const pointerAllowed = document.querySelectorAll(".pointer-events-auto");
    pointerAllowed.forEach(el => el.classList.remove("pointer-events-auto"));
    
    if (currentIndex > 0 && displayManager[currentIndex]!.level == displayManager[currentIndex - 1]!.level) {
        let oldElement = document.querySelector(`.level${displayManager[currentIndex - 1]!.level}`);
        if (oldElement)
            oldElement.remove();
    }
    if (activePage!.level) {
        newElement.className = `level${activePage!.level} flex flex-col flex-grow min-h-0 pointer-events-auto`;
        newElement!.innerHTML = activePage!.content;
        const oldLevels = document.querySelectorAll(`[class*="level"]`);
        oldLevels.forEach(el => {
            const levelMatch = el.className.match(/level(\d+)/);
            if (levelMatch && Number(levelMatch[1]) >= activePage!.level) {
                el.remove();
            }
        });
        root?.classList.add("pointer-events-none");
        elementParent!.appendChild(newElement);
    }
    else
        elementParent!.innerHTML = activePage!.content;
    if (newPage.level < 2)
        delete state.playerData;
    if (state.interval)
        clearInterval(state.interval);
    state.actual = "none";
    activePage!.create!();
    soundLaunch();
    // printDisplayManager();
    // printStateEvent();
}

function pushStateAction(page: PageInstance, index: number, level0 = false) {
    if (level0) {
        history.replaceState(
            {
                index: 0,
                content: page.content,
                level: page.level,
                createName: page.create?.name,
            },
            "",
            ""
        );
    } else if (page.create == historyFunction || page.create == stats) {
        return ;
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

    if (!pageState) return;

    const { index, content, level, createName } = pageState;
    state.index = index;

    let restoredPage = displayManager[index];

    if (!restoredPage) {
        restoredPage = {
            content,
            level,
            create: pageRegistery[createName]!,
        };
        displayManager[index] = restoredPage;
    }

    render(restoredPage, true);
});

function getBack(): PageInstance {
    let indexDisplay = state.index;
    const actualLevel = displayManager[indexDisplay]!.level;
    const previousLevel = actualLevel - 1;

    while (indexDisplay >= 0 && displayManager[indexDisplay]!.level != previousLevel) {
        indexDisplay--;
    }

    return { ...displayManager[indexDisplay]!};
}

function printDisplayManager() {
    console.log("\n");
    for (let i = 0; displayManager[i]; i++) {
        console.log(`[${i}]\n\n` + displayManager![i]!.create?.name);
    }
    console.log("\n");
}

function printStateEvent() {
    console.log("\n");
    for (const [element, eventType] of state.events) {
        console.log(element?.id, "->", eventType.type);
    }
}