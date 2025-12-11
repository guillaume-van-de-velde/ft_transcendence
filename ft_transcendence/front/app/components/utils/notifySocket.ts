import { state } from "../../index.js";

export function checkSeen() {
    let flag = false;
    for (const friends of state.messages.private!) {
        if (friends.seen == false) {
            flag = true;
            state.socket.message = true;
            break;
        }
    }
    if (flag == false)
        state.socket.message = false;
    flag = false;
    for (const notify of state.messages.notify!) {
        if (notify.seen == false) {
            flag = true;
            state.socket.notify = true;
            break;
        }
    }
    if (flag == false)
        state.socket.notify = false;

    if (state.socket.message) {
        const messageSeen = document.createElement("span");
        messageSeen.className = "h-[20px] w-[20px] bg-red-600 absolute translate-x-1/2 right-5 rounded-full";
        const privateCategory = document.getElementById("private");

        privateCategory?.appendChild(messageSeen);
    }
    if (state.socket.notify) {
        const notifySeen = document.createElement("span");
        notifySeen.className = "h-[20px] w-[20px] bg-red-600 absolute translate-x-1/2 right-5 rounded-full";
        const notifyCategory = document.getElementById("notify");

        notifyCategory?.appendChild(notifySeen);
    }
    if (state.socket.message || state.socket.notify) {
        const messageHomeSeen = document.createElement("span");
        messageHomeSeen.className = "h-[20px] w-[20px] bg-red-600 absolute -translate-x-10  rounded-full";
        const notifyCategory = document.getElementById("messageHome");

        notifyCategory?.appendChild(messageHomeSeen);
    }
}