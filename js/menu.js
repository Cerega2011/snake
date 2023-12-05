document.addEventListener("DOMContentLoaded", function () {
    let playButton = document.querySelector('.btn-game')
    playButton.addEventListener('click', function () {
        window.location.href = "../game.html"
    })
})