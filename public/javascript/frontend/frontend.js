var canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")
const page = document.getElementById("page")
const parentEl = document.getElementById("parent")

var zoom = 1 //the visual zoom (scale) of the paper
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
zoomFunct(zoom)
redraw()

//adding all events to the window and marker
window.addEventListener('wheel', scroll)
window.addEventListener('mousedown', dragField)
window.addEventListener('mouseup', stopDragField)
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

function zoomFunct(newZoom) {
    zoom = newZoom
    page.style.transform = "scale("+zoom+")"
    //commented out until I figure out if redrawing on the fly is necessary / how it can be achieved with good performance
    //if (canvasZoom % 2 == 0) {
        //redraw()
    //}
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

function scroll(e) {
    if (e.wheelDeltaX != 0) return //unwanted mouse wheel action
    var newZoom = zoom
    if (event.deltaY > 0) {
        newZoom = newZoom / 1.5
    } else {
        newZoom = newZoom * 1.5
    }
    if (newZoom > 15 | newZoom < 1) return //zoom outside of allowed range
    //page.style.transformOrigin = getAbsoluteMousePos(e).x + "px " + getAbsoluteMousePos(e).y+"px" //zoom relative to cursor test, not quite working
    zoomFunct(newZoom)
    snapMarkerToGrid(e)
}

function getAbsoluteMousePos(e) {
    return {
        x: event.clientX,
        y: event.clientY
    }
}

function getMousePos(e) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvasWidth / canvasSizeFactor / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvasHeight / canvasSizeFactor / rect.height  // relationship bitmap vs. element for Y

    return {
        x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (event.clientY - rect.top) * scaleY    // been adjusted to be relative to element
    }
}

var holdMouseWheel = false
var oldMousePos

function dragField(e) {
    if (e.button === 1) { //middle mouse button (scroll click)
        parentEl.style.cursor = "grabbing"
        oldMousePos = getAbsoluteMousePos(e)
        oldTop = parseInt(page.style.top)
        oldLeft = parseInt(page.style.left)
        holdMouseWheel = true
    }
}

function stopDragField(e) {
    if (e.button === 1) { //middle mouse button (scroll click)
        parentEl.style.cursor = "default"
        holdMouseWheel = false
    }
}

var oldTop
var oldLeft
page.style.top = 0
page.style.left = 0

function mouseMove(e) {
    var mousePos = getAbsoluteMousePos(e)
    if (holdMouseWheel) {
        page.style.top = oldTop + (mousePos.y - oldMousePos.y) +"px"
        page.style.left = oldLeft + (mousePos.x - oldMousePos.x) +"px"
    }
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
function snapMarkerToGrid(event) {
    if (event.button === 0) {
        var mousePos = getMousePos(event)
        var linePos = getLinePosForMousepos(mousePos.x, mousePos.y)

        if (linePos.x >= 0 && linePos.x <= playableFieldWidth && linePos.y >= 0 && linePos.y <= playableFieldHeight) {
            if (linePos.x % 1 != linePos.y % 1) {
                markerPos.x = linePos.x
                markerPos.y = linePos.y
                marker.style.top = linePos.y * 10 + playableFieldOffsetTop * 10 + "px"
                marker.style.left = linePos.x * 10 + playableFieldOffsetLeft * 10 + "px"
                if (linePos.x % 1 == 0) {
                    marker.style.transform = "translate(-49%, -45%) rotate(90deg)"
                } else {
                    marker.style.transform = "translate(-52%, -51%)"
                }
            }
        }
    }
}

function getLinePosForMousepos(x, y) {
    var linePos = {}
    linePos.x = Math.round(((x/10) - playableFieldOffsetLeft)*2)/2
    linePos.y = Math.round(((y/10) - playableFieldOffsetTop)*2)/2
    return linePos
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