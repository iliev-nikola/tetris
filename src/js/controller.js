const controller = (() => {
	// Clear the initial data to start from the beginning
	let currentGameBox;
	let figure;
	let currentFigure;

	const reset = () => {
		clearInterval(timer);
		timer = null;
		settings.isGameOver = false;
		currentGameBox = null;
		GAME_OVER_SCREEN.style.display = 'none';
		MAIN_CONTAINER.style.opacity = 1;
		figure = gameModel.getRandomFigure();
		figure.forEach(side => {
			side.forEach(dot => {
				dot.x += 1;
				dot.y += middleY;
			});
		});
	}

	reset();

	const newFigure = () => {
		figure = gameModel.getRandomFigure();
		figure.forEach(side => {
			side.forEach(dot => {
				dot.x += 1;
				dot.y += middleY;
			});
		});
	}

	const placeFigure = () => {
		currentFigure = figure[0];
        currentFigure.forEach(dot => {
			gameBox[dot.x][dot.y] = 1;
		});
    }

    // Make initial render of the box
    const render = () => {
		MAIN_CONTAINER.innerHTML = '';
		
		// Make game field
		gameBox = [];

		for (let row = 0; row < settings.height; row++) {
			let arr = [];
			if (!currentGameBox) {
				arr = new Array(settings.width).fill(0);
			} else {
				for (let col = 0; col < settings.width; col++) {
					arr[col] = currentGameBox[row][col];
				}
			}

			gameBox.push(arr);
		}

		placeFigure();

        // Render the box
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

	const start = () => {
		timer = setInterval(() => {
			if (gameModel.moveDown(figure)) {
				render();
			} else {
				currentGameBox = gameBox;
				// check for rows to destroy
				newFigure();
			}
		}, 400);
	}

    // EVENT LISTENERS
    document.body.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === ' ') {
			reset();
			start();
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
            gameModel.rotate(figure);
			render();
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            if (gameModel.moveRight(figure)) {
				render();
			}
        } else if (e.key === 'ArrowDown' || e.key === 's') {
			if (gameModel.moveDown(figure)) {
				render();
			}
		} else if (e.key === 'ArrowLeft' || e.key === 'a') {
			if (gameModel.moveLeft(figure)) {
				render();
			}
        }
    });
})();