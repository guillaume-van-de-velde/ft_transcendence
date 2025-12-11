import { state } from "../../../index.js";
import { Notify } from "../../core/state.js";
import { eventAcceptFriend } from "./eventAcceptFriend.js";
import { eventAcceptMatch } from "./eventAcceptMatch.js";
import { eventDecline } from "./eventDecline.js";

export function notifyCallAPI() {
    if (!state.messages.notify || !state.messages.notify[0]) {
        return;
    }
    for (const notify of state.messages.notify) {
        const notifyElement = document.querySelector(`.userNotify${notify.id}`);
        const accept = notifyElement?.querySelector(".accept");
        const decline = notifyElement?.querySelector(".decline");

        if (notify.type === Notify.ASK) {
            accept?.addEventListener("click", eventAcceptFriend);
            state.events.set(accept!, { type: "click", callback: eventAcceptFriend });
        }
        if (notify.type === Notify.MATCH) {
            accept?.addEventListener("click", eventAcceptMatch);
            state.events.set(accept!, { type: "click", callback: eventAcceptMatch });
        }

        decline?.addEventListener("click", eventDecline);
        state.events.set(decline!, { type: "click", callback: eventDecline });
    }
}