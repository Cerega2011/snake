
let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")
let startGameButton = document.querySelector(".start")
let scoreText = document.querySelector(".score")
let score = 0
let x = 0 // Начальная позиция по оси X
let y = 0 // Начальная позиция по оси Y
let baseSpeed = 7
let xSpeed = baseSpeed // Скорость перемещения по оси X
let ySpeed = 0 // Скорость перемещения по оси y
let snakeSizeX = canvas.width * 0.02 // Размер змейки
let snakeSizeY = snakeSizeX
let appleSize = 20 // Размер яблока
let appleX // Начальная позиция по оси X для яблока
let appleY// Начальная позиция по оси y для яблока
let XsnakeSize = 40
let tail = [] // Массив для хранения координат хвоста
let gameInterval
let game = document.querySelector('.block-1')
let bonusMusic = new Audio("../sounds/bonus.mp3")
let gameOverMusic = new Audio("../sounds/game-over.mp3")
let menuButtonMusic = new Audio("../sounds/menu-button.mp3")
let phoneMusic = new Audio("../sounds/phone.mp3")
let gameRuning = false

phoneMusic.loop = true

phoneMusic.play()

game.addEventListener('touchmove', myTouchMove); // слышатель на тачмув
game.addEventListener('touchstart', myTouchStart)

// Начальные координаты косания
let startX = null
let startY = null

function upateSpeed() {
    xSpeed = baseSpeed * (canvas.width / 800)
    ySpeed = baseSpeed * (canvas.height / 600)
}

// Функция для обработки начала касания
function myTouchStart(event) {
    let touch = event.touches[0]
    startX = touch.clientX
    startY = touch.clientY
}


// фунция тачмув
function myTouchMove(event) {
    event.preventDefault()

    if (!startX || !startY) {
        return
    }

    let touch = event.touches[0]
    let moveX = touch.clientX - startX
    let moveY = touch.clientY - startY

    // Определяем направление движения пальца
    if (Math.abs(moveX) > Math.abs(moveY)) {
        // Движение по горизонтали
        if (moveX > 0) {
            xSpeed = 7
            ySpeed = 0
        } else {
            xSpeed = -7
            ySpeed = 0
        }
    } else {
        // Движение по вертикали
        if (moveY > 0) {
            xSpeed = 0
            ySpeed = 7
        } else {
            xSpeed = 0
            ySpeed = -7
        }
    }
    startX = null
    startY = null
}

function checkCollision() {
    if (x >= canvas.width - snakeSizeX ||
        x < 0 ||
        y >= canvas.height - snakeSizeY ||
        y < 0
    ) {
        endGame()
    }
}

// Функция для перемещения змейки
function move() {
    checkCollision()
    context.clearRect(0, 0, canvas.width, canvas.height) // Очищаем канвас перед каждым обновлением
    tail.unshift({ x: x, y: y })
    // context.fillRect(x, y, snakeSizeX, snakeSizeY) // Рисуем змейку на новой позиции
    if (tail.length > XsnakeSize / snakeSizeX) {
        tail.pop()
    }
    for (let i = 0; i < tail.length; i++) {
        context.fillRect(tail[i].x, tail[i].y, snakeSizeX, snakeSizeY)

    }

    x = (x + xSpeed + canvas.width) % canvas.width
    y = (y + ySpeed + canvas.height) % canvas.height

    context.fillStyle = "red"
    context.fillRect(appleX, appleY, appleSize, appleSize)
    if (x < appleX + appleSize &&
        x + snakeSizeX > appleX &&
        y < appleY + appleSize &&
        y + snakeSizeY > appleY
    ) {
        generateRandomApplePosition()
        XsnakeSize += 50
        context.fillRect(tail, y, snakeSizeX, snakeSizeY)
        score++
        bonusMusic.play()
        updateScoreText()

    }

}

function generateRandomApplePosition() {
    let padding = 10
    let maxX = canvas.width - appleSize - padding * 2
    let maxY = canvas.height - appleSize - padding * 2
    appleY = Math.floor(Math.random() * maxY) + padding
    appleX = Math.floor(Math.random() * maxX) + padding
}



function endGame() {
    gameOverMusic.play()
    clearInterval(gameInterval)
    alert("Вы умерли, ваш счёт " + score)
    resetGame()

}

function resetGame() {
    gameRuning = false
    score = 0
    baseSpeed = 7
    xSpeed = baseSpeed
    ySpeed = 0
    x = 0
    y = 0
    tail = []
    XsnakeSize = 40
    updateScoreText()
}

function updateScoreText() {
    if (score % 10 === 1 && score % 100 !== 11) {
        scoreText.textContent = "Вы собрали " + score + " яблоко";
    } else if ((score % 10 >= 2 && score % 10 <= 4) && !(score % 100 >= 12 && score % 100 <= 14)) {
        scoreText.textContent = "Вы собрали " + score + " яблока";
    } else {
        scoreText.textContent = "Вы собрали " + score + " яблок";
    }
}

function updateCanvasSize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    snakeSizeX = canvas.width * 0.02
    snakeSizeY = canvas.width * 0.02
    appleSize = canvas.width * 0.03
    appleX = Math.floor(Math.random() * canvas.width)
    appleY = Math.floor(Math.random() * canvas.height)
    upateSpeed()
    generateRandomApplePosition()
}

context.fillStyle = "green"

// Функция для перемещения змейки в зависимости от нажатых клавиш
function moveSnake(event) {
    event.preventDefault();
    if (event.code == "KeyS" || event.code == "ArrowDown") {
        ySpeed = 7
        xSpeed = 0

    }
    else if (event.code == "KeyD" || event.code == "ArrowRight") {
        xSpeed = 7
        ySpeed = 0

    }
    else if (event.code == "KeyA" || event.code == "ArrowLeft") {
        xSpeed = -7
        ySpeed = 0
    }
    else if (event.code == "KeyW" || event.code == "ArrowUp") {
        ySpeed = -7
        xSpeed = 0
    }
}


function startGame() {
    if (gameRuning) {
        alert("Игра уже запущена")
        return
    }
    gameRuning = true
    updateCanvasSize()
    generateRandomApplePosition()
    gameInterval = setInterval(move, 40)
    upateSpeed()
}

window.addEventListener("resize", function () {
    updateCanvasSize()
    generateRandomApplePosition()
    upateSpeed()
    gameInterval = setInterval(move, 40)
})

document.addEventListener("keydown", moveSnake)

startGameButton.addEventListener("click", function () {
    // resetGame()
    startGame()
    menuButtonMusic.play()
})

document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.querySelector('.menu-button')
    menuButton.addEventListener('click', function () {
        menuButtonMusic.play()
        setTimeout(function () {
            window.location.href = "../index.html"
        }, 350)

    })
})