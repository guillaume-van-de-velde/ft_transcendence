import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { quitQueue } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderHome } from "../home.js";

export function renderInSearch() {
    const inSearchPage: PageInstance = {
        content: page.game.insearch,
        level: 0,
        create: inSearch,
    }
    render(inSearchPage);
}

export function inSearch() {
    const quit = document.getElementById("quit");

    quit?.addEventListener("click", quitQueue);

    state.events = new Map<Element | null, TypeEvent>([
        [quit, {type: "click", callback: quitQueue}]
    ]);
}
