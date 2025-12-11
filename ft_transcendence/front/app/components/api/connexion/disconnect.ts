import { state } from "../../../index.js";
import { requestAPI } from "../../utils/requestApi.js";

export function disconnect() {
    localStorage.removeItem("TokenTranscendence");
    requestAPI(`${state.link}/api/disconnect`, {
        method: "DELETE"
    });
    window.location.reload();
}
