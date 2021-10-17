const controller = (() => {
	// clear the initial data to start from the beginning
	clearInterval(timer);
	timer = null;
	settings.isGameOver = false;
	GAME_OVER_SCREEN.style.display = 'none';
	MAIN_CONTAINER.style.opacity = 1;
	lastDirection = null;
	let figure = figure6.slice();
	figure.forEach(el => {
		el.forEach(dot => {
			dot.x += middleX;
			dot.y += middleY;
		});
	});

    // Make initial render of the box
    function render() {
		MAIN_CONTAINER.innerHTML = '';
		gameBox = [];

        // make the box
		for (let row = 0; row < settings.height; row++) {
			const arr = new Array(settings.width).fill(0);
			gameBox.push(arr);
		}

		placeFigure();
        // render the box
        gameBox.forEach(row => {
            const newRow = document.createElement('div');
            newRow.className = 'row';
            row.forEach(el => {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (el === 1) {
					cell.className += ' tetris-cell';
                } else {
					cell.className += ' empty-cell';
                }

                newRow.append(cell);
            });

            MAIN_CONTAINER.append(newRow);
        });
    }

    render();

    function placeFigure() {
		const currentFigure = figure[0];
        currentFigure.forEach(dot => {
			gameBox[dot.x][dot.y] = 1;
		});
    }

    // EVENT LISTENERS
    document.body.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === ' ') {
            render();
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
            gameModel.rotate(figure);
			render();
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            gameModel.moveRight(figure);
			render();
        } else if (e.key === 'ArrowDown' || e.key === 's') {
			gameModel.moveDown(figure);
			render();
		} else if (e.key === 'ArrowLeft' || e.key === 'a') {
			gameModel.moveLeft(figure);
            render();
        }
    });
})();