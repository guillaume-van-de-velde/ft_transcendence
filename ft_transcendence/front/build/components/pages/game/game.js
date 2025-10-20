import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
export function rendergame() {
    const gamePage = {
        content: page.game.game,
        level: 1,
        create: game,
    };
    render(gamePage);
}
export function game() {
}
