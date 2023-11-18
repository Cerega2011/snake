let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")
let startGameButton = document.querySelector(".start")
let scoreText = document.querySelector(".score")
let score = 0
let x = 0 // Начальная позиция по оси X
let y = 0 // Начальная позиция по оси Y
let xSpeed = 10 // Скорость перемещения по оси X
let ySpeed = 0 // Скорость перемещения по оси y
let snakeSizeX = 20 // Размер змейки
let snakeSizeY = 20
let appleSize = 20 // Размер яблока
let appleX = Math.floor(Math.random() * canvas.width) // Начальная позиция по оси X для яблока
let appleY = Math.floor(Math.random() * canvas.height) // Начальная позиция по оси y для яблока
let XsnakeSize = 40
let tail = [] // Массив для хранения координат хвоста
let gameInterval



// Функция для перемещения змейки
function move() {
    context.clearRect(0, 0, canvas.width, canvas.height) // Очищаем канвас перед каждым обновлением
    tail.unshift({ x: x, y: y })
    // context.fillRect(x, y, snakeSizeX, snakeSizeY) // Рисуем змейку на новой позиции
    if (tail.length > XsnakeSize / snakeSizeX) {
        tail.pop()
    }
    for (let i = 0; i < tail.length; i++) {
        context.fillRect(tail[i].x, tail[i].y, snakeSizeX, snakeSizeY)
    }


    if (x == 1000) {
        endGame()
    } else if (x == -10) {
        endGame()
    } else if (y == 1000) {
        endGame()
    } else if (y == - 10) {
        endGame()
    }

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


    x = x + xSpeed // Обновляем позицию змейки по оси X
    y = y + ySpeed // Обновляем позицию змейки по оси Y
    context.fillStyle = "red"
    context.fillRect(appleX, appleY, appleSize, appleSize)
    if (x < appleX + appleSize &&
        x + snakeSizeX > appleX &&
        y < appleY + appleSize &&
        y + snakeSizeY > appleY
    ) {
        appleX = Math.floor(Math.random() * canvas.width)
        appleY = Math.floor(Math.random() * canvas.height)
        // snakeSizeX = snakeSizeX + 30
        XsnakeSize += 50
        context.fillRect(tail, y, snakeSizeX, snakeSizeY)
        score++
        if (score % 10 === 1 && score % 100 !== 11) {
            scoreText.textContent = "Вы собрали " + score + " яблоко";
        } else if ((score % 10 >= 2 && score % 10 <= 4) && !(score % 100 >= 12 && score % 100 <= 14)) {
            scoreText.textContent = "Вы собрали " + score + " яблока";
        } else {
            scoreText.textContent = "Вы собрали " + score + " яблок";
        }


    }

}



function endGame() {
    clearInterval(gameInterval)
    alert("Вы умерли, ваш счёт  " + score)
    startGame()
}

context.fillStyle = "green"
context.fillRect(x, y, snakeSizeX, snakeSizeY)

// Функция для перемещения змейки в зависимости от нажатых клавиш
function moveSnake(event) {
    event.preventDefault();
    if (event.code == "KeyS") {
        console.log(10)
        ySpeed = 10
        xSpeed = 0

    }
    else if (event.code == "KeyD") {
        console.log(10)
        xSpeed = 10
        ySpeed = 0

    }
    else if (event.code == "KeyA") {
        console.log(10)
        xSpeed = -10
        ySpeed = 0
    }
    else if (event.code == "KeyW") {
        console.log(10)
        ySpeed = -10
        xSpeed = 0
    } else if (event.code == "ArrowDown") {
        console.log(10)
        ySpeed = 10
        xSpeed = 0
    } else if (event.code == "ArrowUp") {
        console.log(10)
        ySpeed = -10
        xSpeed = 0
    } else if (event.code == "ArrowLeft") {
        console.log(10)
        ySpeed = 0
        xSpeed = -10
    } else if (event.code == "ArrowRight") {
        console.log(10)
        ySpeed = 0
        xSpeed = 10
    }
}


function startGame() {
    gameInterval = setInterval(move, 40)

}



document.addEventListener('touchmove', function (event) {
    // Отменяем стандартное поведение браузера (чтобы страница не скроллилась)
    event.preventDefault();

    // Получаем координаты точки касания
    let touch = event.touches[0];

    // Если это начало касания, сохраняем начальную точку
    if (!startY) {
        startY = touch.clientY;
        return;
    }

    // Сохраняем конечную точку касания
    endY = touch.clientY;

    // Если разница между начальной и конечной точкой касания больше определенного порога (например, 100 пикселей),
    // считаем это смахиванием вниз и выполняем какое-то действие
    let deltaY = endY - startY;
    if (deltaY > 100) {
        // Здесь выполняйте необходимое действие
        console.log('Смахивание вниз произошло!');

        // Сбрасываем начальную точку, чтобы можно было обнаружить следующее смахивание
        startY = null;
    }
}, { passive: false }); // Важно указать { passive: false }, чтобы отменить стандартное поведение браузера

document.addEventListener("keydown", moveSnake)

startGameButton.addEventListener("click", startGame)

// context.beginPath()
// context.arc(100, 100, 50, 0, 2 * Math.PI)
// context.fillStyle = 'red'
// context.fill()
// context.closePath();