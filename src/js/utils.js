const utils = (() => {
  const getById = (id) => {
    return document.getElementById(id);
  };

  const getBestScore = () => {
    return JSON.parse(localStorage.getItem('tetris')).bestScore;
  };

  const setBestScore = (score) => {
    localStorage.setItem('tetris', JSON.stringify({ bestScore: score }));
  };

  const getRandomSide = (figure) => {
    const index = Math.floor(figure.length * Math.random());
    return figure[index];
  };

  const checkAndDestroyFullRows = (gameBox, lastRowIndex) => {
    let destroyedRows = 0;

    for (let row = lastRowIndex; row >= 0; row--) {
      if (!gameBox[row].includes(1) && !gameBox[row].includes(2)) {
        break;
      }

      if (gameBox[row].includes(0)) {
        continue;
      }

      gameBox[row].map((el, col) => gameBox[row][col] = 0);
      destroyedRows++;
    }

    return destroyedRows;
  };

  const moveDownRows = (gameBox, rowIndex, destroyedRows) => {
    const upperDotIndex = getUpperDotRowIndex(gameBox);
    
    for (let row = rowIndex; row >= upperDotIndex; row--) {
      gameBox[row] = JSON.parse(JSON.stringify(gameBox[row - destroyedRows]));
    }
  };

  const getUpperDotRowIndex = (gameBox) => {
    for (let row = 0; row < gameBox.length; row++) {
      if (gameBox[row].includes(2)) {
        return row;
      }
    }
  };

  return {
    getById,
    getBestScore,
    setBestScore,
    getRandomSide,
    checkAndDestroyFullRows,
    moveDownRows
  }
})();