import { state } from "../../../index.js";
import { pictureAPI } from "./pictureAPI.js";

export function profileAPI() {
    const picture = document.getElementById("picture");
    const pseudo = document.getElementById("pseudo");

    pictureAPI(picture, "w-full h-full rounded-full mx-auto", state.profile.picture);
    pseudo!.textContent = state.account.pseudo;
}