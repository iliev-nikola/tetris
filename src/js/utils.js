const utils = (() => {
    const getById = (id) => {
        return document.getElementById(id);
    };

    const getBestScore = () => {
        return JSON.parse(localStorage.getItem('snake')).bestScore;
    };

    const setBestScore = (score) => {
        localStorage.setItem('snake', JSON.stringify({ bestScore: score }));
    };

    const getRandomSide = (figure) => {
		const index = Math.floor(figure.length * Math.random());
		return figure[index];
	};

    const checkAndDestroyFullRow = (gameBox, lastRowIndex) => {
        for (let row = lastRowIndex; row >= 0; row--) {
            if (!gameBox[row].includes(1) && !gameBox[row].includes(2)) {
                break;
            }

            if (gameBox[row].includes(0)) {
                continue;
            }

            gameBox[row].map((el, col) => gameBox[row][col] = 0);
        }
    };
    
    return {
        getById,
        getBestScore,
        setBestScore,
        getRandomSide,
        checkAndDestroyFullRow
    }
})();