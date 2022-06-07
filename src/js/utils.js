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
    
    return {
        getById,
        getBestScore,
        setBestScore,
        getRandomSide
    }
})();