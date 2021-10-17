// initial settings of the field
const settings = {
    height: 50,
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
    function moveRight(figure) {
		let currentFigure = figure[0];
		if (currentFigure[currentFigure.length - 1].y === settings.width - 1) {
			return;
		}

		figure.forEach(side => {
			side.forEach(dot => {
				if (dot.y < settings.width) {
					dot.y += 1;
				}
			});
		});
	}

	function moveLeft(figure) {
		const currentFigure = figure[0];
		if (currentFigure[0].y === 0) {
			return;
		}

		figure.forEach(side => {
			side.forEach(dot => {
				if (dot.y > 0) {
					dot.y -= 1;
				}
			});
		});
	}

	function moveDown(figure) {
		const currentFigure = figure[0];
		if (currentFigure[0].x === settings.height - 1) {
			// TODO: make logic for next figure here
			return;
		}

		figure.forEach(side => {
			side.forEach(dot => {
				if (dot.y < settings.width) {
					dot.x += 1;
				}
			});
		});
	}

    function rotate(el) {
		el.push(el.shift());
	}

    return {
		moveLeft,
        moveRight,
		moveDown,
        rotate
    }
})();