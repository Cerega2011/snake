
let phoneMusic = new Audio("../sounds/phone.mp3");

function setVolume(volume) {
    let normalizedVolume = volume / 100;
    if (window.phoneMusic) {
        window.phoneMusic.volume = normalizedVolume;

        localStorage.setItem('volume', volume);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.querySelector('.menu-Button');
    let settingsButton = document.querySelector(".settings-button");


    let savedVolume = localStorage.getItem('volume');
    if (savedVolume) {
        settingsButton.value = savedVolume;
        setVolume(savedVolume);
    }

    settingsButton.addEventListener("input", function (event) {
        let volume = event.target.value;
        setVolume(volume);
    });

    menuButton.addEventListener('click', function () {
        setTimeout(function () {
            window.location.href = "../index.html";
        }, 350);
    });
});
