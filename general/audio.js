document.addEventListener("DOMContentLoaded", function() {
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const nextSongButton = document.getElementById('nextSong');
const image = document.getElementById('image');
const songs = ['../general/MGMT.mp3', '../general/Kinneret.mp3'];
const images = ['../images/1f9953e88ceae76aa8af90498bc91b90.png', '../images/5eee4b14e41c7b041d127204557242ec.jpg', '../images/347e17cb9c56f5fbb6692d7d01928aa3.jpg', '../images/216818_6_trinixy_ru.jpg', '../images/1550598790189552585.jpg', '../images/1550599025154395988.jpg', '../images/arhiv-muzykalnyh-oblozhek_1.jpg', '../images/images.jpg', '../images/arhiv-muzykalnyh-oblozhek_8.jpg', '../images/arhiv-muzykalnyh-oblozhek_4.jpg'];
let isPlaying = false;
let currentSongIndex = 0;

playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

nextSongButton.addEventListener('click', function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    changeSong();
    changeImage();
});

function changeSong() {
    audio.src = songs[currentSongIndex];
    if (isPlaying) {
        audio.play();
    }
}

function changeImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    image.src = randomImage;
}

image.addEventListener('click', function() {
    changeImage();
});

playPauseButton.addEventListener('click', function() {
    changeSong();
});
});