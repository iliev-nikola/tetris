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

		for (const dot of currentFigure) {
			if (dot.y === settings.width - 1) {
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
	}

	const moveLeft = (figure) => {
		const currentFigure = figure[0];

		for (const dot of currentFigure) {
			if (dot.y === 0) {
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
	}

	const moveDown = (figure) => {
		const currentFigure = figure[0];
		checkNextRow(currentFigure);

		for (const dot of currentFigure) {
			if (dot.x === settings.height - 1) {
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
	}

	const checkNextRow = (figure) => {
		figure.forEach(dot => {
			console.log(dot)
		});
	}

    const rotate = (figure) => {
		figure.push(figure.shift());
	}

	const getRandomFigure = () => {
		const index = Math.floor(figures.length * Math.random());
		return JSON.parse(JSON.stringify(figures[index]));
	}

	const getRandomSide = (figure) => {
		const index = Math.floor(figure.length * Math.random());
		return figure[index];
	}

    return {
		moveLeft,
        moveRight,
		moveDown,
        rotate,
		getRandomFigure,
		getRandomSide
    }
})();