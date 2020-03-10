"use strict";
var MoveValidator = /** @class */ (function () {
    function MoveValidator(move) {
        this.move = move;
        this.move = move;
    }
    MoveValidator.prototype.isClickInField = function () {
        //TODO: todo!
    };
    MoveValidator.prototype.isBorderClickable = function () {
        var field = game.field[this.move.x][this.move.y];
        switch (this.move.clickedBorder) {
            case 0:
                return !field.top;
            case 1:
                return !field.right;
            case 2:
                return !field.bot;
            case 3:
                return !field.left;
            default:
                throw "Unknown clickedBorder..";
        }
    };
    return MoveValidator;
}());
