export var IDPLAYER;
(function (IDPLAYER) {
    IDPLAYER[IDPLAYER["NONE"] = 0] = "NONE";
    IDPLAYER[IDPLAYER["PLAYER1"] = 1] = "PLAYER1";
    IDPLAYER[IDPLAYER["PLAYER2"] = 2] = "PLAYER2";
})(IDPLAYER || (IDPLAYER = {}));
export const state = {
    events: new Map(),
    mode: ["c", "o", "m"],
    tournamentAction: false,
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
