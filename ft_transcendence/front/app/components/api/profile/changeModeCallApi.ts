import { state } from "../../../index.js";
import { requestAPI } from "../../utils/requestApi.js";

export function changeModeCallApi() {
    const newMode = state.mode[0].toUpperCase() + state.mode[1].toUpperCase() + state.mode[2].toUpperCase();

    requestAPI(`${state.link}/api/mode`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mode: newMode
        })
    })
}