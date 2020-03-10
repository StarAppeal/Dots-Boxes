"use strict";
var LineValidator = /** @class */ (function () {
    function LineValidator(linePos) {
        this.linePos = linePos;
        this.linePos = linePos;
    }
    LineValidator.prototype.isLineInsidePlayableArea = function (playableFieldWidth, playableFieldHeight) {
        return this.linePos.x >= 0 && this.linePos.x <= playableFieldWidth
            && this.linePos.y >= 0 && this.linePos.y <= playableFieldHeight;
    };
    LineValidator.prototype.isLineValid = function () {
        return this.linePos.x % 1 != this.linePos.y % 1;
    };
    LineValidator.prototype.isMarkerVertical = function () {
        return this.linePos.x % 1 == 0;
    };
    return LineValidator;
}());
