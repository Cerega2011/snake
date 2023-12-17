document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.querySelector('.menu-Button')
    menuButton.addEventListener('click', function () {
        setTimeout(function () {
            window.location.href = "../index.html"
        }, 350)

    })
})