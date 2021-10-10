const controller = (() => {
    // Make initial render of the box
    function makeInitialBox() {
        // clear the initial data to start from the beginning
        clearInterval(timer);
        timer = null;
        settings.isGameOver = false;
        settings.points = 0;
        settings.speed = 150;
        settings.speedCounter = 0;
        MAIN_CONTAINER.innerHTML = '';
        GAME_OVER_SCREEN.style.display = 'none';
        MAIN_CONTAINER.style.opacity = 1;
        lastDirection = null;
        gameBox = [];

        // make the box
		for (let row = 0; row < settings.height; row++) {
			const arr = new Array(settings.width).fill(0);
			gameBox.push(arr);
		}

        // render the box
        gameBox.forEach(row => {
            const newRow = document.createElement('div');
            newRow.className = 'row';
            row.forEach(el => {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (el === 1) {
					cell.className += ' tetris-cell';
                } else if (el === 2) {
                    cell.className += ' new-cell';
                } else {
					cell.className += ' empty-cell';
                }

                newRow.append(cell);
            });

            MAIN_CONTAINER.append(newRow);
        });
    }

    makeInitialBox();

    function render() {
        const firstCell = snake[0];
        const rows = Array.from(MAIN_CONTAINER.children);
        const firstCells = Array.from(rows[firstCell.y].children);
        const oldCells = Array.from(rows[oldCell.y].children);
        if (THEME.value === 'pixelized') {
            firstCells[firstCell.x].className = 'cell snake-cell';
            oldCells[oldCell.x].className = 'cell empty-cell-pixelized';
        } else if (THEME.value === 'light') {
            firstCells[firstCell.x].className = 'cell snake-cell-light';
            oldCells[oldCell.x].className = 'cell empty-cell-light';
        } else {
            firstCells[firstCell.x].className = 'cell snake-cell';
            oldCells[oldCell.x].className = 'cell empty-cell';
        }
    }

    // EVENT LISTENERS
    // keys
    document.body.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === ' ') {
            return makeInitialBox();
        }

        if (e.key === 'ArrowUp' || e.key === 'w') {
            if (lastDirection === 'up' || lastDirection === 'down') {
                return;
            }
            clearInterval(timer);
            gameModel.move('up');
            if (!settings.isGameOver) {
                render();
                timer = setInterval(() => {
                    gameModel.move('up');
                    render();
                }, settings.speed);
            }
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            if (lastDirection === 'right' || lastDirection === 'left') {
                return;
            } else if (!timer) {
                snake = snake.reverse();
            }
            clearInterval(timer);
            gameModel.move('right');
            if (!settings.isGameOver) {
                render();
                timer = setInterval(() => {
                    gameModel.move('right');
                    render();
                }, settings.speed);
            }
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            if (lastDirection === 'down' || lastDirection === 'up') {
                return;
            }
            clearInterval(timer);
            gameModel.move('down');
            if (!settings.isGameOver) {
                render();
                timer = setInterval(() => {
                    gameModel.move('down');
                    render();
                }, settings.speed);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            if (lastDirection === 'left' || lastDirection === 'right') {
                return;
            }
            clearInterval(timer);
            gameModel.move('left');
            if (!settings.isGameOver) {
                render();
                timer = setInterval(() => {
                    gameModel.move('left');
                    render();
                }, settings.speed);
            }
        }
    });
})();