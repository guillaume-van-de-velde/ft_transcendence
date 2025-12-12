export interface TypeEvent {
    type: string,
    callback: EventListener
}

export enum IDPLAYER { NONE, PLAYER1, PLAYER2 }
export enum Notify { ASK = "ASK", MATCH = "MATCH" }
export enum StatusTournament { START = "START", WAIT = "WAIT", FINISHED = "FINISHED" }
export enum Link { NONE = "NONE", FRIEND = "FRIEND", SENT = "SENT", BLOCKED = "BLOCKED" }

export interface UserShortData {
    id: number,
    picture: string,
    pseudo: string
}

export interface MatchHistory {
    ennemy: UserShortData,
    userPoints: number,
    ennemyPoints: number,
    mode: string,
    date: string,
    hour: string
}

export interface MessageChat {
    isUser: boolean,
    message: string
}

export interface MessagePrivate {
    user: UserShortData,
    chat: MessageChat[],
    seen: boolean
}

export interface MessageGlobal {
    user: UserShortData,
    message: string
}

export interface MessageNotify {
    id: number,
    user: UserShortData,
    type: string,
    seen: boolean
}

export interface UserInTournament {
    user: UserShortData,
    level: number
}

export interface AppState {
    link: string,
    events: Map<Element | null, TypeEvent>,
    index: number,
    id: number,
    mode: [string, string, string],
    friend: number,
    actual: string,
    checkMessage: boolean,
    ennemy: UserShortData | undefined,
    roundTournament: number,
    interval?: number,
    stop: boolean,
    playerData?: {
        link: Link,
        user: UserShortData,
        stats: {
            played: number,
            ratio: number,
            tournaments: number,
            winsTournaments: number
        },
        history?: MatchHistory[],
        online: boolean
    }
    input: {
        value: string;
        focused: boolean;
        start: number | null;
        end: number | null;
    }
    socket: {
        notify: boolean,
        message: boolean,
        tournament: boolean
    }
    volume: {
        general: number;
        noises: number;
        music: number;
    }
    key: {
        player1: {
            up: string | null;
            down: string | null;
        }
        player2: {
            up: string | null;
            down: string | null;
        }
        active: IDPLAYER;
    }
    account: {
        email: string,
        pseudo: string
    },
    language: string,
    profile: {
        picture: string,
        stats: {
            played: number,
            ratio: number,
            tournaments: number,
            winsTournaments: number
        },
        history?: MatchHistory[],
        friends?: UserShortData[],
        blocked?: UserShortData[]
    },
    messages: {
        private?: MessagePrivate[],
        global?: MessageGlobal[],
        notify?: MessageNotify[]
    },
    tournament?: {
        id: number,
        status: string,
        round: number,
        mode: [string, string, string],
        time: number,
        users: UserInTournament[]
    }
}