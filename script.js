console.log("Welcome to Musica");
// Initializing Variables
let songIndex = 0;
let audioElement = new Audio("songs/black-scorpion-music-matrix-132549.mp3");
let masterPlay = document.getElementById('myPlay');
let myPlayerBar = document.getElementById('myPlayerBar');
let gif = document.getElementById('gif');
let songs = [
    { songName: "Black Scorpian Music Matrix", filePath: "songs/black-scorpion-music-matrix-132549.mp3", coverPath: "images/Black-Scorpion-Original-Soundtrack-Recording-English-2015-500x500.jpg" },
    { songName: "Chill Lofi Song", filePath: "songs/chill-lofi-song-8444.mp3", coverPath: "images/chill_lofi.jpg" }
]

//Handle play/pause click
function clickedPlay() {
    audioElement.play();
    document.getElementsByClassName("playbtn")[songIndex].style.display = "none";
    document.getElementsByClassName("pausebtn")[songIndex].style.display = "block";
    gif.style.opacity = 1;
}
function clickedPause() {
    audioElement.pause();
    document.getElementsByClassName("playbtn")[songIndex].style.display = "block";
    document.getElementsByClassName("pausebtn")[songIndex].style.display = "none";
    gif.style.opacity = 0;
}

//handle buttons on PlayerBar

function clickedmyPlay(){
    audioElement.play();
document.getElementById("myPlay").style.display="none";
document.getElementById("myPause").style.display="block";
gif.style.opacity = 1;
}    
function clickedmyPause(){
    audioElement.pause();
    document.getElementById("myPause").style.display="none";
    document.getElementById("myPlay").style.display="block";
    gif.style.opacity = 0;
}

// Listening to Events
audioElement.addEventListener('timeupdate', () => {
// update seekbar
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
 myPlayerBar.value=progress;
})

myPlayerBar.addEventListener('change',()=>{
    audioElement.currentTime = (myPlayerBar.value*audioElement.duration)/100;

})