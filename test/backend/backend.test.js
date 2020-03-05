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
});
