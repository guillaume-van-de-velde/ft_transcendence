import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { PageInstance } from "../../utils/interfaces.js";

export function rendergame() {
    const gamePage: PageInstance = {
        content: page.game.game,
        level: 1,
        create: game,
    }
    render(gamePage);
}

export function game() {

}
