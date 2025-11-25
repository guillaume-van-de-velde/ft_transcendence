import { state } from "../../index.js";
import { render } from "../core/render.js";
import { privateMessage, renderPrivateMessage } from "../pages/messages/private.js";
import { renderClassic } from "../pages/mode/1/classic.js";
import { renderMusic } from "../pages/mode/1/music.js";
import { renderAi } from "../pages/mode/2/ai.js";
import { renderLocal } from "../pages/mode/2/local.js";
import { renderOnline } from "../pages/mode/2/online.js";
import { renderMatch } from "../pages/mode/3/match.js";
import { renderTournament } from "../pages/mode/3/tournament.js";
import { renderResultsTournament } from "../pages/mode/3/tournament/results.js";
import { renderStats } from "../pages/player/stats.js";
import { PageInstance } from "./interfaces.js";

export function closeClicked() {
    const closePage: PageInstance = {
        content: "",
        level: -1,
        create: null,
    }
    render(closePage);
}

export function close2Event() {
    const close = document.getElementById("close2");
    close?.addEventListener("click", closeClicked);
    state.events.set(close, {type: "click", callback: closeClicked});
}

export function closeEvent() {
    const close = document.getElementById("close");
    close?.addEventListener("click", closeClicked);
    state.events.set(close, {type: "click", callback: closeClicked});
}

export function destroyEvents() {
    state.events.forEach(({type, callback}, element) => {
        element?.removeEventListener(type, callback);
    })
}

export function chooseModeFunctionRender(element1:Element, element2:Element, element3:Element) {
    
    element1.querySelector("p")!.textContent = state.mode[0].toUpperCase();
    element2.querySelector("p")!.textContent = state.mode[1].toUpperCase();
    element3.querySelector("p")!.textContent = state.mode[2].toUpperCase();

    const functionTournament = state.tournament?.id ? renderResultsTournament : renderTournament;

    switch(state.mode[0]) {
        case "c" :
            element1.addEventListener("click", renderClassic);
            state.events.set(element1, {type: "click", callback:renderClassic});
            break;
        case "m" :
            element1.addEventListener("click", renderMusic);
            state.events.set(element1, {type: "click", callback:renderMusic});
            break;
    }

    switch(state.mode[1]) {
        case "o" :
            element2.addEventListener("click", renderOnline);
            state.events.set(element2, {type: "click", callback:renderOnline});
            break;
        case "l" :
            element2.addEventListener("click", renderLocal);
            state.events.set(element2, {type: "click", callback:renderLocal});
            break;
        case "a" :
            element2.addEventListener("click", renderAi);
            state.events.set(element2, {type: "click", callback:renderAi});
            break;
    }

    switch(state.mode[2]) {
        case "m" :
            element3.addEventListener("click", renderMatch);
            state.events.set(element3, {type: "click", callback:renderMatch});
            break;
        case "t" :
            element3.addEventListener("click", functionTournament);
            state.events.set(element3, {type: "click", callback:functionTournament});
            break;
    }
}

export function renderPlayer() {
    const players = document.getElementsByClassName("player");
    const playersArray = Array.from(players);

    playersArray.forEach(player => {
        player?.addEventListener("click", renderStats);
        state.events.set(player, {type: "click", callback: renderStats});
    })
}

export function privateMessageFocus(e: Event) {
    let target = e.target as HTMLElement;

    while (target && !target.classList.contains("friendMessage")) {
        target = target.parentElement as HTMLElement;
    }

    const match = target.classList[0]!.match(/\d+/);
    if (match) {
        state.friend = parseInt(match![0], 10);
    }
    renderPrivateMessage();
}

export function renderPlayerMessages() {
    const players = document.getElementsByClassName("friendMessage");
    const playersArray = Array.from(players);

    playersArray.forEach((player, index) => {
        if (index != state.friend) {
            player?.addEventListener("click", privateMessageFocus);
            state.events.set(player, {type: "click", callback: privateMessageFocus});
        }
    })
}

export function renderPlayer2() {
    const players = document.getElementsByClassName("player2");
    const playersArray = Array.from(players);

    playersArray.forEach(player => {
        player?.addEventListener("click", renderStats);
        state.events.set(player, {type: "click", callback: renderStats});
    })
}