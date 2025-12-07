import { link, state } from "../../index.js";
import { Link, Notify } from "../core/state.js";
import { renderPrivateMessage } from "../pages/messages/private.js";
import { requestAPI } from "./requestApi.js";





function blockPlayer() {
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const blockPlayerBtn = document.getElementById("blockPlayerBtn");

    addPlayerBtn?.removeEventListener("click", sendPlayer);
    blockPlayerBtn?.removeEventListener("click", blockPlayer);

    requestAPI(`${link}/api/profile/blocked/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            blocked: state.playerData!.user.id
        })
    });

    if (state.profile.blocked && !state.profile.blocked![0])
        state.profile.blocked![0] = state.playerData?.user!;
    else
        state.profile.blocked?.push(state.playerData?.user!);

    linkBlocked();
}

function sendPlayer() {
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const blockPlayerBtn = document.getElementById("blockPlayerBtn");

    addPlayerBtn?.removeEventListener("click", sendPlayer);
    blockPlayerBtn?.removeEventListener("click", blockPlayer);

    requestAPI(`${link}/api/profile/notify/put`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            notify: {
                for: state.playerData!.user.id,
                type: Notify.ASK
            }
        })
    });

    linkSent();
}

export function linkNone() {

    state.playerData!.link = Link.NONE;

    const statusPlayer = document.getElementById("statusPlayer");
    const addPlayerBtn = document.createElement("button");
    const blockPlayerBtn = document.createElement("button");

    while (statusPlayer!.firstChild) {
        statusPlayer!.removeChild(statusPlayer!.firstChild);
    }

    addPlayerBtn.id = "addPlayerBtn";
    addPlayerBtn.className = "p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300";

    blockPlayerBtn.id = "blockPlayerBtn";
    blockPlayerBtn.className = "p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300";

    addPlayerBtn.textContent = "ADD +";
    blockPlayerBtn.textContent = "🚫";

    statusPlayer?.appendChild(addPlayerBtn);
    statusPlayer?.appendChild(blockPlayerBtn);

    addPlayerBtn.addEventListener("click", sendPlayer);
    blockPlayerBtn.addEventListener("click", blockPlayer);

    state.events.set(addPlayerBtn, {type: "click", callback: sendPlayer});
    state.events.set(blockPlayerBtn, {type: "click", callback: blockPlayer});
}









function unblockPlayer() {
    const unblockPlayerBtn = document.getElementById("unblockPlayerBtn");

    unblockPlayerBtn?.removeEventListener("click", unblockPlayer);

    requestAPI(`${link}/api/profile/blocked/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            blocked: state.playerData!.user.id
        })
    });

    if (state.profile.blocked && state.profile.blocked[0])
        state.profile.blocked = state.profile.blocked?.filter(user => user.id != state.playerData?.user.id)!;

    linkNone();
}

export function linkBlocked() {

    state.playerData!.link = Link.BLOCKED;

    const statusPlayer = document.getElementById("statusPlayer");

    while (statusPlayer!.firstChild) {
        statusPlayer!.removeChild(statusPlayer!.firstChild);
    }

    const unblockPlayerBtn = document.createElement("button");

    unblockPlayerBtn.id = "unblockedPlayerBtn";
    unblockPlayerBtn.className = "p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300";

    unblockPlayerBtn.textContent = "UNBLOCK";

    statusPlayer?.appendChild(unblockPlayerBtn);

    unblockPlayerBtn.addEventListener("click", unblockPlayer);

    state.events.set(unblockPlayerBtn, {type: "click", callback: unblockPlayer});
}










function removeFriendRequest() {
    const sentPlayerBtn = document.createElement("button");

    sentPlayerBtn?.removeEventListener("click", removeFriendRequest);

    requestAPI(`${link}/api/profile/notify/takeoff`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            for: state.playerData!.user.id,
        })
    });

    linkNone();
}

export function linkSent() {

    state.playerData!.link = Link.SENT;

    const statusPlayer = document.getElementById("statusPlayer");
    const sentPlayerBtn = document.createElement("button");

    while (statusPlayer!.firstChild) {
        statusPlayer!.removeChild(statusPlayer!.firstChild);
    }

    sentPlayerBtn.id = "sentPlayerBtn";
    sentPlayerBtn.className = "p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300";

    sentPlayerBtn.textContent = "TAKE OFF";

    statusPlayer?.appendChild(sentPlayerBtn);

    sentPlayerBtn.addEventListener("click", removeFriendRequest);

    state.events.set(sentPlayerBtn, {type: "click", callback: removeFriendRequest});
}








function removeFriend() {
    const removeFriendBtn = document.getElementById("removeFriendBtn");
    const chatFriendBtn = document.getElementById("chatFriendBtn");

    removeFriendBtn?.removeEventListener("click", removeFriend);
    chatFriendBtn?.removeEventListener("click", chatFriend);

    requestAPI(`${link}/api/profile/friends/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            friend: state.playerData!.user.id
        })
    });

    state.profile.friends = state.profile.friends?.filter(friend => friend.id != state.playerData?.user.id)!;
    state.messages.private = state.messages.private?.filter(chat => chat.user.id != state.playerData?.user.id)!;
    state.friend = 0;

    linkNone();
}

function chatFriend() {
    const removeFriendBtn = document.getElementById("removeFriendBtn");
    const chatFriendBtn = document.getElementById("chatFriendBtn");

    removeFriendBtn?.removeEventListener("click", removeFriend);
    chatFriendBtn?.removeEventListener("click", chatFriend);

    state.messages.private?.unshift({
        user: state.playerData!.user!,
        chat: [],
        seen: true
    });

    renderPrivateMessage();
}

export function linkFriend() {

    state.playerData!.link = Link.FRIEND;

    const statusPlayer = document.getElementById("statusPlayer");
    const removeFriendBtn = document.createElement("button");
    const chatFriendBtn = document.createElement("button");

    while (statusPlayer!.firstChild) {
        statusPlayer!.removeChild(statusPlayer!.firstChild);
    }

    removeFriendBtn.id = "removeFriendBtn";
    removeFriendBtn.className = "p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300";

    chatFriendBtn.id = "chatFriendBtn";
    chatFriendBtn.className = "p-5 cursor-pointer bg-home-bg rounded-full text-2xl hover:text-black hover:bg-button-white-bg duration-300";

    removeFriendBtn.textContent = "REMOVE";
    chatFriendBtn.textContent = "💬";

    statusPlayer?.appendChild(chatFriendBtn);
    statusPlayer?.appendChild(removeFriendBtn);

    removeFriendBtn.addEventListener("click", removeFriend);
    chatFriendBtn.addEventListener("click", chatFriend);

    state.events.set(removeFriendBtn, {type: "click", callback: removeFriend});
    state.events.set(chatFriendBtn, {type: "click", callback: chatFriend});
}





export function playerLink() {
    switch (state.playerData!.link) {
        case Link.NONE :
            linkNone();
            break ;
        case Link.FRIEND :
            linkFriend();
            break ;
        case Link.SENT :
            linkSent();
            break ;
        case Link.BLOCKED :
            linkBlocked();
            break ;
        default :
            break ;
    }
}