import { page } from "../../../../pages/index.js";
import { render } from "../../../core/render.js";
import { IDPLAYER, state, TypeEvent } from "../../../core/state.js";
import { closeEvent } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";
import { renderKey } from "../key.js";
import { renderSettings } from "../settings.js";

export function renderPlayer(e: Event) {
    if ((e.target as HTMLElement).id == "player1")
        state.key.active = IDPLAYER.PLAYER1;
    else
        state.key.active = IDPLAYER.PLAYER2;
    const playerPage: PageInstance = {
        content: page.settings.key.action.player,
        level: 1,
        create: player,
    }
    render(playerPage);
}

export function player() {
    const settings = document.getElementById("settingsAction");
    const key = document.getElementById("key");
    const keyName1 = document.getElementById("keyName1");
    const keyName2 = document.getElementById("keyName2");

    initPlayer();
    settings?.addEventListener("click", renderSettings);
    key?.addEventListener("click", renderKey);
    keyName1?.addEventListener("mouseover", overKey1);
    keyName2?.addEventListener("mouseover", overKey2);

    state.events = new Map<Element | null, TypeEvent>([
        [settings, {type: "click", callback: renderSettings}],
        [key, {type: "click", callback: renderKey}],
        [keyName1, {type: "mouseover", callback: (changeKey1 as EventListener)}],
        [keyName2, {type: "mouseover", callback: (changeKey2 as EventListener)}]
    ]);
    closeEvent();
}

function initPlayer() {
    const idPlayer = document.getElementById("idPlayer");
    const key1 = document.getElementById("keyName1");
    const key2 = document.getElementById("keyName2");

    if (state.key.active == IDPLAYER.PLAYER1) {
        idPlayer!.textContent = " > PLAYER 1";
        key1!.textContent = state.key.player1.up![0]!;
        key2!.textContent = state.key.player1.down![0]!;
    }
    else {
        idPlayer!.textContent = " > PLAYER 2";
        key1!.textContent = state.key.player2.up![0]!;
        key2!.textContent = state.key.player2.down![0]!;
    }
}

function overKey1() {
    const key = document.getElementById("keyName1");

    key?.addEventListener("keydown", changeKey1);
}

function overKey2() {
    const key = document.getElementById("keyName2");

    key?.addEventListener("keydown", changeKey2);
}

function changeKey1(e: KeyboardEvent) {
    const key = document.getElementById("keyName1");

    if (checkKeys(e.key)) {
        key!.textContent = `${e.key[0]}`;
        if (state.key.active == IDPLAYER.PLAYER1)
            state.key.player1.up = e.key;
        else
            state.key.player2.up = e.key;
    }
}

function changeKey2(e: KeyboardEvent) {
    const key = document.getElementById("keyName2");

    if (checkKeys(e.key)) {
        key!.textContent = `${e.key[0]}`;
        if (state.key.active == IDPLAYER.PLAYER1)
            state.key.player1.down = e.key;
        else
            state.key.player2.down = e.key;
    }
}

function checkKeys(key:string):boolean {
    switch (key) {
        case state.key.player1.up:
        case state.key.player1.down:
        case state.key.player2.up:
        case state.key.player2.down:
            return false;
    }
    return true;
}