const caller: RestCaller = new RestCaller();
const game = {
  currentRound: 0,
  currentPlayer: 0,
  user: [
    {
      id: 1337,
      number: 0,
      points: 5,
    },
    {
      id: 42,
      number: 1,
      points: 51,
    },
  ],
  field: [[]],
};

//var metadata = new UserMetadata();

//console.log(Game.getInstance(metadata));

function createField(maxX: number, maxY: number) {
  for (let x = 0; x < maxX; x++) {
    game.field[x] = [];
    for (let y = 0; y < maxY; y++) {
      game.field[x].push(<never>createSingleMockedField(x, y));
    }
  }
}

function addField(
  beginX: number,
  beginY: number,
  sizeX: number,
  sizeY: number
) {
  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      let field = game.field[beginX + x][beginY + y];
    }
  }
}

function createSingleMockedField(x: number, y: number) {
  return new Box(x, y); // shouldn't work right now (the library is for that matter, called "require.js", no time to look deeper into it right now sorry)
}

function makeMove(move: Move) {
  let result = [];
  let field1: Box = game.field[move.x][move.y];
  let field2: Box = game.field[move.x][move.y];
  switch (move.direction) {
    case "top":
      field1.top = true;
      if (move.y > 0) {
        field2 = game.field[move.x][move.y - 1];
        field2.bot = true;
      }
      break;
    case "right":
      field1.right = true;
      if (move.x < game.field.length - 1) {
        field2 = game.field[move.x + 1][move.y];
        field2.left = true;
      }
      break;
    case "bottom":
      field1.bot = true;
      if (move.y < game.field[move.x].length - 1) {
        field2 = game.field[move.x][move.y + 1];
        field2.top = true;
      }
      break;
    case "left":
      field1.left = true;
      if (move.x > 0) {
        field2 = game.field[move.x - 1][move.y];
        field2.right = true;
      }
      break;
    default:
      throw "Unknown clickedBorder...?";
  }
  if (isPointScored(field1)) {
    field1.ownedBy = game.currentPlayer;
    result.push(field1);
  }
  if (isPointScored(field2)) {
    field2.ownedBy = game.currentPlayer;
    result.push(field2);
  }
  game.currentRound += 1;
  nextPlayer(result.length > 0);
  return result;
}

function isPointScored(box: Box) {
  if (typeof box === "undefined") return false;
  return box.top && box.right && box.bot && box.left;
}

function nextPlayer(pointScored: boolean) {
  if (!pointScored) {
    if (game.currentPlayer == 3) {
      game.currentPlayer = 0;
    } else {
      game.currentPlayer += 1;
    }
  }
}

function isGameFinished() {
  game.field.forEach(function (item: any, index: number) {
    if (!item.right || !item.left || !item.top || !item.bot) return false;
  }); //TODO: change that (may be inefficient)
  return true;
}
