//HTML elements
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const page = document.getElementById("page")
const parentEl = document.getElementById("parent")

var canvasSizeFactor = 3 //the actual drawing size (3 ≙ thrice the size of the canvas pixel dimensions)
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

setFluffStyles()
redraw()

//adding all events to the window and marker
window.addEventListener('mousemove', mouseMove)
const marker = document.getElementById("hoverMarker")
marker.oncontextmenu = function (e) {
    e.preventDefault()
}
marker.addEventListener('mouseup', markerClick)


//fluff is the remaining stuff to the left of the paper when it gets pulled out of a college block
function setFluffStyles() {
    var fluffClassArray = Array("fluff-standard-top", "fluff-standard-bottom", "fluff-ripped") //predefined array of all possible style classes a "fluff" can take on
    var fluffList = document.getElementsByClassName("fluff")
    var randomFluffClass
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
    for (var i = 0; i < canvasWidth; i += cellSize) {
        ctx.moveTo(i + visualFieldOffsetLeft, 0)
        ctx.lineTo(i + visualFieldOffsetLeft, canvas.height)
    }
    for (var i = 0; i < canvasHeight; i += cellSize) {
        ctx.moveTo(0, i + visualFieldOffsetTop)
        ctx.lineTo(canvas.width, i + visualFieldOffsetTop)
    }
    ctx.stroke()

    //draws the thick lines
    ctx.beginPath();
    ctx.lineWidth = 1 * canvasSizeFactor;
    ctx.moveTo(thickLine1Offset + visualFieldOffsetLeft, 0)
    ctx.lineTo(thickLine1Offset + visualFieldOffsetLeft, canvas.height)
    ctx.moveTo(thickLine2Offset + visualFieldOffsetLeft, 0)
    ctx.lineTo(thickLine2Offset + visualFieldOffsetLeft, canvas.height)
    ctx.stroke()
}

function mouseMove(e) {
    snapMarkerToGrid(e)
}

function markerClick(e) {
    if (e.button == 0) {
        var currMove = getMoveForPos(markerPos);
        var moveValid = new MoveValidator(currMove).isBorderClickable()
        console.log("Move Validation: " + moveValid)
        if (moveValid) {
            makeMove(currMove)
            drawLine(markerPos)
        }
        //console.log(game.field)
    }
}

function getMoveForPos(pos) {
    var d = 0
    if (pos.x % 1 == 0) {
        d = 3
    }

    if (pos.x == playableFieldWidth | pos.y == playableFieldHeight) {
        d = d + 2
        d = d % 4
    }

    var move = new Move(Math.ceil(pos.x-0.5), Math.ceil(pos.y-0.5), d)

    if (pos.x == playableFieldWidth) {
        move.x = move.x - 1
    }
    if (pos.y == playableFieldHeight) {
        move.y = move.y - 1
    }

    return move
}



var markerPos = {}
function snapMarkerToGrid(e) {
    var linePos = getLinePosForMousepos(getRelativeMousePos(e))

    if (linePos.x >= 0 && linePos.x <= playableFieldWidth && linePos.y >= 0 && linePos.y <= playableFieldHeight) { //is line inside playable area?
        if (linePos.x % 1 != linePos.y % 1) { //is the calculated line on a line and not in a field?
            markerPos.x = linePos.x
            markerPos.y = linePos.y
            marker.style.top = linePos.y * 10 + playableFieldOffsetTop * 10 + "px"
            marker.style.left = linePos.x * 10 + playableFieldOffsetLeft * 10 + "px"

            marker.style.transform  = "translate(-50%, -50%)"
            if (linePos.x % 1 == 0) { //marker vertical
                marker.style.transform += " rotate(90deg)"
            }
        }
    }
}

function getLinePosForMousepos(mousePos) {
    var linePos = {}
    linePos.x = roundHalf(mousePos.x/cellSize - playableFieldOffsetLeft)
    linePos.y = roundHalf(mousePos.y/cellSize - playableFieldOffsetTop)
    return linePos
}

function roundHalf(num) {
    return Math.round(num*2)/2;
}

function drawLine(pos) {
    calculatedPos = {
        x: (pos.x + playableFieldOffsetLeft) * cellSize,
        y: (pos.y + playableFieldOffsetTop) * cellSize
    }

    var vertical
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

function getRandomLinePos() {
    return (0.5 - Math.random()) * canvasSizeFactor
}

createField(playableFieldWidth, playableFieldHeight)
addField(0, 0, playableFieldWidth, playableFieldHeight)