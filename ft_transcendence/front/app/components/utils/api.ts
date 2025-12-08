import { initState, link, removeToken, setToken, socket, state, token, userConnexionAccepted } from "../../index.js";
import { setVues } from "../../vues/vues.js";
import { render } from "../core/render.js";
import { Notify, StatusTournament } from "../core/state.js";
import { renderLogIn } from "../pages/connexion/logIn.js";
import { renderSignIn } from "../pages/connexion/signIn.js";
import { renderVerify } from "../pages/connexion/verify.js";
import { renderGame } from "../pages/game/game.js";
import { renderInSearch } from "../pages/game/inSearch.js";
import { renderHome } from "../pages/home.js";
import { renderNotify } from "../pages/messages/notify.js";
import { renderTournament, tournament } from "../pages/mode/3/tournament.js";
import { renderCreateTournament } from "../pages/mode/3/tournament/create.js";
import { renderJoinTournament } from "../pages/mode/3/tournament/join.js";
import { renderResultsTournament } from "../pages/mode/3/tournament/results.js";
import { renderStatsUser } from "../pages/profile/statsUser.js";
import { renderEmail } from "../pages/settings/account/email.js";
import { renderPassword } from "../pages/settings/account/password.js";
import { renderPseudo } from "../pages/settings/account/pseudo.js";
import { renderVerifyEmail } from "../pages/settings/account/verify.js";
import { renderVerifyDelete } from "../pages/settings/account/verifyDelete.js";
import { emailValid, passwordValid, pseudoValid } from "./formValidity.js";
import { renderPlayer } from "./globalEvents.js";
import { playerLink } from "./link.js";
import { requestAPI } from "./requestApi.js";

export async function connexionAPI(url:string, requestConfig:RequestInit):Promise<any> {
    try {
        const response = await fetch(url, requestConfig);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la requete: ", error)
    }
}

export function pictureAPI(element: HTMLElement | null, classOptions: string, src: string) {
    const img = document.createElement("img");
    img.className = classOptions;
    img.src = src;
    element?.replaceChildren(img);
}

export function profileAPI() {
    const picture = document.getElementById("picture");
    const pseudo = document.getElementById("pseudo");

    pictureAPI(picture, "w-full h-full rounded-full mx-auto", state.profile.picture);
    pseudo!.textContent = state.account.pseudo;
}

export function historyAPI(element: HTMLElement | null) {

    if (!state.profile.history![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl";
        p.textContent = "NO HISTORY";
        element?.appendChild(p);
        return ;
    }

    for (const match of state.profile.history!) {
        const div = document.createElement("div");
        const colorBg = match.userPoints > match.ennemyPoints ? "bg-green-700" : match.userPoints < match.ennemyPoints ? "bg-red-700" : "bg-gray-500";
        const classOptions = `grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full ${colorBg} py-2 px-8 rounded-full border-4 border-black`;

        div.className = classOptions;
        div.innerHTML = `
            <div class="score flex justify-center items-center">
                <p>${match.userPoints} - ${match.ennemyPoints}</p>
            </div>
            <div class="ennemy flex justify-center items-center">
                <div class="flex justify-between items-center w-4/5">
                    <div class="">
                        <button data-id="${match.ennemy.id}" class="player cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                            <img class="w-full h-full rounded-full mx-auto" src="${match.ennemy.picture}">
                        </button>
                    </div>
                    <h1 class="tracking-widest">
                        ${match.ennemy.pseudo}
                    </h1>
                </div>
            </div>
            <div class="mode flex justify-center items-center">
                <p>${match.mode}</p>
            </div>
            <div class="date text-sm flex justify-center items-center">
                <p>${match.date} ${match.hour}</p>
            </div>
        `;
        element?.appendChild(div);
    }

}

export function friendsAPI(element: HTMLElement | null) {

    if (!state.profile.friends![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("no")} ${i18next.t("friends")}`;
        element?.appendChild(p);
        return ;
    }

    for (const friend of state.profile.friends!) {
        const div = document.createElement("div");
        const classOptions = `basis-1/3 bg-player-display-bg flex justify-left items-center h-[75px] w-[300px] rounded-2xl border-3 border-black`;

        div.className = classOptions;
        div.innerHTML = `
            <div class="h-[75px] w-[100px] flex justify-center items-center">
                <span data-id="${friend.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    <img class="w-full h-full rounded-full mx-auto" src="${friend.picture}">
                </span>
            </div>
            <div class="flex justify-center items-center">
                <p class="font-julee tracking-widest text-2xl">
                    ${friend.pseudo}
                </p>
            </div>
        `;
        element?.appendChild(div);
    }

}

export function privateMessagesAPI(element: HTMLElement | null) {

    console.log("coucou1", state.messages.private![0], "coucou2");
    if (!state.messages.private![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("no")} ${i18next.t("friends")}`;
        element?.appendChild(p);
        return ;
    }
    
    for (const [index, friend] of state.messages.private!.entries()) {
        const btn = document.createElement("button");
        const focus = index == state.friend ? "bg-form-bg" : "bg-player-display-bg";
        const seen = friend.seen ? "" : "<span class=\"h-[20px] w-[20px] bg-red-600 absolute translate-x-1/2 right-5 rounded-full\"></span>"
        const classOptions = `friend${index} friendMessage ${focus} relative flex justify-left items-center h-[75px] w-[300px] rounded-2xl border-3 border-black cursor-pointer`;

        btn.className = classOptions;
        btn.innerHTML = `
            <div class="h-[75px] w-[100px] flex justify-center items-center">
                <span data-id="${friend.user.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    <img class="w-full h-full rounded-full mx-auto" src="${friend.user.picture}">
                </span>
            </div>
            <div class="flex justify-center items-center">
                <p class="font-julee tracking-widest text-2xl">
                    ${friend.user.pseudo}
                </p>
            </div>
            ${seen}
        `;
        element?.appendChild(btn);
    }
}

export function messagerieAPI(element: HTMLElement | null) {

    if (!state.messages.private || !state.messages.private![0]) {
        return ;
    }

    if (!state.messages.private![state.friend]) {
        state.friend = 0;
        return ;
    }

    const chat = state.messages.private![state.friend]!.chat;
    for (let i = chat.length - 1; i >= 0; i--) {
        const message = chat[i]!;
        const div = document.createElement("div");
        const classOptions = message.isUser ? "usermessage" : "notusermessage";
        const p = document.createElement("p");

        p.textContent = message.message;
        div.className = classOptions;
        div.appendChild(p);
        element?.appendChild(div);
    }
    socket.emit("seen", state.messages.private[state.friend]!.user.id);
}

export function globalAPI(element: HTMLElement | null) {

    if (!state.messages.global || !state.messages.global![0]) {
        return ;
    }

    const blocked = state.profile.blocked;
    let chat = state.messages.global;

    if (blocked && blocked[0]) {
        for (const user of blocked!) {
            chat = chat.filter(message => message.user.id != user.id);
        }
    }

    for (let i = chat!.length - 1; i >= 0; i--) {
        const message = chat[i]!;

        const div = document.createElement("div");
        const classOptions = message.user.id === state.id ? "usermessage" : "notusermessage";
        const p = document.createElement("p");
        const pseudo = document.createElement("div");

        pseudo.textContent = message.user.pseudo;
        pseudo.className = "pseudo player cursor-pointer";
        pseudo.dataset.id = `${message.user.id}`;
        p.textContent = message.message;
        div.className = classOptions;
        div.appendChild(pseudo);
        div.appendChild(p);
        element?.appendChild(div);
    }
}

export function notifyAPI(element: HTMLElement | null) {
    if (!state.messages.notify || !state.messages.notify![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("no")} ${i18next.t("notify")}`;
        element?.appendChild(p);
        return ;
    }

    let notifyList = state.messages.notify;
    const blocked = state.profile.blocked;

    if (blocked && blocked[0])
        for (const user of blocked!)
            notifyList = notifyList.filter(notify => notify.user.id != user.id);

    if (!notifyList || !notifyList![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `${i18next.t("no")} ${i18next.t("notify")}`;
        element?.appendChild(p);
        return ;
    }

    for (let i = notifyList!.length - 1; i >= 0; i--) {
        const notify = notifyList[i]!;
        const div = document.createElement("div");
        const type = notify.type === Notify.ASK ? "WANT TO BE YOUR FRIEND" : "WANTS TO FIGHT YOU";
        const classOptions = `userNotify${notify.id} flex w-7/10 justify-around items-center mx-auto`;

        div.className = classOptions;
        div.innerHTML = `
        <div class="bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black">
            <div class="h-[75px] w-[100px] flex justify-center items-center">
                <span data-id="${notify.user.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                    <img class="w-full h-full rounded-full mx-auto" src="${notify.user.picture}">
                </span>
            </div>
            <div class="flex justify-center items-center">
                <p class="font-julee tracking-widest text-2xl">
                    ${notify.user.pseudo}
                </p>
            </div>
        </div>
        <h2 class="text-4xl w-[50%]">${type}</h2>
        <button class="accept text-2xl h-[60px] w-[60px] mr-2 bg-green-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
            <i class="fa-solid fa-check"></i>
        </button>
        <button class="decline text-2xl h-[60px] w-[60px] bg-red-600 rounded-full cursor-pointer text-gray-500 hover:text-white">
            X
        </button>`;
        element?.appendChild(div);
    }
}

export function languageAddBorder(language: string) {
    const element = document.getElementById(language);

    element?.classList.add("border-4", "border-black", "selected");
}

export function languageRemoveBorder(language: string) {
    const element = document.getElementById(language);

    element?.classList.remove("border-4", "border-black", "selected");
}

export function placeholderAPI(idElement:string, dataAPI:string) {
    const element = document.getElementById(idElement) as HTMLInputElement;
    element!.placeholder = dataAPI;
}

export async function emailFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.newemail === data.confirm) {
        const response = await requestAPI(`${state.link}/api/settings/account/email`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                oldemail: state.account.email,
                email: data.newemail
            })
        });
        if (response.flag)
            return renderVerifyEmail();
    }
    renderEmail();
}

export async function pseudoFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.newpseudo === data.confirm) {
        requestAPI(`${state.link}/api/settings/account/pseudo`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pseudo: data.newpseudo
            })
        });
        state.account.pseudo = data.newpseudo!.toString();
    }
    renderPseudo();
}

export async function searchFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    let player = null;

    if (data.pseudoPlayerSearch && data.pseudoPlayerSearch != "") {
        player = await requestAPI(`${state.link}/api/profile/search`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "pseudo": data.pseudoPlayerSearch.toString()
            }
        });
    } else {
        const element = document.getElementById("searchResult");
        element!.innerHTML = '';
        return ;
    }

    const element = document.getElementById("searchResult");
    if (player) {
        const playerElement = document.createElement("div");
        const classOptions = "bg-player-display-bg flex justify-center items-center h-[75px] w-[300px] rounded-2xl border-3 border-black";

        playerElement.className = classOptions;
        playerElement.innerHTML = `
        <div class="h-[75px] w-[100px] flex justify-center items-center">
            <span data-id="${player.id}" class="player hover:opacity-50 duration-300 cursor-pointer h-[60px] w-[60px] text-center bg-button-white-bg text-black font-david rounded-full">
                <img class="w-full h-full rounded-full mx-auto" src="${player.picture}">
            </span>
        </div>
        <div class="flex justify-center items-center">
            <p class="font-julee tracking-widest text-2xl">
                ${player.pseudo}
            </p>
        </div>`;
        element!.innerHTML = '';
        element!.appendChild(playerElement);
        renderPlayer();
    }
    else {
        const p = document.createElement("p");
        p.className = "text-4xl mx-auto";
        p.textContent = `NO PLAYER`;
        element!.innerHTML = '';
        element?.appendChild(p);
    }
}

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

export async function createTournamentCallApi(e:Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.inputNameTournament) {
        const tournament = await requestAPI(`${state.link}/api/mode/tournament/open`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.inputNameTournament,
                mode: state.mode.join("").toUpperCase()
            })
        });
        state.tournament = {
            id: tournament.id,
            status: StatusTournament.WAIT,
            mode: state.mode,
            time: 60,
            round: 0,
            users: [{
                user: {
                    id: state.id,
                    picture: state.profile.picture,
                    pseudo: state.account.pseudo
                },
                level: 0
            }]
        }
        renderResultsTournament();
    }
    else 
        renderCreateTournament();
}

export async function joinTournamentCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.inputNameTournament) {
        const tournament = await requestAPI(`${state.link}/api/mode/tournament/join`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.inputNameTournament
            })
        });
        if (tournament) {
            state.tournament = {
                id: tournament.id,
                status: tournament.status,
                mode: tournament.mode.toLowerCase().split(""),
                round: 0,
                time: 60,
                users: tournament.users
            }
            renderResultsTournament();
        }
        else
            renderJoinTournament();
    }
    else 
        renderJoinTournament();
}

export function fillPlayerTournament() {
    for (const [index, player] of state.tournament!.users.entries()) {
        const level = player.level;
        const img = document.createElement("img");
        img.className = "player w-full h-full rounded-full mx-auto";
        img.dataset.id = `${player.user.id}`;
        img.src = player.user.picture;
        if (level === 3) {
            const winner = document.querySelector(".winner");
            winner?.classList.add("hover:opacity-50");
            winner?.classList.add("cursor-pointer");
            winner?.appendChild(img.cloneNode(true) as HTMLImageElement);
        }
        if (level >= 2) {
            const final = document.getElementById(`final${index + 1 > 4 ? "2" : "1"}`);
            final?.classList.add("hover:opacity-50");
            final?.classList.add("cursor-pointer");
            final?.appendChild(img.cloneNode(true) as HTMLImageElement);
        }
        if (level >= 1) {
            const demi = document.getElementById(`demi${index + 1 > 4 ? (index + 1 > 6 ? "4" : "3") : (index + 1 > 2 ? "2" : "1")}`);
            demi?.classList.add("hover:opacity-50");
            demi?.classList.add("cursor-pointer");
            demi?.appendChild(img.cloneNode(true) as HTMLImageElement);
        }
        const quart = document.getElementById(`quart${index + 1}`);
        quart?.classList.add("hover:opacity-50");
        quart?.classList.add("cursor-pointer");
        quart?.appendChild(img);
    }
}

async function eventAcceptFriend(e: Event) {
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

function eventAcceptMatch(e: Event) {
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

function eventDecline(e: Event) {
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

export function notifyCallAPI() {
    if (!state.messages.notify || !state.messages.notify[0]) {
        return ;
    }
    for (const notify of state.messages.notify) {
        const notifyElement = document.querySelector(`.userNotify${notify.id}`);
        const accept = notifyElement?.querySelector(".accept");
        const decline = notifyElement?.querySelector(".decline");

        if (notify.type === Notify.ASK) {
            accept?.addEventListener("click", eventAcceptFriend);
            state.events.set(accept!, {type: "click", callback: eventAcceptFriend});
        }
        if (notify.type === Notify.MATCH) {
            accept?.addEventListener("click", eventAcceptMatch);
            state.events.set(accept!, {type: "click", callback: eventAcceptMatch});
        }

        decline?.addEventListener("click", eventDecline);
        state.events.set(decline!, {type: "click", callback: eventDecline});
    }
}

export async function logInAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
        [...formData.entries()].map(([key, value]) => [key, String(value)])
    );

    if (!data.email || !data.password)
        return renderLogIn();

    let {email, password} = data;

    if (!emailValid(email) || !passwordValid(password))
        return renderLogIn();

    const response = await requestAPI(`${link}/api/login`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
            "email": email,
            "password": password
		}
	});

    if (response.flag == "ok")
        return renderVerify();
    renderLogIn();
}

export async function signInAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
        [...formData.entries()].map(([key, value]) => [key, String(value)])
    );

    if (!data.email || !data.password || !data.confirm || !data.pseudo)
        return renderSignIn();

    let {email, password, confirm, pseudo} = data;

    if (!emailValid(email) || !passwordValid(password) || password !== confirm || !pseudoValid(pseudo)) {
        return renderSignIn();
    }

    const response = await requestAPI(`${link}/api/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            email: email,
            password: password,
            pseudo: pseudo,
            language: state.language
        })
	});

    if (response.flag == "ok")
        return renderVerify();
    renderSignIn();
}

export async function dataPlayerCallAPI(e: Event) {
    let playerData;

    if (!(state.playerData && state.playerData!.user.id)) {
        let idPlayer = (e.target as HTMLElement).dataset.id;
        if (!idPlayer)
            idPlayer = (e.target as HTMLElement).parentElement!.dataset.id;
        if (idPlayer == state.id.toString())
            return renderStatsUser();
        playerData = await requestAPI(`${link}/api/player`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "idasked": idPlayer!
            }
        });
        state.playerData = playerData;
    } else 
        playerData = state.playerData;
    const picturePlayer = document.getElementById("picturePlayer");
    const pseudoPlayer = document.getElementById("pseudoPlayer");
    const resultPlayed = document.getElementById("resultPlayed");
    const resultRatio = document.getElementById("resultRatio");
    const resultTournaments = document.getElementById("resultTournaments");
    const resultWinTournaments = document.getElementById("resultWinTournaments");

    if (playerData.online) {
        const span = document.createElement("span");
        span.classList = "h-3 w-3 absolute bg-green-400 rounded-full left-92 top-30";
        const pictureContainer = document.getElementById("pictureContainer");
        pictureContainer!.appendChild(span);
    }
    const img = document.createElement("img");
    img.className = "w-full h-full rounded-full mx-auto";
    img.src = playerData.user.picture;
    picturePlayer!.appendChild(img);
    pseudoPlayer!.textContent = `${playerData.user.pseudo}`;
    resultPlayed!.textContent = `${playerData.stats.played}`;
    resultRatio!.textContent = `${playerData.stats.ratio}`;
    resultTournaments!.textContent = `${playerData.stats.tournaments}`;
    resultWinTournaments!.textContent = `${playerData.stats.winsTournaments}`;
    playerLink();
}

export function printHistory() {
    const picturePlayer = document.getElementById("picturePlayer");
    const pseudoPlayer = document.getElementById("pseudoPlayer");
    const historyList = document.getElementById("historyList");

    const img = document.createElement("img");
    img.className = "w-full h-full rounded-full mx-auto";
    img.src = state.playerData!.user.picture;
    picturePlayer!.appendChild(img);
    pseudoPlayer!.textContent = `${state.playerData!.user.pseudo}`;

    if (state.playerData!.online) {
        const span = document.createElement("span");
        span.classList = "h-3 w-3 absolute bg-green-400 rounded-full left-92 top-30";
        const pictureContainer = document.getElementById("pictureContainer");
        pictureContainer!.appendChild(span);
    }

    if (!state.playerData!.history![0]) {
        const p = document.createElement("p");
        p.className = "text-4xl";
        p.textContent = "NO HISTORY";
        historyList?.appendChild(p);
        playerLink();
        return ;
    }

    for (const match of state.playerData!.history!) {
        const div = document.createElement("div");
        const colorBg = match.userPoints > match.ennemyPoints ? "bg-green-700" : match.userPoints < match.ennemyPoints ? "bg-red-700" : "bg-gray-500";
        div.className = `grid grid-cols-4 justify-between items-center text-3xl font-julee tracking-widest w-full ${colorBg} py-2 px-8 rounded-full border-4 border-black`;
        div.innerHTML = `
            <div class="score flex justify-center items-center">
                <p>${match.userPoints} - ${match.ennemyPoints}</p>
            </div>
            <div class="ennemy flex justify-center items-center">
                <div class="flex justify-between items-center w-4/5">
                    <div class="">
                        <button data-id="${match.ennemy.id}" class="player2 cursor-pointer hover:opacity-50 duration-300 bg-button-white-bg text-black rounded-full h-[50px] w-[50px] font-david">
                            <img class="w-full h-full rounded-full mx-auto" src="${match.ennemy.picture}">
                        </button>
                    </div>
                    <h1 class="tracking-widest">
                        ${match.ennemy.pseudo}
                    </h1>
                </div>
            </div>
            <div class="mode flex justify-center items-center">
                <p>${match.mode}</p>
            </div>
            <div class="date text-sm flex justify-center items-center">
                <p>${match.date} ${match.hour}</p>
            </div>
        `;
        historyList?.appendChild(div);
    }
    playerLink();
}

export async function searchGame() {
    console.log(state.mode);
    
    if (state.mode[1] == "l" || state.mode[1] == "a") {
        renderGame();
        return ;
    }
    requestAPI(`${link}/api/game/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                id: state.id,
                pseudo: state.account.pseudo,
                picture: state.profile.picture
            },
            mode: state.mode.join("").toUpperCase(),
            tournament: (state.tournament && state.tournament.id) ? state.tournament.id : 0
        })
    });
    renderInSearch();
}

export async function quitQueue() {
    requestAPI(`${link}/api/game/quit`, {
        method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            tournament: state.tournament?.id ? state.tournament.id : 0
        })
    });
    renderHome();
}

export function quitTournamentCallAPI() {
    requestAPI(`${state.link}/api/mode/tournament/quit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tournament: state.tournament!.id
        })
    });
    delete state.tournament;
    renderTournament();
}

export async function verifyAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.code)
        return renderVerify();

    const API = await requestAPI(`${link}/api/verify`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "code": data.code.toString()
        }
    });

    console.log("Api :", API);
    
    if (API)
        return userConnexionAccepted(API);

    renderVerify();
}

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

export function disconnect() {
    localStorage.removeItem("TokenTranscendence");
    window.location.reload();
}

export async function passwordFormCallAPI(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.newpassword === data.confirm) {
        const newToken = await requestAPI(`${state.link}/api/settings/account/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                oldpassword: data.yourpassword,
                newpassword: data.newpassword
            })
        });
        if (newToken.token)
            setToken(newToken.token);
    }
    renderPassword();
}

export async function verifyFormCallApi(e:Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.code)
        return renderVerify();

    const response = await requestAPI(`${link}/api/settings/account/verify`, {
        method: "PUT",
        headers: {
            "code": data.code.toString()
        }
    });
    console.log(response);
    if (response.email) {
        state.account.email = response.email.toString();
        renderEmail();
        return ;
    }

    renderVerify();
}

export async function forgotCallAPI(e: Event) {
    e.preventDefault();

    const form = document.getElementById("formLogIn") as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    if (data.email) {
        requestAPI(`${link}/api/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email.toString()
            })
        });
        console.log("sended");
        // const message = "password sended";
        // const span = document.createElement("span");
        // span.className = "bg-green-600 rounded-full text-3xl p-3 absolute bottom-70";
        // span.textContent = "PASSWORD SENDED";
    }
}

export async function deleteAccountCallAPI() {
    requestAPI(`${link}/api/settings/delete`, {
        method: "DELETE"
    });
    renderVerifyDelete();
}

export async function verifyDeleteFormCallApi(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.code)
        return renderVerify();
    const response = await requestAPI(`${link}/api/settings/delete/verify`, {
        method: "DELETE",
        headers: {
            "code": data.code.toString()
        }
    });
    if (response.delete) {
        removeToken();
        console.log("delete account - rechargement de la page");
        window.location.reload();
        return ;
    }
    renderVerify();
}

export async function languageCallAPI() {
    state.language = document.querySelector(".selected")!.id;
    await requestAPI(`${link}/api/settings/language`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: state.language
        })
    });
    await i18next.changeLanguage(state.language);
    setVues();
    renderHome();
}

export function languageBorder(e: Event) {
    const selected = document.querySelector(".selected")!.id;
    if ((e.target! as HTMLElement).id == selected)
        return ;
    const oldLanguage = selected;
    languageAddBorder((e.target! as HTMLElement).id);
    languageRemoveBorder(oldLanguage);
}