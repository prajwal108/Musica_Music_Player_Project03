console.log("Welcome to Musica");

// Initializing Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let myPlayerBar = document.getElementById('myPlayerBar')
let gif = document.getElementById('gif');
let myPlay = document.getElementById('myPlay');
let previousBtn = document.getElementById('previousBtn');
let nextBtn = document.getElementById('nextBtn');
let volumeRange = document.getElementById('volumeRange');
let myVolume = document.getElementById('myVolume');
let playerBar = document.getElementById('playerBar');
let curTime = document.getElementById('curTime');
let durTime = document.getElementById('durTime');
let masterSongName = document.getElementById('masterSongName');
let songItemTitles = Array.from(document.getElementsByClassName('songItemTitle'));
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Dark Mystery Time", filePath: "songs/1.mp3", coverPath: "images/1.jpg" },
    { songName: "Cinim Brainfluid", filePath: "songs/2.mp3", coverPath: "images/2.jpg" },
    { songName: "Black Scorpian Music", filePath: "songs/3.mp3", coverPath: "images/3.jpg" },
    { songName: "Chill Lofi Song", filePath: "songs/4.mp3", coverPath: "images/4.jpg" },
    { songName: "Electronic Future Beats", filePath: "songs/5.mp3", coverPath: "images/5.jpg" },
    { songName: "Golden Path", filePath: "songs/6.mp3", coverPath: "images/6.jpg" },
    { songName: "The Blackest Bouquet", filePath: "songs/7.mp3", coverPath: "images/7.jpg" },
    { songName: "Please Calm My Mind", filePath: "songs/8.mp3", coverPath: "images/8.jpg" },
    { songName: "Relaxed lock", filePath: "songs/9.mp3", coverPath: "images/9.jpg" },
    { songName: "Beats of Nature", filePath: "songs/10.mp3", coverPath: "images/10.jpg" }
]

// audioElement duration format
function curTimeString(audioElement) {
    min = parseInt(audioElement.currentTime / 60)
    if (min < 10) {
        minstr = "0" + min + ":";
    } else {
        minstr = min + ":";
    }
    sec = parseInt(((audioElement.currentTime / 60) - min) * 60)
    if (sec < 10) {
        secstr = "0" + sec;
    } else {
        secstr = sec;
    }
    timestr = minstr.concat(secstr);
    return timestr;
}

function durTimeString(audioElement) {
    min = parseInt((audioElement.duration - audioElement.currentTime) / 60)
    if (min < 10) {
        minstr = "0" + min + ":";
    } else {
        minstr = min + ":";
    }
    sec = parseInt((((audioElement.duration - audioElement.currentTime) / 60) - min) * 60)
    if (sec < 10) {
        secstr = "0" + sec;
    } else {
        secstr = sec;
    }
    timestr = minstr.concat(secstr);
    return timestr;
}

//  display titles in container 
songItems.forEach((element, i) => {
    element.getElementsByClassName('songItemTitle')[0].getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songItemTitle')[0].getElementsByTagName('span')[0].innerText = songs[i].songName;

})
//  update and sync play/pause buttons across website
function updateButtons() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        myPlay.getElementsByTagName('img')[0].src = "icons/pause.png";
        gif.style.opacity = 1;
        Array.from(document.getElementsByClassName('playbtn')).forEach((element) => {
            if (songIndex == element.id) {
                makeAllPlays();
                element.getElementsByTagName('img')[0].src = "icons/pause.png";
            }
        })
    } else {
        myPlay.getElementsByTagName('img')[0].src = "icons/play-button.png";
        audioElement.pause();
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName('playbtn')).forEach((element) => {
            // element.getElementsByTagName('img')[0].src = "icons/play-button.png";
            if (songIndex == element.id) {
                makeAllPlays();
                element.getElementsByTagName('img')[0].src = "icons/play-button.png";
            }
        })
    }
}
// Handle play/pause click
myPlay.addEventListener('click', () => {
    updateButtons();
})

// Listening to Events
audioElement.addEventListener('timeupdate', () => {
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myPlayerBar.value = progress;
    curTime.innerText = curTimeString(audioElement);
    durTime.innerText = durTimeString(audioElement);
})

// sync myPlay buttons with audioElement
audioElement.addEventListener('playing', () => {
    myPlay.getElementsByTagName('img')[0].src = "icons/pause.png";
    gif.style.opacity = 1;
})

audioElement.addEventListener('paused', () => {
    myPlay.getElementsByTagName('img')[0].src = "icons/play-button.png";
    Array.from(document.getElementsByClassName('playbtn')).forEach((element) => {
        element.getElementsByTagName('img')[0].src = "icons/play-button.png";
    })
})



myPlayerBar.addEventListener('change', () => {
    audioElement.currentTime = (myPlayerBar.value * audioElement.duration) / 100;

})

// Handles functioning and updates the playlist on container

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playbtn')).forEach((element) => {
        element.getElementsByTagName('img')[0].src = "icons/play-button.png";
    })
}

Array.from(document.getElementsByClassName('playbtn')).forEach((element) => {
    element.addEventListener('click', (e) => {
        playerBar.style.display = 'block';
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        element.getElementsByTagName('img')[0].src = "icons/pause.png";
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        element.getElementsByTagName('img')[0].src = "icons/pause.png";

    })
})
//  Handles functioning after clicking previous button
previousBtn.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    updateButtons();
})

// Handles functioning after clicking next button
nextBtn.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    updateButtons();
})

// update Volume Controls
function updateVolumeRange() {
    if (volumeRange.value == 0) {
        myVolume.getElementsByTagName('img')[0].src = "icons/mute.png";
        audioElement.volume = 0.0;
    } else if (volumeRange.value == 1) {
        myVolume.getElementsByTagName('img')[0].src = "icons/volume.png";
        audioElement.volume = 0.2;
    } else if (volumeRange.value == 2) {
        myVolume.getElementsByTagName('img')[0].src = "icons/volume.png";
        audioElement.volume = 0.4;
    } else if (volumeRange.value == 3) {
        myVolume.getElementsByTagName('img')[0].src = "icons/volume.png";
        audioElement.volume = 0.6;
    } else if (volumeRange.value == 4) {
        myVolume.getElementsByTagName('img')[0].src = "icons/volume.png";
        audioElement.volume = 0.8;
    } else if (volumeRange.value == 5) {
        myVolume.getElementsByTagName('img')[0].src = "icons/volume.png";
        audioElement.volume = 1.0;
    }
}
volumeRange.addEventListener('click', () => {
    updateVolumeRange();
})
volumeRange.addEventListener('change', () => {
    updateVolumeRange();
})
myVolume.addEventListener('click', () => {
    if (volumeRange.value > 0) {
        volumeRange.value = 0;
        updateVolumeRange();
    } else {
        volumeRange.value = 3;
        updateVolumeRange();
    }
})
updateVolumeRange();