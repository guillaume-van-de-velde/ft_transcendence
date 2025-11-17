import { render } from "./components/core/render.js";
import { AppState, IDPLAYER, MessageGlobal, MessageNotify, MessagePrivate, TypeEvent } from "./components/core/state.js";
import { home, renderHome } from "./components/pages/home.js";
import { requestAPI } from "./components/utils/requestApi.js";
import { closeClicked } from "./components/utils/globalEvents.js";
import { PageInstance } from "./components/utils/interfaces.js";
import { pageRegistery } from "./components/utils/pageRegistery.js";
import { page } from "./pages/index.js";
import { friends } from "./components/pages/profile/friends.js";
import { renderPrivateMessage } from "./components/pages/messages/private.js";
import { renderGlobal } from "./components/pages/messages/global.js";
import { renderNotify } from "./components/pages/messages/notify.js";
import { renderConnexion } from "./components/pages/connexion/connexion.js";

export let state: AppState;
declare const io:any;

export let socket:any;

function reRenderForNotify() {
	switch (state.actual) {
		case "home":
			renderHome();
			break;
		case "private":
			renderPrivateMessage();
			break;
		case "global":
			renderGlobal();
			break;
		case "notify":
			renderNotify();
			break;
		default:
			break;
	}
}

function socketManagement() {
	const listPageNotify = ["private", "global", "notification", "home"];
	socket = io("http://localhost:4400", {
		auth: {
			id: state.id
		}
	});

	socket.on("notify", (notify:MessageNotify) => {
		state.messages.notify?.push(notify);
		if (listPageNotify.includes(state.actual))
			reRenderForNotify();
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

	socket.on("tournament", (tournament:string) => {

	});
}

const homeInstance: PageInstance = {
	content: page.home,
	level: 0,
	create: home
};

export async function initState(API:any) {
	API = await requestAPI("http://localhost:4400/api/login", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
            "email": "doudou@gmail.com",
            "password": "123"
		}
	});
	state = {
		link: "http://localhost:4400",
		events: new Map<Element | null, TypeEvent>(),
		index: 0,
		id: API.id,
		mode: [API.mode.set[0].toLowerCase(), API.mode.set[1].toLowerCase(), API.mode.set[2].toLowerCase()],
		friend: 0,
		input: null,
		checkMessage: false,
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
	console.log(state);
	socketManagement();
	render(homeInstance);
}

function setStateUserNotConnected() {
	state = {
		link: "",
		events: new Map<Element | null, TypeEvent>(),
		index: 0,
		id: 0,
		mode: ["", "", ""],
		friend: 0,
		actual: "none",
		input: {
			value: "",
			focused: false,
			start: null,
			end: null,
		},
		checkMessage: false,
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
				down: null,
			},
			player2: {
				up: null,
				down: null,
			},
			active: IDPLAYER.NONE
		},
		account: {
			email: "",
        	pseudo: ""
		},
		language: "",
		profile: {
			picture: "",
			stats: {
				played: 0,
				ratio: 0,
				tournaments: 0,
				winsTournaments: 0
			},
			history: [],
			friends: []
		},
		messages: {}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// const token = tokenAccepted();
	// if (token)
	// 	initState(token);

	initState(null);

	// setStateUserNotConnected();
	// renderConnexion();
});
