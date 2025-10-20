import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state } from "../../core/state.js";
import { renderHome } from "../home.js";
export function renderInSearch() {
    const inSearchPage = {
        content: page.game.insearch,
        level: 0,
        create: inSearch,
    };
    render(inSearchPage);
}
export function inSearch() {
    const quit = document.getElementById("quit");
    quit?.addEventListener("click", renderHome);
    state.events = new Map([
        [quit, { type: "click", callback: renderHome }],
    ]);
}
