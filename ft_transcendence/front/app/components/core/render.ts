import { destroyEvents } from "../utils/globalEvents.js";
import { PageInstance } from "../utils/interfaces.js";
import { pageRegistery } from "../utils/pageRegistery.js";
import { soundLaunch } from "../utils/sound.js";
import { state } from "../../index.js";
import { home, renderHome } from "../pages/home.js";
import { history as historyFunction } from "../pages/player/history.js";
import { stats } from "../pages/player/stats.js";
import { inSearch } from "../pages/game/inSearch.js";
import { quitQueue } from "../api/game/quitQueue.js";
import { vues } from "../../vues/vues.js";
import { connexion, renderConnexion } from "../pages/connexion/connexion.js";
import { resultsTournament } from "../pages/mode/3/tournament/results.js";
import { quitTournamentCallAPI } from "../api/game/quitTournamentCallAPI.js";

const root = document.querySelector(".root");

const displayManager: PageInstance[] = [];

export function render(newPage: PageInstance, fromPopState = false) {

    if (newPage.level < 0) {
        newPage = getBack();
    }

    if (newPage.create == home || newPage.create == connexion) {
        pushStateAction(newPage, state.index, true);
    } else if (!fromPopState) {
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
}

export function returnToHome() {
    displayManager.length = 0;
    state.index = 0;
    displayManager.push({
        content: vues.home,
        level: 0,
        create: home
    });
    history.pushState(null, "", "");
    history.replaceState(
        {
            index: 0,
            content: vues.home,
            level: 0,
            createName: home!.name
        },
        "",
        ""
    );
}

export function returnToConnexion() {
    displayManager.length = 0;
    state.index = 0;
    displayManager.push({
        content: vues.connexion.connexion,
        level: 0,
        create: connexion
    });
    history.pushState(null, "", "");
    history.replaceState(
        {
            index: 0,
            content: vues.connexion.connexion,
            level: 0,
            createName: connexion!.name
        },
        "",
        ""
    );
}

export function returnFromResults() {

}

function pushStateAction(page: PageInstance, index: number, basePage = false) {
    if (basePage) {
        if (page.create == home)
            returnToHome();
        else if (page.create == connexion)
            returnToConnexion();
    } else if (page.create == historyFunction || page.create == stats || page.create == resultsTournament) {
        return;
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

    if (displayManager[state.index]!.create == resultsTournament)
        return quitTournamentCallAPI();
    if (displayManager[state.index]!.create == inSearch)
        quitQueue();

    const { index, content, level, createName } = pageState;

    if (createName == connexion.name || displayManager[state.index]!.create == connexion)
        return renderConnexion();
    if (createName == home.name || displayManager[state.index]!.create == home) {
        if (state.actual == "game")
            state.stop = true;
        if (!localStorage.getItem("TokenTranscendence"))
            renderConnexion();
        return renderHome();
    }

    state.index = index;

    let restoredPage = displayManager[index];

    if (!restoredPage) {
        restoredPage = {
            content,
            level,
            create: pageRegistery[createName]!
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

    return { ...displayManager[indexDisplay]! };
}