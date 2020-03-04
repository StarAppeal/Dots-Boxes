//HTML elements
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const page = document.getElementById("page")
const parentEl = document.getElementById("parent")

let canvasSizeFactor = 3 //the actual drawing size (3 ≙ thrice the size of the canvas pixel dimensions)
const cellSize = 10 * canvasSizeFactor //size of a single cell in pixels
const canvasWidth = 44 * cellSize //canvas width in pixels
const canvasHeight = 59 * cellSize //canvas height in pixels

//the lines on a college block paper are not flush with the actual end of a paper, so there need to be a small visual offset
const visualFieldOffsetLeft = 0.2 * cellSize
const visualFieldOffsetTop = 0.8 * cellSize

//you are not supposed to play on the whole paper as for example there are holes on the left, where a game would not make sense
const playableFieldOffsetLeft = 5 +0.2//+ visualFieldOffsetLeft
const playableFieldOffsetTop = 0 + 0.8//visualFieldOffsetTop

//dimensions of the playable field
const playableFieldWidth = 38
const playableFieldHeight = 57

//number of cells from the left until a thick line appears
const thickLine1Offset = 7 * cellSize
const thickLine2Offset = 38 * cellSize

//colors
const gridColor = "#bcd1d8"
const lineColor = "#5984db"

let markerPos = {}

setFluffStyles()
redraw()

//adding all events to the window and marker
window.addEventListener('mousemove', snapMarkerToGrid)
const marker = document.getElementById("hoverMarker")
window.oncontextmenu = function (e) {
    e.preventDefault()
}
marker.addEventListener('mouseup', markerClick)


//fluff is the remaining stuff to the left of the paper when it gets pulled out of a college block
function setFluffStyles() {
    let fluffClassArray = Array("fluff-standard-top", "fluff-standard-bottom", "fluff-ripped") //predefined array of all possible style classes a "fluff" can take on
    let fluffList = document.getElementsByClassName("fluff")
    let randomFluffClass
    for (let item of fluffList) { //appends random fluff class to every fluff
        randomFluffClass = fluffClassArray[Math.floor(Math.random()*fluffClassArray.length)]
        item.classList.add(randomFluffClass)
    }
}

function redraw() {
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    drawGrid()
    //TODO: redraw already placed lines
}

function drawGrid() {
    ctx.strokeStyle = gridColor

    //draws the whole grid
    ctx.beginPath()
    ctx.lineWidth = 0.5 * canvasSizeFactor
    for (let i = 0; i < canvasWidth; i += cellSize) {
        ctx.moveTo(i + visualFieldOffsetLeft, 0)
        ctx.lineTo(i + visualFieldOffsetLeft, canvas.height)
    }
    for (let i = 0; i < canvasHeight; i += cellSize) {
        ctx.moveTo(0, i + visualFieldOffsetTop)
        ctx.lineTo(canvas.width, i + visualFieldOffsetTop)
    }
    ctx.stroke()

    //draws the thick lines
    ctx.beginPath()
    ctx.lineWidth = 1 * canvasSizeFactor
    ctx.moveTo(thickLine1Offset + visualFieldOffsetLeft, 0)
    ctx.lineTo(thickLine1Offset + visualFieldOffsetLeft, canvas.height)
    ctx.moveTo(thickLine2Offset + visualFieldOffsetLeft, 0)
    ctx.lineTo(thickLine2Offset + visualFieldOffsetLeft, canvas.height)
    ctx.stroke()
}

function markerClick(e) {
    if (e.button == 0) { //left mouse button
        let currMove = getMoveForPos(markerPos)
        let moveValid = new MoveValidator(currMove).isBorderClickable()
        console.log("Move Validation: " + moveValid)
        if (moveValid) {
            makeMove(currMove)
            drawLine(markerPos)
        }
        //console.log(game.field)
    }
}

function getMoveForPos(pos) {
    let d = 0
    if (pos.x % 1 == 0) { //line vertical
        d = 3 //standard left
    }

    if (pos.x == playableFieldWidth || pos.y == playableFieldHeight) { //Line at field border
        //opposite line
        d = (d + 2) % 4;
    }

    let move = new Move(Math.ceil(pos.x-0.5), Math.ceil(pos.y-0.5), d) //calculates field where line is drawn on

    // decreases field coordinates when line is at edge of field
    if (pos.x == playableFieldWidth) {
        move.x = move.x - 1
    }
    if (pos.y == playableFieldHeight) {
        move.y = move.y - 1
    }

    return move
}

function snapMarkerToGrid(e) {
    let linePos = getLinePosForMousepos(getRelativeMousePos(e))
    let lineValidator = new LineValidator(linePos)

    if (lineValidator.isLineInsidePlayableArea(playableFieldWidth, playableFieldHeight) && lineValidator.isLineValid()) {
        markerPos.x = linePos.x
        markerPos.y = linePos.y
        marker.style.top = linePos.y * 10 + playableFieldOffsetTop * 10 + "px"
        marker.style.left = linePos.x * 10 + playableFieldOffsetLeft * 10 + "px"

        marker.style.transform  = "translate(-50%, -50%)"
        if (lineValidator.isMarkerVertical()) { //marker vertical
            marker.style.transform += " rotate(90deg)"
        }
    }
}

function getLinePosForMousepos(mousePos) {
    let linePos = {}
    linePos.x = roundHalf(mousePos.x/cellSize - playableFieldOffsetLeft)
    linePos.y = roundHalf(mousePos.y/cellSize - playableFieldOffsetTop)
    return linePos
}

function roundHalf(num) {
    return Math.round(num*2)/2;
}

function drawLine(pos) {
    let calculatedPos = getCanvasPosByCoords(pos.x, pos.y)

    let vertical
    if (pos.x % 1 == 0) {
        vertical = true
        calculatedPos.y = calculatedPos.y -(0.5 * cellSize)
    } else {
        vertical = false
        calculatedPos.x = calculatedPos.x -(0.5 * cellSize)
    }

    ctx.strokeStyle = lineColor
    ctx.beginPath()
    ctx.lineWidth = 1.5 * canvasSizeFactor
    ctx.moveTo(calculatedPos.x + getRandomLinePos(), calculatedPos.y + getRandomLinePos())
    if (vertical) {
        ctx.lineTo(calculatedPos.x + getRandomLinePos(), calculatedPos.y + cellSize + getRandomLinePos())
    } else {
        ctx.lineTo(calculatedPos.x + cellSize + getRandomLinePos(), calculatedPos.y + getRandomLinePos())
    }

    ctx.stroke()
}

//returns the absolute coordinates on the canvas in relation to the given position
function getCanvasPosByCoords(x, y) {
    return {
        x: (x + playableFieldOffsetLeft) * cellSize,
        y: (y + playableFieldOffsetTop) * cellSize
    }
}

function getRandomLinePos() {
    return (0.5 - Math.random()) * canvasSizeFactor
}

//draws a point in a cell
function drawPoint(score) {
    let fieldCoords = getCanvasPosByCoords(score.x, score.y)

    var img = new Image
    img.src = "./images/points/"+score.image+".png";

    //TODO not performant to load the image every time, it'd be better to store the loaded image in the user object that has yet to be created
    img.onload = function() {
        ctx.drawImage(img, fieldCoords.x, fieldCoords.y, cellSize, cellSize);
        colorize(fieldCoords.x, fieldCoords.y, cellSize, cellSize, score.color)
    };
}

//colors the given rectangle in the given hex color
function colorize(x, y, width, height, color) {
    var data = ctx.getImageData(x, y, width, height);
    let rgbColor = hexToRgb(color)
    //loops through color data
    for (let i = 0, length = data.data.length; i < length; i += 4) {
        //is pixel part of the icon?
        if (data.data[i] == 0 && data.data[i] == data.data[i+2] && data.data[i+1] == 255) {
            //colors pixel
            data.data[i] = rgbColor.r;
            data.data[i+1] = rgbColor.g;
            data.data[i+2] = rgbColor.b;
        }
    }

    ctx.putImageData(data, x, y);
}

//converts a hex color to a rgb color object
function hexToRgb(hex) {
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);
    return {
        r: r,
        g: g,
        b: b
    }
}

createField(playableFieldWidth, playableFieldHeight)
addField(0, 0, playableFieldWidth, playableFieldHeight)