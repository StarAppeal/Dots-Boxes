class MoveValidator {
    constructor(public move: Move) {
        this.move = move;
    }

    isClickInField() {
        //TODO: todo!
    }

    isBorderClickable() {
        let field: Box = game.field[this.move.x][this.move.y];
        switch (this.move.direction) {
            case 'top':
                return !field.top;
            case 'right':
                return !field.right
            case 'bottom':
                return !field.bot
            case 'left':
                return !field.left;
            default:
                throw "Unknown clickedBorder..";
        }
    }

}
