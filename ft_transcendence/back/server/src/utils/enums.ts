import { Socket } from "socket.io"

export enum Notify { ASK = "ASK", MATCH = "MATCH" }
export enum StatusTournament { START = "START", WAIT = "WAIT", FINISHED = "FINISHED" }
export enum KeyUser { EMAIL = "email", PSEUDO = "pseudo", ID = "id" }
export enum KeyTournament { NAME = "name", ID = "id" }
export enum Link { NONE = "NONE", FRIEND = "FRIEND", SENT = "SENT", BLOCKED = "BLOCKED"}

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

interface MessageChat {
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
    id: number
    user: UserShortData,
    type: string,
    seen: boolean
}

export interface UserInTournament {
    user: UserShortData,
    level: number,
    queue: boolean,
    finish: boolean,
    quit: boolean
}

export interface UserResponse {
    id: number,
    settings: {
        volume: {
            general: number,
            noises: number,
            music: number
        },
        key: {
            player1: {
                up: string,
                down: string
            },
            player2: {
                up: string,
                down: string
            }
        },
        account: {
            email: string,
            pseudo: string
        },
        language: string
    },
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
    mode: {
        set: string,
        tournament?: Tournament
    }
}

export interface Match {
    mode: string;
    users: [UserShortData | null, UserShortData | null],
    sockets: [Socket | undefined, Socket | undefined],
    booking?: [number, number] | null | undefined,
    invite?: [number, number] | null | undefined,
}

export interface Tournament {
    id: number,
    status: string,
    time: number,
    mode: string,
    round: number,
    users: UserInTournament[]
}