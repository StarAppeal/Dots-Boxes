class GameCanvas extends Canvas {
    constructor(id) {
        super(id);
        this.canvasSizeFactor = 5; //the actual drawing size (3 ≙ thrice the size of the canvas pixel dimensions)
        this.cellSize = 10 * this.canvasSizeFactor; //size of a single cell in pixels
        this.canvasWidth = 44 * this.cellSize; //canvas width in pixels
        this.canvasHeight = 59 * this.cellSize; //canvas height in pixels
        //the lines on a college block paper are not flush with the actual end of a paper, so there need to be a small visual offset
        this.visualFieldOffsetLeft = 0.2 * this.cellSize;
        this.visualFieldOffsetTop = 0.8 * this.cellSize;
        //you are not supposed to play on the whole paper as for example there are holes on the left, where a game would not make sense
        this.playableFieldOffsetLeft = 5 + 0.2; //+ visualFieldOffsetLeft
        this.playableFieldOffsetTop = 0 + 0.8; //visualFieldOffsetTop
        //dimensions of the playable field
        this.playableFieldWidth = 38;
        this.playableFieldHeight = 57;
        //number of cells from the left until a thick line appears
        this.thickLine1Offset = 7 * this.cellSize;
        this.thickLine2Offset = 38 * this.cellSize;
    }
    draw() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.drawGrid();
        //TODO: redraw already placed lines
    }
    drawGrid() {
        this.context.strokeStyle = gridColor;
        //draws the whole grid
        this.context.beginPath();
        this.context.lineWidth = 0.5 * this.canvasSizeFactor;
        for (let i = 0; i < this.canvasWidth; i += this.cellSize) {
            this.context.moveTo(i + this.visualFieldOffsetLeft, 0);
            this.context.lineTo(i + this.visualFieldOffsetLeft, this.canvas.height);
        }
        for (let i = 0; i < this.canvasHeight; i += this.cellSize) {
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
    }
    drawLine(pos) {
        let calculatedPos = getCanvasPosByCoords(pos.x, pos.y);
        let vertical;
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
    }
    //draws a point in a cell
    drawPoint(score) {
        let fieldCoords = getCanvasPosByCoords(score.x, score.y);
        let randomOffsetTop = getRandom(this.cellSize * 0.3);
        let randomOffsetLeft = getRandom(this.cellSize * 0.3);
        this.context.drawImage(designedPointsMap.get(score.user), fieldCoords.x + randomOffsetLeft, fieldCoords.y + randomOffsetTop, this.cellSize, this.cellSize);
    }
}
