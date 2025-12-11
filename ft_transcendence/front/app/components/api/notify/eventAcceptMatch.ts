import { state } from "../../../index.js";
import { renderNotify } from "../../pages/messages/notify.js";
import { requestAPI } from "../../utils/requestApi.js";

export function eventAcceptMatch(e: Event) {
    let notifyElement = (e.target as HTMLElement).parentElement;
    if (notifyElement!.classList[0]! == "accept")
        notifyElement = notifyElement?.parentElement!;
    const notifyElementClass = parseInt(notifyElement!.classList[0]!.match(/\d+/)![0], 10);
    state.messages.notify = state.messages.notify?.filter(notify => notify.id != notifyElementClass)!;

    requestAPI(`${state.link}/api/game/accept`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idNotify: notifyElementClass
        })
    });
    renderNotify();
}