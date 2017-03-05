let Piece = require('./Piece');

let currentBag = [];

module.exports = {
    generateNewBag,
    random() {
        if (currentBag.length === 0) {
            currentBag = generateNewBag(Piece.Types);
        }

        let randIndex = Math.floor(Math.random() * currentBag);
        let type = currentBag.splice(randIndex, 1)[0];

        return Piece.create({type: type});
    },
}

function generateNewBag(sourceSet) {
    let allPieces = sourceSet.slice(0);
    let bag = [];

    while (allPieces.length > 0) {
        let randIndex = Math.floor(Math.random() * allPieces.length);
        let nextPiece = allPieces.splice(randIndex, 1)[0];

        bag.push(nextPiece);
    }

    return bag;
}