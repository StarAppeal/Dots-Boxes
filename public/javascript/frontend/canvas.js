"use strict";
var Canvas = /** @class */ (function () {
    function Canvas(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
    }
    return Canvas;
}());
