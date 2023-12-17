document.addEventListener("DOMContentLoaded", function () {
    let playButton = document.querySelector('.btn-game')
    playButton.addEventListener('click', function () {
        window.location.href = "../game.html"
    })
})

document.addEventListener("DOMContentLoaded", function () {
    let settingsButton = document.querySelector('.btn-options')
    settingsButton.addEventListener('click', function () {
        window.location.href = "../settings.html"
    })
})