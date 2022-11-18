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
	const moveLeft = (figure) => {
		const currentFigure = figure[0];

		for (const dot of currentFigure) {
			// Check if reach the wall
			if (dot.y <= 0) {
				return false;
			}
			// Check if reach other element
			if (gameBox[dot.x][dot.y - 1] === 2) {
				return false;
			}
		}

		for (const side of figure) {
			if (side.some(dot => dot.y - 1 < 0)) {
				break;
			}

			side.forEach(dot => dot.y -= 1);
		}

		return true;
	};

    const moveRight = (figure) => {
		const currentFigure = figure[0];

		for (const dot of currentFigure) {
			// Check if reach the wall
			if (dot.y === settings.width - 1) {
				return false;
			}
			// Check if reach other element
			if (gameBox[dot.x][dot.y + 1] === 2) {
				return false;
			}
		}

		for (const side of figure) {
			if (side.some(dot => dot.y + 1 >= settings.width)) {
				break;
			}

			side.forEach(dot => dot.y += 1);
		}

		return true;
	};

	const moveDown = (figure) => {
		const currentFigure = figure[0];

		for (const dot of currentFigure) {
			// Check if reach the bottom
			if (dot.x === settings.height - 1) {
				return false;
			}
			// Check if reach other element
			if (gameBox[dot.x + 1][dot.y] === 2) {
				return false;
			}
		}

		for (const side of figure) {
			if (side.some(dot => dot.x + 1 >= settings.height)) {
				break;
			}

			side.forEach(dot => dot.x += 1);
		}

		return true;
	};

    const rotate = (figure) => {
		if (figure.length > 1 && !isEventuallyTouchOtherFigure(figure[1])) {
			figure.push(figure.shift());
		}
	};

	const isEventuallyTouchOtherFigure = (side) => {
		for (const dot of side) {
			if (gameBox[dot.x][dot.y] === 2) {
				return true;
			}
		}

		return false;
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