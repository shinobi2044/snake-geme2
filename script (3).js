// 1. CONECTAR COM O HTML (PARTE 1)
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const size = 20 

// COMO A COBRA FOI FEITA 001 (ME ACOMPANHE...)
// A cabeça da cobra é o ÚLTIMO elemento do array (index: snake.length - 1)
let snake = [
    {x: 200, y: 200},
    {x: 220, y: 200},
    {x: 240, y: 200} // Cabeça inicial
] 
let direction;
let loopId;

// --- REGRAS DA MAÇÃ ---
// Função para gerar um número aleatório múltiplo de 20 (dentro do grid)
const randomNum = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNum(0, canvas.width - size)
    return Math.round(number / size) * size
}

// Posição inicial da maçã
let food = {
    x: randomPosition(),
    y: randomPosition(),
    color: "red"
}

const drawFood = () => {
    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)
}

// Como a cobra foi feita 002 (tá mais pra cubo né? kkkkkkk)
const drawSnake = () => {
    snake.forEach((position, index) => {
        // Define a cor do corpo
        ctx.fillStyle = "#00aeff"

        // Se for o último elemento, é a cabeça, então muda a cor para Cyan
        if (index === snake.length - 1) {
            ctx.fillStyle = "cyan"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    const head = snake[snake.length - 1]
    if (!direction) return

    let newHead = { x: head.x, y: head.y }

    // Correção da string "right"
    if (direction === "right") {
        newHead.x += size
    }
    if (direction === "left") {
        newHead.x -= size
    }
    if (direction === "down") {
        newHead.y += size
    }
    if (direction === "up") {
        newHead.y -= size
    }

    snake.push(newHead)

    // Se a cabeça comer a maçã
    if (newHead.x === food.x && newHead.y === food.y) {
        // Cria uma nova maçã em lugar aleatório
        food.x = randomPosition()
        food.y = randomPosition()
        // Não remove o último gomo (a cobra cresce)
    } else {
        // Remove o último gomo da cauda para dar o efeito de movimento normal
        snake.shift()
    }
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"
    for (let x = 0; x < canvas.width; x += size) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += size) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
    }
}

// --- REGRA DO GAME OVER ---
const checkCollision = () => {
    const head = snake[snake.length - 1]
    
    // Se bater nas paredes do canvas (0 até 600)
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined // Para o movimento
    alert("Game Over! Tente novamente se tiver coragem....")
    
    // Reinicia a cobra para a posição inicial
    snake = [
        {x: 200, y: 200},
        {x: 220, y: 200},
        {x: 240, y: 200}
    ]
    food.x = randomPosition()
    food.y = randomPosition()
}

const gameLoop = () => {
    clearTimeout(loopId) //Se usa setTimeout, limpamos com clearTimeout

    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    drawGrid()
    drawFood() // Desenha a maçã
    drawSnake()
    moveSnake()
    checkCollision() // Verifica se perdeu
    
    loopId = setTimeout(() => {
        gameLoop()
    }, 75)
}

gameLoop()

// Capturando os movimentos do teclado corretamente (VULGO "DOR DE CABEÇA....") 
document.addEventListener("keydown", (event) => {
    const key = event.key // Pegando a propriedade key do evento

    if (key === "ArrowRight" && direction !== "left") {
        direction = "right"
    }
    if (key === "ArrowLeft" && direction !== "right") {
        direction = "left"
    }
    if (key === "ArrowUp" && direction !== "down") {
        direction = "up"
    }
    if (key === "ArrowDown" && direction !== "up") {
        direction = "down"
    }
})