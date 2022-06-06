const utils = (() => {
    function getById(id) {
        return document.getElementById(id);
    }

    function getBestScore() {
        return JSON.parse(localStorage.getItem('snake')).bestScore;
    }

    function setBestScore(score) {
        localStorage.setItem('snake', JSON.stringify({ bestScore: score }));
    }
    
    return {
        getById,
        getBestScore,
        setBestScore
    }
})();