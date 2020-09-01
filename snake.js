// Set the color of the background, snake and food
const BG_COLOUR = '#156455';
const SNAKE_COLOUR = '#186483';
const FOOD_COLOUR = '#164645';
var score = 0;

// Use the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var score = 0;

canvas.width = 500;
canvas.height = 500;

const FR = 10;
const S = 20;
const T = canvas.width / S;

let pos, vel, food, snake;

function init() {

    // Position of the snake in the start
    pos = { x: 10, y: 10 };

    // Slope of the snake
    vel = { x: 0, y: 0 };
    
    


    snake = [
        { x: 8, y: 10 },
        { x: 9, y: 10 },
        { x: 10, y: 10 },
    ]
    score = 0;
    // Generate the random location of the food
    randomFood();
}

// Initiate the game
init();

function randomFood() {
    // Generate the food at a random location
    food = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }

    for (let cell of snake) {
        if (cell.x === food.x && food.y === cell.y) {
            return randomFood();
        }
    }
}

// In case of any keypress of arrow keys
document.addEventListener('keydown', keydown);

function keydown(e) {
    // Actions of the arrow keys
    switch (e.keyCode) {
        case 37:
            {
                return vel = { x: -1, y: 0 }
            }
        case 38:
            {
                return vel = { x: 0, y: -1 }
            }
        case 39:
            {
                return vel = { x: 1, y: 0 }
            }
        case 40:
            {
                return vel = { x: 0, y: 1 }
            }
    }
}

// Set the speed of the snake
setInterval(() => {
    requestAnimationFrame(gameLoop);
}, 1000 / FR);



function gameLoop() {
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = SNAKE_COLOUR;
    for (let cell of snake) {
        ctx.fillRect(cell.x * S, cell.y * S, S, S);
    }

    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x * S, food.y * S, S, S);

    pos.x += vel.x;
    pos.y += vel.y;

    if (pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > T) {
        init();
    }

    if (food.x === pos.x && food.y === pos.y) {
        snake.push({...pos });
        pos.x += vel.x;
        pos.y += vel.y;
        randomFood();
        score += 1;
        document.getElementById('score').innerHTML = "Your score is : " + score;
    }

    if (vel.x || vel.y) {
        for (let cell of snake) {
            if (cell.x === pos.x && cell.y === pos.y) {
                return init();
            }
        }
        snake.push({...pos });
        snake.shift();
    }
}
