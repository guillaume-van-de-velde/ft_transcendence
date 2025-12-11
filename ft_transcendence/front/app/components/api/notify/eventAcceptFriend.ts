import { state } from "../../../index.js";
import { renderNotify } from "../../pages/messages/notify.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function eventAcceptFriend(e: Event) {
    let notifyElement = (e.target as HTMLElement).parentElement;
    if (notifyElement!.classList[0]! == "accept")
        notifyElement = notifyElement?.parentElement!;
    const notifyElementClass = parseInt(notifyElement!.classList[0]!.match(/\d+/)![0], 10);
    state.messages.notify = state.messages.notify?.filter(notify => notify.id != notifyElementClass)!;

    const newFriend = await requestAPI(`${state.link}/api/profile/friends/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idNotify: notifyElementClass
        })
    });

    if (state.profile.friends && !state.profile.friends[0])
        state.profile.friends[0] = newFriend;
    else
        state.profile.friends?.push(newFriend);

    renderNotify();
}