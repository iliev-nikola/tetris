// Initial settings of the field
const settings = {
    height: 30,
    width: 20,
    speed: 150,
    speedCounter: 0,
    isGameOver: false,
};

let timer;
let gameBox = [];

// Starting position of the figure
const middleY = Math.floor(settings.width / 2);
const middleX = Math.floor(settings.height / 2);

const gameModel = (() => {
    const moveRight = (figure) => {
		const currentFigure = figure[0];
		const mostRightDotIndex = utils.getMostRightDotIndex(currentFigure);

		for (const dot of currentFigure) {
			// Check if reach the wall
			if (dot.y === settings.width - 1) {
				return false;
			}
			// Check if reach other element
			if (dot.y === mostRightDotIndex && gameBox[dot.x][dot.y + 1] === 1) {
				return false;
			}
		}

		figure.forEach(side => {
			side.forEach(dot => {
				if (dot.y < settings.width) {
					dot.y += 1;
				}
			});
		});

		return true;
	};

	const moveLeft = (figure) => {
		const currentFigure = figure[0];
		const mostLeftDotIndex = utils.getMostLeftDotIndex(currentFigure);

		for (const dot of currentFigure) {
			// Check if reach the wall
			if (dot.y === 0) {
				return false;
			}
			// Check if reach other element
			if (dot.y === mostLeftDotIndex && gameBox[dot.x][dot.y - 1] === 1) {
				return false;
			}
		}
		
		figure.forEach(side => {
			side.forEach(dot => {
				if (dot.y > 0) {
					dot.y -= 1;
				}
			});
		});

		return true;
	};

	const moveDown = (figure) => {
		const currentFigure = figure[0];
		const mostDownDotIndex = utils.getMostDownDotIndex(currentFigure);

		for (const dot of currentFigure) {
			// Check if reach the bottom
			if (dot.x === settings.height - 1) {
				return false;
			}
			// Check if reach other element
			if (dot.x === mostDownDotIndex && gameBox[dot.x + 1][dot.y] === 1) {
				return false;
			}
		}

		figure.forEach(side => {
			side.forEach(dot => {
				if (dot.y < settings.width) {
					dot.x += 1;
				}
			});
		});

		return true;
	};

    const rotate = (figure) => {
		figure.push(figure.shift());
	};

	const getRandomFigure = () => {
		const index = Math.floor(figures.length * Math.random());
		return JSON.parse(JSON.stringify(figures[index]));
	};

    return {
		moveLeft,
        moveRight,
		moveDown,
        rotate,
		getRandomFigure
    }
})();