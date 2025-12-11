import { state } from "../../../index.js";
import { renderStatsUser } from "../../pages/profile/statsUser.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function pictureCallAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.inputPicture) {
        requestAPI(`${state.link}/api/profile/picture`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                picture: data.inputPicture.toString()
            })
        });
        state.profile.picture = data.inputPicture.toString();
    }
    renderStatsUser();
}