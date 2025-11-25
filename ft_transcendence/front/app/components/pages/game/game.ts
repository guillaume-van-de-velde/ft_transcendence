import { socket, state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderHome } from "../home.js";

export function renderGame() {
    const gamePage: PageInstance = {
        content: page.game.game,
        level: 0,
        create: game,
    }
    render(gamePage);
}

export function game() {
    // renderLocalGame();
    fillPlayers();
    renderOnlineGame();
}

function fillPlayers() {
    const playerPicture = document.getElementById("playerPicture");
    const playerPseudo = document.getElementById("playerPseudo");
    const ennemyPseudo = document.getElementById("ennemyPseudo");
    const ennemyPicture = document.getElementById("ennemyPicture");

    const playerImg = document.createElement("img");
    const ennemyImg = document.createElement("img");

    playerImg.src = state.profile.picture;
    playerImg.className = "w-full h-full rounded-full mx-auto";

    console.log(state);
    
    ennemyImg.src = state.ennemy!.picture;
    ennemyImg.className = "w-full h-full rounded-full mx-auto";

    playerPicture!.appendChild(playerImg);
    playerPseudo!.textContent = state.account.pseudo;

    ennemyPicture!.appendChild(ennemyImg);
    ennemyPseudo!.textContent = state.ennemy!.pseudo;
}

function renderLocalGame() {
    const boardHeight = 630;
    const boardWith = 1340;
    let board:HTMLCanvasElement;
    let context;

    let playerWidth = 10;
    let playerHeight = 100;
    let playerVelocityY = 0;
    let velocity = 10;

    let player1 = {
        x: 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
        velocityY: playerVelocityY,
        keyUp: state.key.player1.up!,
        keyDown: state.key.player1.down!
    }

    let player2 = {
        x: boardWith - playerWidth - 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
        velocityY: playerVelocityY,
        keyUp: state.key.player2.up!,
        keyDown: state.key.player2.down!
    }

    let ballWidth = 10;
    let ballHeight = 10;

    let ball = {
        x: boardWith / 2 - (ballWidth / 2),
        y: boardHeight / 2 - (ballHeight / 2),
        width: ballWidth,
        height: ballHeight,
        velocityX: velocity,
        velocityY: velocity
    }

    let player1Score = 0;
    let player2Score = 0;

    const keys: Record<string, boolean> = {};

    window.onload = () => {
        board = document.getElementById("board") as HTMLCanvasElement;
        board.height = boardHeight;
        board.width = boardWith;
        context = board.getContext("2d")!;

        document.addEventListener("keydown", movePlayer);
        document.addEventListener("keyup", stopPlayer);
        requestAnimationFrame(update);
    };

    function update() {
        requestAnimationFrame(update);
        context!.clearRect(0, 0, board.width, board.height);
        context!.fillStyle = "white";

        let nextPlayer1Y = player1.y + player1.velocityY;
        if (!outOfBounds(nextPlayer1Y))
            player1.y = nextPlayer1Y;
        context!.fillRect(player1.x, player1.y, player1.width, player1.height);

        let nextPlayer2Y = player2.y + player2.velocityY;
        if (!outOfBounds(nextPlayer2Y))
            player2.y = nextPlayer2Y;
        context!.fillRect(player2.x, player2.y, player2.width, player2.height);
        
        context!.fillRect(boardWith / 2 - 1, 0, 2, boardHeight);

        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        context!.fillRect(ball.x, ball.y, ball.width, ball.height);

        if (ball.y <= 0 || (ball.y + ball.height) >= boardHeight) {
            ball.velocityY *= -1;
        }

        if (detectCollision(ball, player1)) {
            if (ball.x <= player1.x + player1.width)
                ball.velocityX *= -1;
        }
        else if (detectCollision(ball, player2)) {
            if (ball.x + ballWidth > player2.x)
                ball.velocityX *= -1;
        }

        if (ball.x < 0) {
            player2Score++;
            resetGame(2, player2Score);
        }
        else if (ball.x + ballWidth > boardWith) {
            player1Score++;
            resetGame(1, player1Score);
        }
    }

    function outOfBounds(yPosition:number) {
        return (yPosition < 0 || yPosition + playerHeight > boardHeight)
    }

    function movePlayer(e: KeyboardEvent) {
        e.preventDefault();

        if (e.key == player1.keyUp)
            player1.velocityY = -velocity;
        else if (e.key == player1.keyDown)
            player1.velocityY = velocity;

        if (e.key == player2.keyUp) 
            player2.velocityY = -velocity;
        else if (e.key == player2.keyDown)
            player2.velocityY = velocity;

        keys[e.key] = true;
    }

    function stopPlayer(e: KeyboardEvent) {
        e.preventDefault();

        if (e.key == player1.keyUp && !keys[player1.keyDown]) 
            player1.velocityY = 0;
        else if (e.key == player1.keyDown && !keys[player1.keyUp])
            player1.velocityY = 0;

        if (e.key == player2.keyUp && !keys[player2.keyDown]) 
            player2.velocityY = 0;
        else if (e.key == player2.keyDown && !keys[player2.keyUp])
            player2.velocityY = 0;

        keys[e.key] = false;
    }

    function detectCollision(a:any, b:any) {
        return (a.x < b.x + b.width
            && a.x + a.width > b.x
            && a.y < b.y + b.height
            && a.y + a.height > b.y)
    }

    function resetGame(player:number, score:number) {
        const scorePlayerSpan = document.getElementById(`scorePlayer${player}`);
        scorePlayerSpan!.textContent = score.toString();
        ball = {
            x: boardWith / 2,
            y: boardHeight / 2,
            width: ballWidth,
            height: ballHeight,
            velocityX: player == 1 ? -velocity : velocity,
            velocityY: velocity
        }
    }
}

function renderOnlineGame() {
    let scorePlayer = document.getElementById("scorePlayer");
    let scoreEnnemy = document.getElementById("scoreEnnemy");
    const boardHeight = 630;
    const boardWith = 1340;
    let board:HTMLCanvasElement;
    let context;

    let playerWidth = 10;
    let playerHeight = 100;

    let player = {
        x: 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
    }

    let ennemy = {
        x: boardWith - playerWidth - 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
    }

    let ballWidth = 10;
    let ballHeight = 10;

    let ball = {
        x: boardWith / 2 - (ballWidth / 2),
        y: boardHeight / 2 - (ballHeight / 2),
        width: ballWidth,
        height: ballHeight,
    }

    socket.on("render", (data:any) => {
        player.y = data.playerY;
        ennemy.y = data.ennemyY;
        ball.x = data.ball.x;
        ball.y = data.ball.y;
    });

    socket.on("round", (scores:any) => {
        if (scorePlayer)
            scorePlayer.textContent = String(scores.player);
        if (scoreEnnemy)
            scoreEnnemy.textContent = String(scores.ennemy);
    });

    if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", initGame);
    } else {
        initGame();
    }

    function initGame() {
        scorePlayer!.textContent = "0";
        scoreEnnemy!.textContent = "0";
        board = document.getElementById("board") as HTMLCanvasElement;
        board.height = boardHeight;
        board.width = boardWith;
        context = board.getContext("2d")!;

        document.addEventListener("keydown", movePlayer);
        document.addEventListener("keyup", stopPlayer);
        requestAnimationFrame(update);
    };

    function update() {
        if (scorePlayer!.textContent == "10" || scoreEnnemy!.textContent == "10") {
            socket.removeAllListeners("render");
            socket.removeAllListeners("round");
            endOfMatch(parseInt(scorePlayer!.textContent), parseInt(scoreEnnemy!.textContent));
            return ;
        }

        context!.clearRect(0, 0, board.width, board.height);
        context!.fillStyle = "white";
        
        context!.fillRect(player.x, player.y, player.width, player.height);
        context!.fillRect(ennemy.x, ennemy.y, ennemy.width, ennemy.height);
        context!.fillRect(boardWith / 2 - 1, 0, 2, boardHeight);
        context!.fillRect(ball.x, ball.y, ball.width, ball.height);
        requestAnimationFrame(update);
    }

    function movePlayer(e: KeyboardEvent) {
        if (e.key == state.key.player1.up) {
            socket.emit("move", "up");
        }
        else if (e.key == state.key.player1.down) {
            socket.emit("move", "down");
        }
    }

    function stopPlayer(e: KeyboardEvent) {
        if (e.key == state.key.player1.up) {
            socket.emit("stop", "up");
        }
        else if (e.key == state.key.player1.down) {
            socket.emit("stop", "down");
        }
    }
}

function endOfMatch(playerScore:number, ennemyScore:number) {
    state.ennemy = undefined;
    const app = document.querySelector(".app");
    const result = playerScore > ennemyScore ? "V I C T O R Y" : (playerScore < ennemyScore ? "D E F E A T" : "D R A W");
    const bg = result == "V I C T O R Y" ? "text-green-500" : (result == "D E F E A T" ? "text-red-600" : "text-gray-400");
    app!.innerHTML += `<div id="result" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-form-bg flex flex-col items-center justify-around font-julee rounded-2xl">
        <p id="result" class="text-5xl ${bg}">${result}</p>
        <button id="continue" class="text-black cursor-pointer bg-white text-2xl rounded-3xl w-[150px] hover:scale-110 duration-300">CONTINUER</button>
    </div>`;

    const continueBtn = document.getElementById("continue");

    continueBtn?.addEventListener("click", renderHome);

    state.events = new Map<Element | null, TypeEvent>([
        [continueBtn, {type: "click", callback: renderHome}]
    ]);
}