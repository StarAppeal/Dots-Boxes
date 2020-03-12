//HTML elements
const gameCanvas = new GameCanvas("canvas")
const marker: any = document.getElementById("hoverMarker")

const pointDesigner: any = document.getElementById("pointDesigner") //HTMLCanvasElement
const ctxPointDesigner: any = pointDesigner.getContext("2d")
const page: any = document.getElementById("page")
const parentEl: any = document.getElementById("parent")

//colors
const gridColor = "#bcd1d8"
const lineColor = "#5984db"

//pointDesigner stuff
let designedPointsMap = new Map()
const pointSize = 256
pointDesigner.width = pointSize
pointDesigner.height = pointSize

let markerPos = new Pos(0,0)



//adding all events to the window and marker
window.addEventListener('mousemove', snapMarkerToGrid)

window.oncontextmenu = function (e: any) {
    e.preventDefault()
}
marker.addEventListener('mouseup', markerClick)


//fluff is the remaining stuff to the left of the paper when it gets pulled out of a college block
function setFluffStyles() {
    let fluffClassArray = Array("fluff-standard-top", "fluff-standard-bottom", "fluff-ripped") //predefined array of all possible style classes a "fluff" can take on
    let fluffList: any = document.getElementsByClassName("fluff")
    let randomFluffClass
    for (let item of fluffList) { //appends random fluff class to every fluff
        randomFluffClass = fluffClassArray[Math.floor(Math.random()*fluffClassArray.length)]
        item.classList.add(randomFluffClass)
    }
}

function markerClick(e: any) {
    if (e.button == 0) { //left mouse button
        let currMove = getMoveForPos(markerPos)
        let moveValid = new MoveValidator(currMove).isBorderClickable()
        console.log("Move Validation: " + moveValid)
        if (moveValid) {
            let points = makeMove(currMove)
            gameCanvas.drawLine(markerPos)
            if (points.length == 0) {
                displayCurrentUser(game.currentPlayer)
            } else {
                points.forEach(function(item: any, index: number){
                    gameCanvas.drawPoint(new Score(item.x, item.y, item.ownedBy))
                })
            }
        }
        //console.log(game.field)
    }
}

function getMoveForPos(pos: Pos) {
    let d = 0
    if (pos.x % 1 == 0) { //line vertical
        d = 3 //standard left
    }

    if (pos.x == gameCanvas.playableFieldWidth || pos.y == gameCanvas.playableFieldHeight) { //Line at field border
        //opposite line
        d = (d + 2) % 4;
    }

    let m = new Move(Math.ceil(pos.x-0.5), Math.ceil(pos.y-0.5), d) //calculates field where line is drawn on

    // decreases field coordinates when line is at edge of field
    if (pos.x == gameCanvas.playableFieldWidth) {
        m.x = m.x - 1
    }
    if (pos.y == gameCanvas.playableFieldHeight) {
        m.y = m.y - 1
    }

    return m
}

function snapMarkerToGrid(e: any) {
    let linePos = getLinePosForMousepos(getRelativeMousePos(e))
    console.log(linePos)
    let lineValidator = new LineValidator(linePos)

    if (lineValidator.isLineInsidePlayableArea(gameCanvas.playableFieldWidth, gameCanvas.playableFieldHeight) && lineValidator.isLineValid()) {
        markerPos.x = linePos.x
        markerPos.y = linePos.y
        marker.style.top = linePos.y * 10 + gameCanvas.playableFieldOffsetTop * 10 + "px"
        marker.style.left = linePos.x * 10 + gameCanvas.playableFieldOffsetLeft * 10 + "px"

        marker.style.transform  = "translate(-50%, -50%)"
        if (lineValidator.isMarkerVertical()) { //marker vertical
            marker.style.transform += " rotate(90deg)"
        }
    }
}

function getCellPositionForMousepos(mousePos: Pos) {
    let xPos = mousePos.x/gameCanvas.cellSize - gameCanvas.playableFieldOffsetLeft
    let yPos = mousePos.y/gameCanvas.cellSize - gameCanvas.playableFieldOffsetTop
    return new Pos(xPos, yPos)
}

//calculates the nearest line position from the given mouse position
function getLinePosForMousepos(mousePos: Pos) {
    let cellPos = getCellPositionForMousepos(mousePos)
    if(calculateDistanceToNextHalf(cellPos.x) < calculateDistanceToNextHalf(cellPos.y)) {
        let xPos = Math.floor(cellPos.x) + 0.5
        let yPos = Math.round(cellPos.y)
    } else {
        let yPos = Math.floor(cellPos.y) + 0.5
        let xPos = Math.round(cellPos.x)
    }
    return new Pos(xPos, yPos)
}

//Calculates numeral distance to the next .5 value
function calculateDistanceToNextHalf(x: number) {
    return Math.abs(x%1-0.5)
}

function roundHalf(num: number) {
    return Math.round(num*2)/2;
}

//returns the absolute coordinates on the canvas in relation to the given position
function getCanvasPosByCoords(x: number, y: number) {
    return {
        x: (x + gameCanvas.playableFieldOffsetLeft) * gameCanvas.cellSize,
        y: (y + gameCanvas.playableFieldOffsetTop) * gameCanvas.cellSize
    }
}

function getRandom(diameter: number) {
    return (0.5 - Math.random()) * diameter
}

//colors the given rectangle in the given hex color
function colorize(context: any, x: number, y: number, width: number, height: number, color: string) {
    var data = context.getImageData(x, y, width, height);
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

    context.putImageData(data, x, y);
}

//converts a hex color to a rgb color object
function hexToRgb(hex: string) {
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);
    return new RgbColor(r, g, b)
}

//generates a point icon for the given user from the pointDesigner canvas
function generatePointFromPointDesigner(userId: number) {
    var generatedImage = new Image
    generatedImage.src = pointDesigner.toDataURL("image/png")
    designedPointsMap.set(userId, generatedImage)
}

//sets the icon "id" in the color "clr" for the given user
function choosePreset(clr: string, id: number, userId: number) {
    var presetPoint = new Image
    presetPoint.src = "./images/points/"+id+".png";

    presetPoint.onload = function() {
        ctxPointDesigner.clearRect(0, 0, pointDesigner.width, pointDesigner.height);
        ctxPointDesigner.drawImage(presetPoint, 0, 0)
        colorize(ctxPointDesigner, 0, 0, pointSize, pointSize, clr)
        generatePointFromPointDesigner(userId)
    }
}

//generates three entries in the designedPointsMap
function mockGenerateAllPoints() {
    for (var i = 0; i < 4; i++) {
        choosePreset(Math.floor(Math.random()*16777215).toString(16), i, i)
    }
}

//inserts garfield profile pictures for testing
function mockInsertGarfield() {
    let userImages: any = document.getElementsByClassName('user')
    let userImage: any
    for (var i = 0; i < 4; i++) {
        userImage = userImages[i]
        userImage.style.backgroundImage = "url('/images/garfield/"+i+".gif')"
        userImages[i].firstElementChild.innerHTML = "User #"+i
    }
}

let userImages: any = document.getElementsByClassName('user')

function displayCurrentUser(userId: number) {
    for (let userImage of userImages) {
        userImage.classList.remove("active")
    }
    userImages[userId].classList.add("active")
}