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
	// Moving directions
    const moveRight = (figure) => {
		const currentFigure = figure[0];

		for (let dot of currentFigure) {
			// Check if reach the wall
			if (dot.y === settings.width - 1) {
				return false;
			}
			// Check if reach other element
			if (gameBox[dot.x][dot.y + 1] === 2) {
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

		for (let dot of currentFigure) {
			// Check if reach the wall
			if (dot.y === 0) {
				return false;
			}
			// Check if reach other element
			if (gameBox[dot.x][dot.y - 1] === 2) {
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

		for (let dot of currentFigure) {
			// Check if reach the bottom
			if (dot.x === settings.height - 1) {
				return false;
			}
			// Check if reach other element
			if (gameBox[dot.x + 1][dot.y] === 2) {
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