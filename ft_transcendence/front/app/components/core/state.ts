export interface TypeEvent {
    type: string,
    callback: EventListener
}

export enum IDPLAYER {NONE, PLAYER1, PLAYER2}

export interface AppState {
    events: Map<Element | null, TypeEvent>;
    mode: [string, string, string];
    tournamentAction: boolean;
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
    index: number;
}

export const state: AppState = {
    events: new Map<Element | null, TypeEvent>(),
    mode:["c", "o", "m"],
    tournamentAction:false,
    volume: {
        general: 60,
        noises: 60,
        music: 40,
    },
    key: {
        player1: {
            up: "w",
            down: "s",
        },
        player2: {
            up: "o",
            down: "l",
        },
        active: IDPLAYER.NONE,
    },
    index: 0,
};
