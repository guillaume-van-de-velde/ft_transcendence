import { render } from "./components/core/render.js";
import { AppState, IDPLAYER, MessageGlobal, MessageNotify, MessagePrivate, TypeEvent, UserShortData } from "./components/core/state.js";
import { home, renderHome } from "./components/pages/home.js";
import { requestAPI } from "./components/utils/requestApi.js";
import { closeClicked } from "./components/utils/globalEvents.js";
import { PageInstance } from "./components/utils/interfaces.js";
import { pageRegistery } from "./components/utils/pageRegistery.js";
import { setVues, vues } from "./vues/vues.js";
import { renderPrivateMessage } from "./components/pages/messages/private.js";
import { renderGlobal } from "./components/pages/messages/global.js";
import { renderNotify } from "./components/pages/messages/notify.js";
import { renderConnexion } from "./components/pages/connexion/connexion.js";
import { renderGame } from "./components/pages/game/game.js";
import { renderResultsTournament } from "./components/pages/mode/3/tournament/results.js";
import { changeModeCallApi } from "./components/utils/api.js";

export const link = "https://localhost:4400";
export let state: AppState;
declare const io:any;
export let socket:any;
export let token:string | null = null;

export function getToken() {
  return token;
}

export function setToken(newToken: string) {
  token = newToken;
  localStorage.setItem("TokenTranscendence", newToken);
}

export function removeToken() {
  token = null;
  localStorage.removeItem("TokenTranscendence");
}

function keepInput() {
	const input = document.getElementById("writeBar") as HTMLInputElement;
	if (input) {
		console.log("coucou");
		
		state.input.value = input!.value;
		state.input.focused = document.activeElement === input;
		state.input.start = input!.selectionStart ?? 0;
		state.input.end = input!.selectionEnd ?? 0;
	}
}

function reRenderForNotify() {
	switch (state.actual) {
		case "home":
			renderHome();
			break ;
		case "private":
			keepInput();
			renderPrivateMessage();
			break ;
		case "global":
			keepInput();
			renderGlobal();
			break ;
		case "notify":
			renderNotify();
			break ;
		default:
			break ;
	}
}

function socketManagement() {
	const listPageNotify = ["private", "global", "notification", "home"];
	socket = io(link, {
		auth: {
			id: state.id
		}
	});

	socket.on("match", (match: any) => {
		const mode = match.mode.toLowerCase();

		state.mode = [mode[0], mode[1], mode[2]];
		changeModeCallApi();
		state.ennemy = match.ennemy;
		renderGame();
	});

	socket.on("notify", (notify:MessageNotify) => {
		const blocked = state.profile.blocked;
		if (blocked && blocked[0]) {
			for (const user of blocked!) {
				if (notify.user.id == user.id)
					return ;
			}
		}
		state.messages.notify?.push(notify);
		if (listPageNotify.includes(state.actual))
			reRenderForNotify();
	});

	socket.on("friend", (friend: UserShortData) => {
		if (state.profile.friends && !state.profile.friends[0])
			state.profile.friends[0] = friend;
		else
			state.profile.friends?.push(friend);
	});

	socket.on("delete", (friend: UserShortData) => {
		const index = state.profile.friends!.findIndex(f => f.id == friend.id);
		state.profile.friends!.splice(index, 1);
		if (state.messages.private) {
			const indexChat = state.messages.private!.findIndex(c => c.user.id == friend.id);
			state.messages.private!.splice(indexChat, 1);
		}
	});

	socket.on("global", (global:MessageGlobal) => {
		state.messages.global?.unshift(global);
		if (listPageNotify.includes(state.actual))
			reRenderForNotify();
	});

	socket.on("private", (message:any) => {
		let firstMessage = true;
		for (const conversation of state.messages.private!) {
			if (conversation.user.id === message.id)
				firstMessage = false;
		}
		if (firstMessage) {
			const newConversation:MessagePrivate = {
				user: state.profile.friends?.find(friend => friend.id === message.id)!,
				chat: [{
					isUser: false,
					message: message.message
				}],
				seen: false
			}
			if (state.checkMessage == true)
				state.friend++;
			state.messages.private?.unshift(newConversation);
		}
		else {
			const currentConversation = state.messages.private?.find(friend => friend.user.id === message.id);
			const indexConversation = state.messages.private?.findIndex(friend => friend.user.id === message.id);
			if (state.friend == indexConversation)
				state.friend = 0;
			if (state.actual === "private" && state.friend == currentConversation?.user.id)
				currentConversation.seen = true;
			else
				currentConversation!.seen = false;
			currentConversation?.chat.unshift({
				isUser: false,
				message: message.message
			});
			const privateArray = state.messages.private;
			privateArray?.splice(indexConversation!, 1)[0];
			privateArray?.unshift(currentConversation!);
		}
		if (listPageNotify.includes(state.actual))
			reRenderForNotify();
	});

	socket.on("tournament", (tournament:any) => {
		if (state.tournament && state.tournament.id == tournament.id) {
			state.tournament = tournament;
		if (state.actual == "tournament")
			renderResultsTournament();
		}
	});
}

async function loadLanguage(langFile: string) {
    const response = await fetch(langFile);
    return await response.json();
}

async function setupLanguage() {
	i18next.init({
		lng: state.language,
		fallbackLng: "ENG",
		resources: {
			ENG: { translation: await loadLanguage("../style/assets/languages/eng.json") },
			FRA: { translation: await loadLanguage("../style/assets/languages/fra.json") },
			ESP: { translation: await loadLanguage("../style/assets/languages/esp.json") },
			RUS: { translation: await loadLanguage("../style/assets/languages/rus.json") }
		},
	});
	setVues();
}

export async function initState(APIandToken:any) {
	if (APIandToken.token) {
		localStorage.setItem("TokenTranscendence", APIandToken.token);
		token = APIandToken.token;
	}
	const API = APIandToken.data;
	console.log("init", API);
	
	state = {
		link: link,
		events: new Map<Element | null, TypeEvent>(),
		index: 0,
		id: API.id,
		mode: [API.mode.set[0].toLowerCase(), API.mode.set[1].toLowerCase(), API.mode.set[2].toLowerCase()],
		friend: 0,
		input: {
			value: "",
			focused: false,
			start: null,
			end: null
		},
		checkMessage: false,
		roundTournament: API.mode.tournament?.id ? API.mode.tournament.round : 0,
		socket: {
			notify: false,
			message: false,
			tournament: false
		},
		volume: API.settings.volume,
		key: {
			...API.settings.key,
			active: IDPLAYER.NONE
		},
		account: API.settings.account,
		language: API.settings.language,
		profile: API.profile,
		messages: API.messages,
		...(API.mode.tournament?.id && {
			tournament: API.mode.tournament
		})
	}
	await setupLanguage();
	console.log(state);
}

export async function userConnexionAccepted(API:any) {
	await initState(API);
	socketManagement();
	setInterval(timer, 1000);
	renderHome();
}

function timer() {
	if (state.tournament && state.tournament.time > 0) {
		state.tournament.time--;
		console.log(state.tournament.time);
	}
}

function foundLanguage() {
	switch (navigator.language) {
		case "fr":
			return "FRA";
		case "fr-FR":
			return "FRA";
		case "fr-CA":
			return "FRA";
		case "fr-BE":
			return "FRA";
		case "fr-CH":
			return "FRA";
		case "fr-LU":
			return "FRA";
		case "fr-MC":
			return "FRA";

		case "es":
			return "ESP";
		case "es-ES":
			return "ESP";
		case "es-MX":
			return "ESP";
		case "es-AR":
			return "ESP";
		case "es-CO":
			return "ESP";
		case "es-CL":
			return "ESP";
		case "es-PE":
			return "ESP";
		case "es-VE":
			return "ESP";
		case "es-US":
			return "ESP";

		case "ru":
			return "RUS";
		case "ru-RU":
			return "RUS";
		case "ru-BY":
			return "RUS";
		case "ru-KZ":
			return "RUS";
		case "ru-UA":
			return "RUS";

		default:
			return "ENG";
	}
}



export async function setStateUserNotConnected() {
	state = {
		link: "",
		events: new Map<Element | null, TypeEvent>(),
		index: 0,
		id: 0,
		mode: ["", "", ""],
		friend: 0,
		actual: "none",
		checkMessage: false,
		ennemy: undefined,
		roundTournament: 0,
		input: {
			value: "",
			focused: false,
			start: null,
			end: null
		},
		socket: {
			notify: false,
			message: false,
			tournament: false
		},
		volume: {
			general: 0,
			noises: 0,
			music: 0
		},
		key: {
			player1: {
				up: null,
				down: null
			},
			player2: {
				up: null,
				down: null
			},
			active: IDPLAYER.NONE
		},
		account: {
			email: "",
        	pseudo: ""
		},
		language: foundLanguage(),
		profile: {
			picture: "",
			stats: {
				played: 0,
				ratio: 0,
				tournaments: 0,
				winsTournaments: 0
			},
			history: [],
			friends: [],
			blocked: []
		},
		messages: {}
	}
	await setupLanguage();
}

async function tryConnexionWithToken() {
	token = localStorage.getItem("TokenTranscendence");
	if (!token)
		return null;
	
	const API = await requestAPI(`${link}/connect`, {
		method: "GET"
	});
	
	if (!API || API == "token connexion refused")
		return null;
	return API;
}

document.addEventListener("DOMContentLoaded", async () => {
	const API = await tryConnexionWithToken();
	if (API)
		userConnexionAccepted(API);
	else {
		await setStateUserNotConnected();
		renderConnexion();
	}
});