import { socket, state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderHome } from "../home.js";
import { music } from "../mode/1/music.js";

export function renderGame() {
    const gamePage: PageInstance = {
        content: vues.game.game,
        level: 0,
        create: game
    }
    render(gamePage);
}

export function game() {
    if (state.mode[1] == "l") {
        fillPlayersLocal();
        renderLocalGame();
    } else if (state.mode[1] == "a") {
        fillPlayersAi();
        renderAiGame();
    }
    else {
        fillOnlinePlayers();
        renderOnlineGame();
    }
}

function fillPlayersLocal() {
    const playerPicture = document.getElementById("playerPicture");
    const playerPseudo = document.getElementById("playerPseudo");
    const ennemyPseudo = document.getElementById("ennemyPseudo");
    const ennemyPicture = document.getElementById("ennemyPicture");

    const playerImg = document.createElement("img");
    const ennemyImg = document.createElement("img");

    playerImg.src = state.profile.picture;
    playerImg.className = "w-full h-full rounded-full mx-auto";

    ennemyImg.src = state.profile.picture;
    ennemyImg.className = "w-full h-full rounded-full mx-auto";

    playerPicture!.appendChild(playerImg);
    playerPseudo!.textContent = state.account.pseudo;

    ennemyPicture!.appendChild(ennemyImg);
    ennemyPseudo!.textContent = `${state.account!.pseudo}2`;
}

function fillPlayersAi() {
    const playerPicture = document.getElementById("playerPicture");
    const playerPseudo = document.getElementById("playerPseudo");
    const ennemyPseudo = document.getElementById("ennemyPseudo");
    const ennemyPicture = document.getElementById("ennemyPicture");

    const playerImg = document.createElement("img");
    const ennemyImg = document.createElement("img");

    playerImg.src = state.profile.picture;
    playerImg.className = "w-full h-full rounded-full mx-auto";

    ennemyImg.src = state.profile.picture;
    ennemyImg.className = "w-full h-full rounded-full mx-auto";

    playerPicture!.appendChild(playerImg);
    playerPseudo!.textContent = state.account.pseudo;

    ennemyPicture!.appendChild(ennemyImg);
    ennemyPseudo!.textContent = `AI`;
}

function fillOnlinePlayers() {
    const playerPicture = document.getElementById("playerPicture");
    const playerPseudo = document.getElementById("playerPseudo");
    const ennemyPseudo = document.getElementById("ennemyPseudo");
    const ennemyPicture = document.getElementById("ennemyPicture");

    const playerImg = document.createElement("img");
    const ennemyImg = document.createElement("img");

    playerImg.src = state.profile.picture;
    playerImg.className = "w-full h-full rounded-full mx-auto";
    
    ennemyImg.src = state.ennemy!.picture;
    ennemyImg.className = "w-full h-full rounded-full mx-auto";

    playerPicture!.appendChild(playerImg);
    playerPseudo!.textContent = state.account.pseudo;

    ennemyPicture!.appendChild(ennemyImg);
    ennemyPseudo!.textContent = state.ennemy!.pseudo;
}


function renderAiGame() {
    let scorePlayer = document.getElementById("scorePlayer");
    let scoreEnnemy = document.getElementById("scoreEnnemy");
    const boardHeight = 630;
    const boardWidth = 1340;
    let board:HTMLCanvasElement;
    let context;

    let playerWidth = 15;
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

    let audioContext = null;
    let analyser:any = null;
    let dataArray:any = null;
    let music:any = null;

    let last = Date.now();
    let now = last;

    initGame();

    function initGame() {
        scorePlayer!.textContent = "0";
        scoreEnnemy!.textContent = "0";
        board = document.getElementById("board") as HTMLCanvasElement;
        board.height = boardHeight;
        board.width = boardWidth;
        context = board.getContext("2d")!;

        document.addEventListener("keydown", movePlayer);
        document.addEventListener("keyup", stopPlayer);
        requestAnimationFrame(update);
    };

    function update() {
        if (scorePlayer!.textContent == "10" || scoreEnnemy!.textContent == "10") {
            if (music)
                music.muted = true;
            music = null;
            clearInterval(intervalAI);
            endOfMatch(parseInt(scorePlayer!.textContent), parseInt(scoreEnnemy!.textContent));
            return ;
        }
        now = Date.now();
        const delta = (now - last) / 15;
        last = now;
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
        
        context!.fillRect(boardWidth / 2 - 1, 0, 2, boardHeight);
        
        if (state.mode[0] == 'm') {
            ball.x += parseFloat((ball.velocityX * getLevel() * delta).toFixed(2));
            ball.y += parseFloat((ball.velocityY * getLevel() * delta).toFixed(2));
        } else {
            ball.x += ball.velocityX * delta;
            ball.y += ball.velocityY * delta;
        }
        context!.fillRect(ball.x, ball.y, ball.width, ball.height);
        
        if (ball.y <= 0) {
            ball.velocityY *= -1;
            ball.y = 1;
        }
        if ((ball.y + ball.height) >= boardHeight) {
            ball.velocityY *= -1;
            ball.y = boardHeight - ball.height - 1;
        }
        
        
        if (detectCollision(ball, player1)) {
            if (ball.x <= player1.x + player1.width) {
                ball.x = player1.x + player1.width + 1;
                const random = 0.5 - parseFloat(Math.random().toFixed(2));
                const oldVelocity = Math.abs(ball.velocityX) + Math.abs(ball.velocityY);
                ball.velocityY = random * oldVelocity;
                ball.velocityX = oldVelocity - Math.abs(ball.velocityY);
            }
        }
        else if (detectCollision(ball, player2)) {
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
        requestAnimationFrame(update);
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

        keys[e.key] = true;
    }

    function stopPlayer(e: KeyboardEvent) {
        e.preventDefault();

        if (e.key == player1.keyUp && !keys[player1.keyDown]) 
            player1.velocityY = 0;
        else if (e.key == player1.keyDown && !keys[player1.keyUp])
            player1.velocityY = 0;

        keys[e.key] = false;
    }

    function detectCollision(a:any, b:any) {
        return (a.x < b.x + b.width
            && a.x + a.width > b.x
            && a.y < b.y + b.height
            && a.y + a.height > b.y)
    }

    function resetGame(player:number, score:number) {
        const scorePlayerSpan = document.getElementById(`score${player == 1 ? "Player" : "Ennemy"}`);
        scorePlayerSpan!.textContent = score.toString();
        ball = {
            x: boardWidth / 2,
            y: boardHeight / 2,
            width: ballWidth,
            height: ballHeight,
            velocityX: player == 1 ? -velocity : velocity,
            velocityY: velocity
        }
    }

    let cBall = null;
    let next = 0;
    let maxVelocity = 0;
    let nVelocityX = 0;
    let nVelocityY = 0;
    let timeAI = 1000;
    const intervalAI = setInterval(AIUpdate, timeAI);
    setPaddle();

    function calculNext(cBall:any):number {
        while (cBall.y > 0 && cBall.y + cBall.height < boardHeight && cBall.x + cBall.width <= boardWidth && cBall.x >= 0) {
            cBall.x += nVelocityX;
            cBall.y += nVelocityY;
        }
        if (cBall.x + cBall.width > boardWidth) {
            return cBall.y + cBall.height / 2;
        } else if (cBall.x < 0) {
            return boardHeight / 2;
        } else if (cBall.y <= 0) {
            cBall.y = 1;
            cBall.velocityY *= -1;
            nVelocityY *= -1;
            return calculNext(cBall);
        } else if (cBall.y + cBall.height >= boardHeight) {
            cBall.y = boardHeight - cBall.height - 1;
            cBall.velocityY *= -1;
            nVelocityY *= -1;
            return calculNext(cBall);
        } else
            return boardHeight / 2;
    }

    function setPaddle() {
        if (next < player2.y + player2.height / 2 && player2.y > 0 && Math.abs(player2.y + player2.height / 2 - next) > 20)
            player2.velocityY = -velocity;
        else if (next > player2.y + player2.height / 2 && player2.y + player2.height < boardHeight && Math.abs(player2.y + player2.height / 2 - next) > 20)
            player2.velocityY = velocity;
        else
            player2.velocityY = 0;
        setTimeout(setPaddle, 50);
    }
    
    function AIUpdate() {
        cBall = structuredClone(ball);
        maxVelocity = cBall.velocityX > cBall.velocityY ? cBall.velocityX : cBall.velocityY;
        nVelocityX = cBall.velocityX / maxVelocity;
        nVelocityY = cBall.velocityY / maxVelocity;
        next = calculNext(cBall);
        let max = next + 65;
        let min = next - 65;
        next = Math.random() * (max - min) + min;
    }

    if (state.mode[0] == "m")
        loadMusic();
    function loadMusic() {
        music = new Audio("./style/assets/mp3/music.mp3");
        music.loop = true;
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        
        const gain = audioContext.createGain();
        gain.gain.value = state.volume.general / 100 * state.volume.music / 100;
        console.log(state.volume.general, state.volume.music, gain.gain.value);
        let source = audioContext.createMediaElementSource(music);
        source.connect(analyser);
        analyser.connect(gain);
        gain.connect(audioContext.destination);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        music.play();
    }

    function getLevel() {
        if (!music || !analyser || !dataArray)
            return 0;
        analyser.getByteFrequencyData(dataArray);
        var sum = 0;
        for (var i = 0; i < dataArray.length; i++) {
            sum += dataArray[i] / 255;
        }
        var level = sum / dataArray.length;
        
        return level * 3;
    }
}

function renderLocalGame() {
    let scorePlayer = document.getElementById("scorePlayer");
    let scoreEnnemy = document.getElementById("scoreEnnemy");
    const boardHeight = 630;
    const boardWidth = 1340;
    let board:HTMLCanvasElement;
    let context;

    let playerWidth = 15;
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
        x: boardWidth - playerWidth - 10,
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

    let audioContext = null;
    let analyser:any = null;
    let dataArray:any = null;
    let music:any = null;

    let last = Date.now();
    let now = last;

    initGame();

    function initGame() {
        scorePlayer!.textContent = "0";
        scoreEnnemy!.textContent = "0";
        board = document.getElementById("board") as HTMLCanvasElement;
        board.height = boardHeight;
        board.width = boardWidth;
        context = board.getContext("2d")!;

        document.addEventListener("keydown", movePlayer);
        document.addEventListener("keyup", stopPlayer);
        requestAnimationFrame(update);
    };

    function update() {
        if (scorePlayer!.textContent == "10" || scoreEnnemy!.textContent == "10") {
            if (music)
                music.muted = true;
            music = null;
            endOfMatch(parseInt(scorePlayer!.textContent), parseInt(scoreEnnemy!.textContent));
            return ;
        }
        now = Date.now();
        const delta = (now - last) / 15;
        last = now;
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
        
        context!.fillRect(boardWidth / 2 - 1, 0, 2, boardHeight);
        
        if (state.mode[0] == 'm') {
            ball.x += parseFloat((ball.velocityX * getLevel()).toFixed(2));
            ball.y += parseFloat((ball.velocityY * getLevel()).toFixed(2));
        } else {
            ball.x += ball.velocityX;
            ball.y += ball.velocityY;
        }
        context!.fillRect(ball.x, ball.y, ball.width, ball.height);
        
        if (ball.y <= 0) {
            ball.velocityY *= -1;
            ball.y = 1;
        }
        if ((ball.y + ball.height) >= boardHeight) {
            ball.velocityY *= -1;
            ball.y = boardHeight - ball.height - 1;
        }
        
        
        if (detectCollision(ball, player1)) {
            if (ball.x <= player1.x + player1.width) {
                ball.x = player1.x + player1.width + 1;
                const random = 0.5 - parseFloat(Math.random().toFixed(2));
                const oldVelocity = Math.abs(ball.velocityX) + Math.abs(ball.velocityY);
                ball.velocityY = random * oldVelocity;
                ball.velocityX = oldVelocity - Math.abs(ball.velocityY);
            }
        }
        else if (detectCollision(ball, player2)) {
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

        requestAnimationFrame(update);
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
        const scorePlayerSpan = document.getElementById(`score${player == 1 ? "Player" : "Ennemy"}`);
        scorePlayerSpan!.textContent = score.toString();
        ball = {
            x: boardWidth / 2,
            y: boardHeight / 2,
            width: ballWidth,
            height: ballHeight,
            velocityX: player == 1 ? -velocity : velocity,
            velocityY: velocity
        }
    }

    if (state.mode[0] == "m")
        loadMusic();
        function loadMusic() {
        music = new Audio("./style/assets/mp3/music.mp3");
        music.loop = true;
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        
        const gain = audioContext.createGain();
        gain.gain.value = state.volume.general / 100 * state.volume.music / 100;
        console.log(state.volume.general, state.volume.music, gain.gain.value);
        let source = audioContext.createMediaElementSource(music);
        source.connect(analyser);
        analyser.connect(gain);
        gain.connect(audioContext.destination);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        music.play();
    }

    function getLevel() {
        if (!music || !analyser || !dataArray)
            return 0;
        analyser.getByteFrequencyData(dataArray);
        var sum = 0;
        for (var i = 0; i < dataArray.length; i++) {
            sum += dataArray[i] / 255;
        }
        var level = sum / dataArray.length;
        return level * 3;
    }
}

function renderOnlineGame() {
    let scorePlayer = document.getElementById("scorePlayer");
    let scoreEnnemy = document.getElementById("scoreEnnemy");
    const boardHeight = 630;
    const boardWidth = 1340;
    let board:HTMLCanvasElement;
    let context;

    let playerWidth = 15;
    let playerHeight = 100;

    let player = {
        x: 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
    }

    let ennemy = {
        x: boardWidth - playerWidth - 10,
        y: boardHeight / 2 - playerHeight / 2,
        width: playerWidth,
        height: playerHeight,
    }

    let ballWidth = 10;
    let ballHeight = 10;

    let ball = {
        x: boardWidth / 2 - (ballWidth / 2),
        y: boardHeight / 2 - (ballHeight / 2),
        width: ballWidth,
        height: ballHeight,
    }

    let musicStart = 0;
    let music:any = null;

    socket.on("render", (data:any) => {
        player.y = data.playerY;
        ennemy.y = data.ennemyY;
        ball.x = data.ball.x;
        ball.y = data.ball.y;
        if (musicStart == 0 && state.mode[0] == 'm') {
            musicStart++;
            loadMusic();
        }
    });

    socket.on("round", (scores:any) => {
        if (scorePlayer)
            scorePlayer.textContent = String(scores.player);
        if (scoreEnnemy)
            scoreEnnemy.textContent = String(scores.ennemy);
    });

    initGame();

    function initGame() {
        scorePlayer!.textContent = "0";
        scoreEnnemy!.textContent = "0";
        board = document.getElementById("board") as HTMLCanvasElement;
        board.height = boardHeight;
        board.width = boardWidth;
        context = board.getContext("2d")!;

        document.addEventListener("keydown", movePlayer);
        document.addEventListener("keyup", stopPlayer);
        requestAnimationFrame(update);
    };

    function update() {
        if (scorePlayer!.textContent == "10" || scoreEnnemy!.textContent == "10") {
            if (music)
                music.muted = true;
            music = null;
            socket.removeAllListeners("render");
            socket.removeAllListeners("round");
            endOfMatch(parseInt(scorePlayer!.textContent), parseInt(scoreEnnemy!.textContent));
            return ;
        }

        context!.clearRect(0, 0, board.width, board.height);
        context!.fillStyle = "white";
        
        context!.fillRect(player.x, player.y, player.width, player.height);
        context!.fillRect(ennemy.x, ennemy.y, ennemy.width, ennemy.height);
        context!.fillRect(boardWidth / 2 - 1, 0, 2, boardHeight);
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

    function loadMusic() {
        music = new Audio("./style/assets/mp3/music.mp3");
        music.loop = true;
        music.volume = state.volume.general / 100 * state.volume.music / 100;
        console.log(state.volume.general, state.volume.music, music.volume);
        music.play();
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