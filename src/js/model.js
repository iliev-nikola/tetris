// initial settings of the field
const settings = {
    height: 45,
    width: 30,
    speed: 150,
    speedCounter: 0,
    isGameOver: false,
}

let timer;
let gameBox = []

// initial position of the snake and first dot
const middleY = Math.floor(settings.height / 2);
const middleX = Math.floor(settings.width / 2);

const gameModel = (function () {
    function move(direction) {
        const newCell = {};
        const { x, y } = snake[0];
        // change coordinates by the new direction
        if (direction === 'up') {
            newCell.x = x;
            newCell.y = y - 1;
        } else if (direction === 'right') {
            newCell.x = x + 1;
            newCell.y = y;
        } else if (direction === 'down') {
            newCell.x = x;
            newCell.y = y + 1;
        } else {
            newCell.x = x - 1;
            newCell.y = y;
        }

        // if reach any border
        if (newCell.x < 0) {
            newCell.x = settings.width - 1;
        } else if (newCell.x > settings.width - 1) {
            newCell.x = 0;
        } else if (newCell.y < 0) {
            newCell.y = settings.height - 1;
        } else if (newCell.y > settings.height - 1) {
            newCell.y = 0;
        }

        // check what next cell contains
        const nextCellValue = gameBox[newCell.y][newCell.x];
        if (nextCellValue === 0) {
            // if it's free
            oldCell = snake.pop();
            gameBox[newCell.y][newCell.x] = 1;
            gameBox[oldCell.y][oldCell.x] = 0;
        } else if (nextCellValue === 1) {
            // if it's border or any part of the snake
            settings.isGameOver = true;
            clearInterval(timer);
            GAME_OVER_SCREEN.style.display = 'flex';
            MAIN_CONTAINER.style.opacity = 0.3;
            return;
        } else if (nextCellValue === 2) {
            // if it's food
            gameBox[newCell.y][newCell.x] = 1;
            settings.points += 10;
            if (LEVEL.value === 'auto-speed-increase' || LEVEL.value === 'border-speed') {
                settings.speed -= 3;
            }
            CURRENT_SCORE.innerHTML = settings.points;
            placeRandomDot();
        }

        snake.unshift(newCell);
        lastDirection = direction;
    }

    function rotate(el) {
		el.push(el.shift());
	}

    return {
        move,
        rotate
    }
})();