"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameCanvas = /** @class */ (function (_super) {
    __extends(GameCanvas, _super);
    function GameCanvas(id) {
        var _this = _super.call(this, id) || this;
        _this.canvasSizeFactor = 5; //the actual drawing size (3 ≙ thrice the size of the canvas pixel dimensions)
        _this.cellSize = 10 * _this.canvasSizeFactor; //size of a single cell in pixels
        _this.canvasWidth = 44 * _this.cellSize; //canvas width in pixels
        _this.canvasHeight = 59 * _this.cellSize; //canvas height in pixels
        //the lines on a college block paper are not flush with the actual end of a paper, so there need to be a small visual offset
        _this.visualFieldOffsetLeft = 0.2 * _this.cellSize;
        _this.visualFieldOffsetTop = 0.8 * _this.cellSize;
        //you are not supposed to play on the whole paper as for example there are holes on the left, where a game would not make sense
        _this.playableFieldOffsetLeft = 5 + 0.2; //+ visualFieldOffsetLeft
        _this.playableFieldOffsetTop = 0 + 0.8; //visualFieldOffsetTop
        //dimensions of the playable field
        _this.playableFieldWidth = 38;
        _this.playableFieldHeight = 57;
        //number of cells from the left until a thick line appears
        _this.thickLine1Offset = 7 * _this.cellSize;
        _this.thickLine2Offset = 38 * _this.cellSize;
        return _this;
    }
    GameCanvas.prototype.draw = function () {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.drawGrid();
        //TODO: redraw already placed lines
    };
    GameCanvas.prototype.drawGrid = function () {
        this.context.strokeStyle = gridColor;
        //draws the whole grid
        this.context.beginPath();
        this.context.lineWidth = 0.5 * this.canvasSizeFactor;
        for (var i = 0; i < this.canvasWidth; i += this.cellSize) {
            this.context.moveTo(i + this.visualFieldOffsetLeft, 0);
            this.context.lineTo(i + this.visualFieldOffsetLeft, this.canvas.height);
        }
        for (var i = 0; i < this.canvasHeight; i += this.cellSize) {
            this.context.moveTo(0, i + this.visualFieldOffsetTop);
            this.context.lineTo(this.canvas.width, i + this.visualFieldOffsetTop);
        }
        this.context.stroke();
        //draws the thick lines
        this.context.beginPath();
        this.context.lineWidth = 1 * this.canvasSizeFactor;
        this.context.moveTo(this.thickLine1Offset + this.visualFieldOffsetLeft, 0);
        this.context.lineTo(this.thickLine1Offset + this.visualFieldOffsetLeft, this.canvas.height);
        this.context.moveTo(this.thickLine2Offset + this.visualFieldOffsetLeft, 0);
        this.context.lineTo(this.thickLine2Offset + this.visualFieldOffsetLeft, this.canvas.height);
        this.context.stroke();
    };
    GameCanvas.prototype.drawLine = function (pos) {
        var calculatedPos = getCanvasPosByCoords(pos.x, pos.y);
        var vertical;
        if (pos.x % 1 == 0) {
            vertical = true;
            calculatedPos.y = calculatedPos.y - (0.5 * this.cellSize);
        }
        else {
            vertical = false;
            calculatedPos.x = calculatedPos.x - (0.5 * this.cellSize);
        }
        this.context.strokeStyle = lineColor;
        this.context.beginPath();
        this.context.lineWidth = 1.5 * this.canvasSizeFactor;
        this.context.moveTo(calculatedPos.x + getRandom(this.canvasSizeFactor), calculatedPos.y + getRandom(this.canvasSizeFactor));
        if (vertical) {
            this.context.lineTo(calculatedPos.x + getRandom(this.canvasSizeFactor), calculatedPos.y + this.cellSize + getRandom(this.canvasSizeFactor));
        }
        else {
            this.context.lineTo(calculatedPos.x + this.cellSize + getRandom(this.canvasSizeFactor), calculatedPos.y + getRandom(this.canvasSizeFactor));
        }
        this.context.stroke();
    };
    //draws a point in a cell
    GameCanvas.prototype.drawPoint = function (score) {
        var fieldCoords = getCanvasPosByCoords(score.x, score.y);
        var randomOffsetTop = getRandom(this.cellSize * 0.3);
        var randomOffsetLeft = getRandom(this.cellSize * 0.3);
        this.context.drawImage(designedPointsMap.get(score.user), fieldCoords.x + randomOffsetLeft, fieldCoords.y + randomOffsetTop, this.cellSize, this.cellSize);
    };
    return GameCanvas;
}(Canvas));
