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

	const getMostLeftDotIndex = (figure) => {
		for (let i = 0; i < settings.width; i++) {
			if (figure.some(dot => dot.y === i)) {
				return i;
			}
		}
	};

	const getMostRightDotIndex = (figure) => {
		for (let i = settings.width - 1; i >= 0; i--) {
			if (figure.some(dot => dot.y === i)) {
				return i;
			}
		}
	};

	const getMostDownDotIndex = (figure) => {
        let mostDown = 0;
        figure.forEach(dot => {
            if (dot.x > mostDown) {
                mostDown = dot.x;
            }
        });

        return mostDown;
	};
    
    return {
        getById,
        getBestScore,
        setBestScore,
        getRandomSide,
        getMostLeftDotIndex,
        getMostRightDotIndex,
        getMostDownDotIndex
    }
})();