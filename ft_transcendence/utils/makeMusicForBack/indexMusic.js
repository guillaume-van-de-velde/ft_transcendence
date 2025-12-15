var musicLevels = [];
var audioContext = null;
var analyser = null;
var dataArray = null;
var music = null;
var start = 0;
function loadMusic() {
    music = new Audio("./music.mp3");
    music.loop = false;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    var source = audioContext.createMediaElementSource(music);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    music.play();
    start = Date.now();
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
    var delta = (Date.now() / 1000) - (start / 1000);
    if (delta > music.duration) {
        console.log(musicLevels);
        start = Date.now() * 1.2;
    }
    return level * 3;
}
function init() {
    loadMusic();
    requestAnimationFrame(update);
}
;
function update() {
    musicLevels.push(getLevel());
    requestAnimationFrame(update);
}
var playBtn = document.createElement("button");
playBtn.textContent = "Jouer la musique";
document.body.appendChild(playBtn);
playBtn.addEventListener("click", function () {
    init();
    playBtn.disabled = true; // désactive le bouton après le clic
});
