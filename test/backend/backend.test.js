beforeEach(function() {
    game.field = [
        [new Box(0, 0), new Box(1, 0), new Box(2, 0), new Box(3, 0), new Box(4, 0), new Box(5, 0)],
        [new Box(0, 1), new Box(1, 1), new Box(2, 1), new Box(3, 1), new Box(4, 1), new Box(5, 1)],
        [new Box(0, 2), new Box(1, 2), new Box(2, 2), new Box(3, 2), new Box(4, 2), new Box(5, 2)],
        [new Box(0, 3), new Box(1, 3), new Box(2, 3), new Box(3, 3), new Box(4, 3), new Box(5, 3)]
    ]
});

describe("Backend", function() {
    describe("#createSingleMockedField", function() {
        it("should return a new object with x and y coordinates of input: (5, 9) and top, bot, left and right false and ownedBy = -1", function() {
            let box = createSingleMockedField(5, 9);
            chai.expect(box).to.have.property("x").with.equal(5);
            chai.expect(box).to.have.property("y").with.equal(9);

            chai.expect(box).to.have.property("top").with.to.be.false;
            chai.expect(box).to.have.property("bot").with.to.be.false;
            chai.expect(box).to.have.property("left").with.to.be.false;
            chai.expect(box).to.have.property("right").with.to.be.false;

            chai.expect(box).to.have.property("ownedBy").with.equal(-1);
        });
    });

    describe("#makeMove", function(){
        it("given: Move(x: 2, y: 2, border: 0 [top], border top should then be true and 2,1 bot should be true as well", function(){
                let move = new Move(2,2,0);
                makeMove(move);
                chai.expect(game.field[2][2]).to.have.property("top").with.true;
                chai.expect(game.field[2][1]).to.have.property("bot").with.true;
            })
        it("given: Move(x: 2, y: 2, border: 1 [right], border right should then be true and 3,2 left should be true as well", function(){
            let move = new Move(2,2,1);
            makeMove(move);
            chai.expect(game.field[2][2]).to.have.property("right").with.true;
            chai.expect(game.field[3][2]).to.have.property("left").with.true;
        })
        it("given: Move(x: 2, y: 2, border: 2 [bot], border bot should then be true and 2,3 top should be true as well", function(){
            let move = new Move(2,2,2);
            makeMove(move);
            chai.expect(game.field[2][2]).to.have.property("bot").with.true;
            chai.expect(game.field[2][3]).to.have.property("top").with.true;
        })
        it("given: Move(x: 2, y: 2, border: 3 [left], border left should then be true and 1,2 right should be true as well", function(){
            let move = new Move(2,2,3);
            makeMove(move);
            chai.expect(game.field[2][2]).to.have.property("left").with.true;
            chai.expect(game.field[1][2]).to.have.property("right").with.true;
        })
        it("should return an array of length: 0 when no point is scored with move", function(){
           let changedMoves = makeMove(new Move(2,2,2));
           chai.expect(changedMoves).to.be.lengthOf(0);
        })
        it("should return an array of length: 1 when 1 point is scored with move", function(){
           let field1 = game.field[2][2];
           field1.top = true;
           field1.right = true;
           field1.left = true;
           let changedMoves = makeMove(new Move(2,2,2));
           chai.expect(changedMoves).to.be.lengthOf(1);
        })
        it("should return an array of length: 2 when 2 points are scored with move", function(){
            let field1 = game.field[2][2];
            field1.top = true;
            field1.right = true;
            field1.left = true;

            let field2 = game.field[2][3];
            field2.right = true;
            field2.bot = true;
            field2.left = true

            let changedMoves = makeMove(new Move(2,2,2));

            chai.expect(changedMoves).to.be.lengthOf(2);
        })
    })

    describe("#isPointScored", function(){
        it("should return true when all borders of a box are true", function(){
            let _field = game.field[1][1];
            _field.top = true;
            _field.bot = true
            _field.left = true;
            _field.right = true
            chai.expect(isPointScored(_field)).to.be.true;
        })
        it("should return true when all borders of a box are true but one", function(){
            let _field = game.field[1][1];
            _field.top = false;
            chai.expect(isPointScored(_field)).to.be.false;
        })
    })

});
