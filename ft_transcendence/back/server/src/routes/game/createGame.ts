import { FastifyReply, FastifyRequest } from "fastify";
import { userSockets } from "../../sockets/sockets";
import { Match, Tournament, UserShortData } from "../../utils/enums";
import { musicLevels, musicTime } from "../../../server";
import { createMatch } from "../../db/crud/create";
import { sendTournamentStateToPlayers, tournamentsManagement } from "../tournament/tournament";
import { updateTournaments } from "../../db/crud/update";
import { updateStats } from "../../db/crud/update";

export const gameManagement: Match[] | null = [];
export let playersInGame: number[] = [];

function getDate(now: Date) {
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
}

function getHour(now: Date) {
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}h${minutes}`;
}

function getTournamentOfMatch(userMatch: UserShortData): Tournament | null {
    for (const tournament of tournamentsManagement) {
        for (const user of tournament.users) {
            if (user.user.id == userMatch.id)
                return tournament;
        }
    }
    return null;
}

async function closingMatch(player1Score: number, player2Score: number, match: Match) {
    const now = new Date();

    try {
        await createMatch(match.users[0]!.id, match.users[1]!.id, player1Score, player2Score, match.mode, getDate(now), getHour(now));
        const win = player1Score > player2Score ? match.users[0]!.id : match.users[1]!.id;
        const lose = player1Score <= player2Score ? match.users[0]!.id : match.users[1]!.id;;
        await updateStats(win, "wins");
        await updateStats(lose, "loses");
        await updateStats(win, "played");
        await updateStats(lose, "played");
    } catch (err) {}

    if (match.booking) {
        const tournament = getTournamentOfMatch(match.users[0]!);
        const player1 = tournament!.users.find(t => t.user.id == match.users[0]!.id);
        const player2 = tournament!.users.find(t => t.user.id == match.users[1]!.id);
        if (player1Score > player2Score) {
            player1!.level++
            updateTournaments(tournament!.id, tournament!.users.findIndex(t => t.user.id == match.users[0]!.id) + 1, player1!.level);
        }
        else {
            player2!.level++;
            updateTournaments(tournament!.id, tournament!.users.findIndex(t => t.user.id == match.users[1]!.id) + 1, player2!.level);
        }
        player1!.finish = true;
        player2!.finish = true;
        sendTournamentStateToPlayers(tournamentsManagement.findIndex(t => t.id == tournament!.id));
    }
    const index = gameManagement!.findIndex(m => m.users[0]?.id === match.users[0]!.id);
    if (index !== -1)
        gameManagement!.splice(index, 1);
}

function renderGame(match: Match) {
    const boardHeight = 630;
    const boardWidth = 1340;

    let playerWidth = 15;
    let playerHeight = 100;
    let playerVelocityY = 0;
    let velocity = 10;

    if (match.mode[0] == 'M')
        velocity = 8;

    let player1 = {
        x: 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
        velocityY: playerVelocityY,
    }

    let player2 = {
        x: boardWidth - playerWidth - 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
        velocityY: playerVelocityY,
    }

    let ballWidth = 10;
    let ballHeight = 10;

    let ball = {
        x: boardWidth / 2 - (ballWidth / 2),
        y: boardHeight / 2 - (ballHeight / 2),
        width: ballWidth,
        height: ballHeight,
        velocityX: velocity,
        velocityY: velocity
    }

    let player1Score = 0;
    let player2Score = 0;

    const keys: Record<string, boolean> = {};

    match.sockets[0]!.on("move", (direction) => {
        movePlayer(1, direction);
    });
    match.sockets[0]!.on("stop", (direction) => {
        stopPlayer(1, direction);
    });
    match.sockets[1]!.on("move", (direction) => {
        movePlayer(2, direction);
    });
    match.sockets[1]!.on("stop", (direction) => {
        stopPlayer(2, direction);
    });

    match.renderGameAPI = {
        move: (player: number, direction: string) => movePlayer(player, direction),
        stop: (player: number, direction: string) => stopPlayer(player, direction)
    };

    playersInGame.push(match.users[0]!.id);
    playersInGame.push(match.users[1]!.id);

    let intervalId: any;

    intervalId = setInterval(update, 1000 / 60);

    function update() {
        let nextPlayer1Y = player1.y + player1.velocityY;
        if (!outOfBounds(nextPlayer1Y))
            player1.y = nextPlayer1Y;

        let nextPlayer2Y = player2.y + player2.velocityY;
        if (!outOfBounds(nextPlayer2Y))
            player2.y = nextPlayer2Y;

        if (match.mode[0] == 'M') {
            ball.x += parseFloat((ball.velocityX * getLevel()!).toFixed(2));
            ball.y += parseFloat((ball.velocityY * getLevel()!).toFixed(2));
        } else {
            ball.x += ball.velocityX;
            ball.y += ball.velocityY;
        }

        if (ball.y <= 0 || (ball.y + ball.height) >= boardHeight) {
            ball.velocityY *= -1;
        }

        if (detectCollision(ball, player1)) {
            if (ball.x <= player1.x + player1.width) {
                ball.x = player1.x + player1.width + 1;
                const random = 0.5 - parseFloat(Math.random().toFixed(2));
                const oldVelocity = Math.abs(ball.velocityX) + Math.abs(ball.velocityY);
                ball.velocityY = random * oldVelocity;
                ball.velocityX = oldVelocity - Math.abs(ball.velocityY);
            }
        } else if (detectCollision(ball, player2)) {
            if (ball.x + ballWidth > player2.x) {
                ball.x = player2.x - ballWidth - 1;
                const random = 0.5 - parseFloat(Math.random().toFixed(2));
                const oldVelocity = Math.abs(ball.velocityX) + Math.abs(ball.velocityY);
                ball.velocityY = random * oldVelocity;
                ball.velocityX = - (oldVelocity - Math.abs(ball.velocityY));
            }
        }

        if (ball.x < 0) {
            player2Score++;
            resetGame(2, player2Score);
        }
        else if (ball.x + ballWidth > boardWidth) {
            player1Score++;
            resetGame(1, player1Score);
        }
        match.sockets[0]!.emit("render", {
            playerY: player1.y,
            ennemyY: player2.y,
            ball: {
                x: ball.x,
                y: ball.y
            }
        });
        match.sockets[1]!.emit("render", {
            playerY: player2.y,
            ennemyY: player1.y,
            ball: {
                x: boardWidth - ball.x - ball.width,
                y: ball.y
            }
        });
    }

    function outOfBounds(yPosition: number) {
        return (yPosition < 0 || yPosition + playerHeight > boardHeight)
    }

    function movePlayer(player: number, direction: string) {
        if (player == 1) {
            if (direction == "up")
                player1.velocityY = -velocity;
            else if (direction == "down")
                player1.velocityY = velocity;
        }

        else if (player == 2) {
            if (direction == "up")
                player2.velocityY = -velocity;
            else if (direction == "down")
                player2.velocityY = velocity;
        }

        keys[`${player}${direction}`] = true;
    }

    function stopPlayer(player: number, direction: string) {
        if (player == 1) {
            if (direction == "up" && !keys["1down"])
                player1.velocityY = 0;
            else if (direction == "down" && !keys["1up"])
                player1.velocityY = 0;
        }

        else if (player == 2) {
            if (direction == "up" && !keys["2down"])
                player2.velocityY = 0;
            else if (direction == "down" && !keys["2up"])
                player2.velocityY = 0;
        }

        keys[`${player}${direction}`] = false;
    }

    function detectCollision(a: any, b: any) {
        return (a.x < b.x + b.width
            && a.x + a.width > b.x
            && a.y < b.y + b.height
            && a.y + a.height > b.y)
    }

    function resetGame(player: number, score: number) {
        match.sockets[0]!.emit("round", {
            player: player1Score,
            ennemy: player2Score
        });
        match.sockets[1]!.emit("round", {
            player: player2Score,
            ennemy: player1Score
        });
        if (score == 10) {
            clearInterval(intervalId);
            match.sockets.forEach(s => {
                s?.removeAllListeners("move");
                s?.removeAllListeners("stop");
            });
            playersInGame = playersInGame.filter(u => u != match.users[0]!.id && u != match.users[1]!.id);
            closingMatch(player1Score, player2Score, match);
            return;
        }
        ball = {
            x: boardWidth / 2 - ballWidth / 2,
            y: boardHeight / 2 - ballHeight / 2,
            width: ballWidth,
            height: ballHeight,
            velocityX: player == 1 ? -velocity : velocity,
            velocityY: velocity
        }
    }

    let musicStart = Date.now();
    let delta = musicLevels.length / musicTime;
    let elapsed = 0;

    function getLevel() {
        elapsed = Date.now() - musicStart;
        const index = Math.round((elapsed / 1000) * delta);
        if (index >= musicLevels.length) {
            musicStart = Date.now();
            return 0;
        }
        return musicLevels[index]!;
    }
}

function startMatch(match: Match) {
    for (const [socket, id] of userSockets) {
        if (match.users[0]!.id == id)
            match.sockets[0] = socket;
        else if (match.users[1]!.id == id)
            match.sockets[1] = socket;
    }
    if (!match.sockets[0] || !match.sockets[1]) {
        const activeUser = match.sockets[0] ? match.users[0] : match.users[1];
        const index = gameManagement!.findIndex(m => m.users[0]?.id === match.users[0]?.id);
        gameManagement![index] = {
            mode: match.mode,
            users: [activeUser!, null],
            sockets: [undefined, undefined]
        }
        return;
    }

    match.sockets[0].emit("match", { ennemy: match.users[1], mode: match.mode });
    match.sockets[1].emit("match", { ennemy: match.users[0], mode: match.mode });
    const index = gameManagement!.findIndex(m => m.users[0]?.id === match.users[0]?.id);
    gameManagement![index] = match;
    renderGame(match);
}

function manageInviteQueue(user: UserShortData) {
    if (gameManagement) {
        for (let i = 0; i < gameManagement.length; i++) {
            const game = gameManagement[i]!;
            if (game.invite && (game.invite[0] == user.id || game.invite[1] == user.id)) {
                if (game.date! + (1000 * 60 * 2) < Date.now()) {
                    gameManagement.splice(i, 1);
                    return false;
                }
                if (!game.users[0])
                    game.users[0] = user;
                else
                    game.users[1] = user;
                if (game.users[0] && game.users[1])
                    startMatch(game);
                return true;
            }
        }
    }
    return false;
}

function manageUserInQueue(user: UserShortData, mode: string) {
    let match: Match | null = null;

    if (manageInviteQueue(user))
        return;
    if (gameManagement) {
        for (const game of gameManagement) {
            if (game.mode == mode && !game.booking) {
                if (!game.users[1]) {
                    game.users[1] = user;
                    match = game;
                    break;
                }
            }
        }
    }
    if (!match) {
        gameManagement?.push({
            mode: mode,
            users: [user, null],
            sockets: [undefined, undefined]
        });
    } else {
        startMatch(match);
    }
}

async function manageTournamentQueue(tournament: Tournament, user: UserShortData) {
    for (const match of gameManagement!) {
        if (match.booking && (user.id == match.booking[0] || user.id == match.booking[1])) {
            const userTournament = tournament.users.find(u => u.user.id == user.id);
            if (userTournament!.quit)
                return;
            if (!match.users[0])
                match.users[0] = user;
            else
                match.users[1] = user;
            userTournament!.queue = true;
            if (match.users[0] && match.users[1]) {
                startMatch(match);
            }
            break;
        }
    }
}

export const createGame = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const user = reqBody.user;
    const mode = reqBody.mode;
    const tournamentId = reqBody.tournament;
    const tournament = tournamentsManagement.find(t => t.id == tournamentId);

    if (user.id != req.user!.id)
        return res.code(403).send({ error: "not authorised" });
    if (playersInGame.includes(user.id))
        return;
    if (tournamentId && tournament?.status == "START")
        manageTournamentQueue(tournament, user);
    else if (tournamentId || mode[3] == "T")
        return;
    else
        manageUserInQueue(user, mode);
}