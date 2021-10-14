const controller = (() => {
	// clear the initial data to start from the beginning
	clearInterval(timer);
	timer = null;
	settings.isGameOver = false;
	settings.points = 0;
	settings.speed = 150;
	settings.speedCounter = 0;
	GAME_OVER_SCREEN.style.display = 'none';
	MAIN_CONTAINER.style.opacity = 1;
	lastDirection = null;
	let currentElement = figure4.slice();
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

    render();

    function placeFigure() {
        currentElement[0].forEach(el => {
			gameBox[middleX + el.x][middleY + el.y] = 1;
		});
    }

    // EVENT LISTENERS
    document.body.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === ' ') {
            render();
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
            gameModel.rotate(currentElement);
			render();
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            
        }
    });
})();