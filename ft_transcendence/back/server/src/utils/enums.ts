export enum Notify { ASK = "ASK", MATCH = "MATCH", TOURNAMENT = "TOURNAMENT" }
export enum StatusTournament { START = "START", WAIT = "WAIT", FINISHED = "FINISHED" }
export enum KeyUser { EMAIL = "email", PSEUDO = "pseudo", ID = "id" }
export enum KeyTournament { NAME = "name", ID = "id" }

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
    chat: MessageChat[]
}

export interface MessageGlobal {
    user: UserShortData,
    message: string
}

export interface MessageNotify {
    id: number
    user: UserShortData,
    type: string
}

export interface UserInTournament {
    user: UserShortData,
    level: number
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
        stats: {
            played: number,
            ratio: number,
            tournaments: number,
            winsTournaments: number
        },
        history?: MatchHistory[],
        friends?: UserShortData[]
    },
    messages: {
        private?: MessagePrivate[],
        global?: MessageGlobal[],
        notify?: MessageNotify[]
    },
    mode: {
        set: string,
        tournament?: {
            id: number,
            status: string,
            time: number,
            users: UserInTournament[]
        }
    }
}