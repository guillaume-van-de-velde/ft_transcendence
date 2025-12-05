import { state } from "../../../../index.js";
import { vues } from "../../../../vues/vues.js";
import { render } from "../../../core/render.js";
import { pictureCallAPI } from "../../../utils/api.js";
import { close2Event } from "../../../utils/globalEvents.js";
import { PageInstance } from "../../../utils/interfaces.js";

export function renderPicture() {
    const picturePage: PageInstance = {
        content: vues.profile.picture.picture,
        level: 2,
        create: picture
    }
    render(picturePage);
}

export function picture() {
    const form = document.getElementById("formPicture");

    form?.addEventListener("submit", pictureCallAPI);

    state.events.set(form, {type: "submit", callback: pictureCallAPI});

    close2Event();
}
