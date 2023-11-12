let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")
let x = 0 // Начальная позиция по оси X
let y = 0 // Начальная позиция по оси Y
let xSpeed = 10 // Скорость перемещения по оси X
let ySpeed = 0 // Скорость перемещения по оси y
let snakeSize = 40 // Размер змейки
let appleSize = 30 // Размер яблока
let appleX = Math.floor(Math.random() * canvas.width) // Начальная позиция по оси X для яблока
let appleY = Math.floor(Math.random() * canvas.height) // Начальная позиция по оси y для яблока
let XsnakeSize = 40


// Функция для перемещения змейки
function move() {
    context.clearRect(0, 0, canvas.width, canvas.height) // Очищаем канвас перед каждым обновлением
    x = x + xSpeed // Обновляем позицию змейки по оси X
    y = y + ySpeed // Обновляем позицию змейки по оси Y
    context.fillRect(x, y, snakeSize, snakeSize) // Рисуем змейку на новой позиции

    if (x >= 1000) {
        x = 0
    } else if (x < 0) {
        x = 950
    }
    if (y >= 1000) {
        y = 0
    } else if (y < 0) {
        y = 950
    }

    context.fillStyle = "red"
    context.fillRect(appleX, appleY, appleSize, appleSize)
    if (x < appleX + appleSize &&
        x + snakeSize > appleX &&
        y < appleY + appleSize &&
        y + snakeSize > appleY
    ) {
        appleX = Math.floor(Math.random() * canvas.width)
        appleY = Math.floor(Math.random() * canvas.height)
        snakeSize = snakeSize + 30
    }

}





context.fillStyle = "green"
context.fillRect(x, y, snakeSize, snakeSize)

// Функция для перемещения змейки в зависимости от нажатых клавиш
function moveSnake(event) {
    if (event.code == "KeyS") {
        ySpeed = 10
        xSpeed = 0
    }
    else if (event.code == "KeyD") {
        xSpeed = 10
        ySpeed = 0
    }
    else if (event.code == "KeyA") {
        xSpeed = -10
        ySpeed = 0
    }
    else if (event.code == "KeyW") {
        ySpeed = -10
        xSpeed = 0
    }
}

function startGame() {
    setInterval(move, 50)
}





document.addEventListener("keydown", moveSnake)
startGame()

// context.beginPath()
// context.arc(100, 100, 50, 0, 2 * Math.PI)
// context.fillStyle = 'red'
// context.fill()
// context.closePath();