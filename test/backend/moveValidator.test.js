let game;

before(function() {
  game = {
   field: [
     [new Box(0,0),new Box(1,0),new Box(2,0),new Box(3,0),new Box(4,0),new Box(5,0)],
     [new Box(0,1),new Box(1,1),new Box(2,1),new Box(3,1),new Box(4,1),new Box(5,1)],
     [new Box(0,2),new Box(1,2),new Box(2,2),new Box(3,2),new Box(4,2),new Box(5,2)],
     [new Box(0,3),new Box(1,3),new Box(2,3),new Box(3,3),new Box(4,3),new Box(5,3)]
   ]
 }
});

describe('MoveValidator', function() {
  describe('#isBorderClickable()', function() {
    let move = new Move(3, 3, 0);
    let moveValidator = new MoveValidator(move);
    it('should return true when border "top" is clicked (number: 0) on box x: 3, y: 3 and border wasn\'t clicked before.', function() {
      chai.assert.isOk(moveValidator.isBorderClickable());
    });
    it('should return false when border "top" is clicked (number: 0) on box x: 3, y: 3 and border was clicked before.', function() {
      game.field[3][3].top = true;
      chai.assert.isNotOk(moveValidator.isBorderClickable());
    });
  });
});
