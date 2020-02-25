const game = {
    currentRound: 0,
    currentPlayer: 0,
    user: [{
        id: 1337,
        number: 0,
        points: 5
    }, {
        id: 42,
        number: 1,
        points: 51
    }],
    field: [
        []
    ]
};

function createField(maxX, maxY) {
    for (let x = 0; x < maxX; x++) {
        game.field[x] = [];
        for (let y = 0; y < maxY; y++) {
            game.field[x].push(createSingleMockedField(x, y));
        }
    }
}

function addField(beginX, beginY, sizeX, sizeY) {
    for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
            let field = game.field[beginX + x][beginY + y];
            if (x === 0) field.top = true;
            if (x === (sizeX - 1)) field.bot = true;
            if (y === 0) field.right = true;
            if (y === (sizeY - 1)) field.left = true;
        }
    }
}

function createSingleMockedField(x, y) {
    return new Box(x, y); // shouldn't work right now (the library is for that matter, called "require.js", no time to look deeper into it right now sorry)
}

function makeMove(move) {
    switch (move.clickedBorder) {
        case 0:
            game.field[move.x][move.y].top = true;
            if (move.x > 0) game.field[move.x - 1][move.y].bot = true;
            break;
        case 1:
            game.field[move.x][move.y].right = true;
            if (move.y > game.field[move.x].length - 2) game.field[move.x][move.y + 1].left = true;
            break;
        case 2:
            game.field[move.x][move.y].bot = true;
            if (move.x < game.field.length - 2) game.field[move.x + 1][move.y].top = true;
            break;
        case 3:
            game.field[move.x][move.y].left = true;
            if (move.y > 0) game.field[move.x][move.y - 1].right = true;
            break;
        default:
            throw "Unknown clickedBorder...?";
    }

}

function isGameFinished(){
    game.field.forEach(value => {
        if (!value.right || !value.left || !value.top || !value.bot) return false;
    }); //TODO: change that (may be inefficient)
    return true;
}
