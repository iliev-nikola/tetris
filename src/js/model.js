// Initial settings of the field
const settings = {
  height: 30,
  width: 20,
  speed: 150,
  speedCounter: 0,
  isGameOver: false,
  points: 0,
  currentBest: 0,
  userBest: 0
};

let timer;
let gameBox = [];

// Starting position of the figure
const middleY = Math.floor(settings.width / 2) - 1;

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
      if (dot.x < 0) {
        return;
      }

      if (gameBox[dot.x][dot.y] === 2) {
        return true;
      }
    }

    return false;
  };

  const getRandomFigure = () => {
    const randomFigureIndex = Math.floor(figures.length * Math.random());
    const randomSideIndex = Math.floor(figures[randomFigureIndex].length * Math.random());
    let figure = JSON.parse(JSON.stringify(figures[randomFigureIndex]))

    for (let i = 0; i < randomSideIndex; i++) {
      figure.unshift(figure.pop());
    }

    return figure;
  };

  const gameOver = () => {
    clearInterval(timer);
    settings.isGameOver = true;
    GAME_OVER_SCREEN.style.display = 'flex';
    MAIN_CONTAINER.style.opacity = 0.3;
  };

  const showNextElement = (element) => {
    NEXT_ELEMENT_WINDOW.innerHTML = '';
    const nextElementBox = [];

    for (let row = 0; row < 6; row++) {
      const currentRow = arr = new Array(6).fill(0);
      nextElementBox.push(currentRow);
    }

    const moveLeft = element.some(dot => dot.y === 3);
    const verticalDots = moveLeft ? 1 : 2;
    const moveUp = element.some(dot => dot.x === 3 || dot.x === 2);
    const horizontalDots = moveUp ? 1 : 2;

    element.forEach(dot => {
			nextElementBox[dot.x + horizontalDots][dot.y + verticalDots] = 1;
		});

    // Render the box
    nextElementBox.forEach(row => {
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

      NEXT_ELEMENT_WINDOW.append(newRow);
    });
  };

  return {
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    getRandomFigure,
    gameOver,
    showNextElement
  }
})();