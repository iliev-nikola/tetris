const controller = (() => {
	// Clear the initial data to start from the beginning
	let currentGameBox;
	let figure;
	let currentFigure;
  let nextFigure;

  if (localStorage.getItem('tetris')) {
    const bestScore = utils.getBestScore();
    USER_BEST.innerHTML = bestScore;
    settings.userBest = bestScore;
  } else {
    utils.setBestScore(0);
    USER_BEST.innerHTML = 0;
  }

	const reset = () => {
    // set points rendering
    if (settings.points > settings.currentBest) {
      settings.currentBest = settings.points;
      CURRENT_BEST.innerHTML = settings.points;
    }

    if (settings.points > settings.userBest) {
      settings.userBest = settings.points;
      utils.setBestScore(settings.points);
      USER_BEST.innerHTML = settings.userBest;
    }

    // clear the initial data to start from the beginning
		clearInterval(timer);
		timer = null;
		settings.isGameOver = false;
    settings.points = 0;
		currentGameBox = null;
		figure = gameModel.getRandomFigure();
    nextFigure = gameModel.getRandomFigure();
    gameModel.showNextElement(nextFigure[0]);
		GAME_OVER_SCREEN.style.display = 'none';
		MAIN_CONTAINER.style.opacity = 1;
    CURRENT_SCORE.innerHTML = settings.points;

		figure.forEach(side => {
			side.forEach(dot => {
				dot.y += middleY;
			});
		});
	};

	const makeFigureLastMove = () => {
		let lastRowIndex = 0;

		currentFigure.forEach(dot => {
			if (dot.x > lastRowIndex) {
				lastRowIndex = dot.x;
			}

			gameBox[dot.x][dot.y] = 2;
		});

    settings.points += 2;
    CURRENT_SCORE.innerHTML = settings.points;
    
		return lastRowIndex;
	};

	reset();

	const newFigure = () => {
		figure = nextFigure;
    
		figure.forEach(side => {
      side.forEach(dot => {
        dot.y += middleY;
			});
		});
    
    const currentFigure = figure[0];
    
    if (utils.isGameOver(currentFigure, gameBox)) {
      gameModel.gameOver();
    }
    
    nextFigure = gameModel.getRandomFigure();
    gameModel.showNextElement(nextFigure[0]);
	};

	const placeFigure = () => {
		currentFigure = figure[0];

		currentFigure.forEach(dot => {
			gameBox[dot.x][dot.y] = 1;
		});
	};

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

				if (el === 1 || el === 2) {
					cell.className += ' tetris-cell';
				} else {
					cell.className += ' empty-cell';
				}

				newRow.append(cell);
			});

			MAIN_CONTAINER.append(newRow);
		});
	};

	render();

	const start = () => {
		timer = setInterval(() => {
			if (gameModel.moveDown(figure)) {
				render();
			} else {
				currentGameBox = gameBox;
				const lastRowIndex = makeFigureLastMove();
				const destroyedRows = utils.checkAndDestroyFullRows(currentGameBox, lastRowIndex);

				if (destroyedRows > 0) {
          utils.moveDownRows(currentGameBox, lastRowIndex, destroyedRows);

          for (let i = 0; i < destroyedRows; i++) {
            settings.points += 20;
          }

          CURRENT_SCORE.innerHTML = settings.points;
				}

				newFigure();
			}
		}, 400);
	};

	// EVENT LISTENERS
	document.body.addEventListener('keydown', (e) => {
		e.preventDefault();

		if (e.key === KEYS.space) {
			reset();
      render();
			start();
		} else if (e.key === KEYS.up || e.key === 'w') {
			gameModel.rotate(figure);
			render();
		} else if (e.key === KEYS.right || e.key === 'd') {
			if (gameModel.moveRight(figure)) {
				render();
			}
		} else if (e.key === KEYS.down || e.key === 's') {
			if (gameModel.moveDown(figure)) {
				render();
			}
		} else if (e.key === KEYS.left || e.key === 'a') {
			if (gameModel.moveLeft(figure)) {
				render();
			}
		}
	});
})();