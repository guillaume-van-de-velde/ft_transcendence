import { state } from "../../../index.js";
import { renderNotify } from "../../pages/messages/notify.js";
import { requestAPI } from "../../utils/requestApi.js";

export function eventDecline(e: Event) {
    const notifyElement = (e.target as HTMLElement).parentElement;
    const notifyElementClass = parseInt(notifyElement!.classList[0]!.match(/\d+/)![0], 10);
    state.messages.notify = state.messages.notify?.filter(notify => notify.id != notifyElementClass)!;

    requestAPI(`${state.link}/api/profile/notify/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idNotify: notifyElementClass
        })
    });
    renderNotify();
}