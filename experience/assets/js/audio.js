// AUDIO PLAYER

var audio1 = document.getElementById("audio");
var isPlaying = false;

function togglePlay() {
    isPlaying ? audio1.pause() : audio1.play();
};

// audio is playing
audio1.onplaying = function () {
    isPlaying = true;

    // change icon with active class
    document.getElementById("audio-icon").classList.add("active");
};

// audio is paused
audio1.onpause = function () {
    isPlaying = false;

    // change icon with active class
    document.getElementById("audio-icon").classList.remove("active");
};
