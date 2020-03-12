class MoveValidator {
    constructor(public move: Move) {
        this.move = move;
    }

    isClickInField() {
        //TODO: todo!
    }

    isBorderClickable() {
        let field: Box = game.field[this.move.x][this.move.y];
        switch (this.move.clickedBorder) {
            case 0:
                return !field.top;
            case 1:
                return !field.right
            case 2:
                return !field.bot
            case 3:
                return !field.left;
            default:
                throw "Unknown clickedBorder..";
        }
    }

}
