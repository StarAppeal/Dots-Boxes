"use strict";
//HTML elements
var gameCanvas = new GameCanvas("canvas");
var marker = document.getElementById("hoverMarker");
var pointDesigner = document.getElementById("pointDesigner"); //HTMLCanvasElement
var ctxPointDesigner = pointDesigner.getContext("2d");
var page = document.getElementById("page");
var parentEl = document.getElementById("parent");
//colors
var gridColor = "#bcd1d8";
var lineColor = "#5984db";
//pointDesigner stuff
var designedPointsMap = new Map();
var pointSize = 256;
pointDesigner.width = pointSize;
pointDesigner.height = pointSize;
var markerPos = new Pos(0, 0);
//adding all events to the window and marker
window.addEventListener('mousemove', snapMarkerToGrid);
window.oncontextmenu = function (e) {
    e.preventDefault();
};
marker.addEventListener('mouseup', markerClick);
//fluff is the remaining stuff to the left of the paper when it gets pulled out of a college block
function setFluffStyles() {
    var fluffClassArray = Array("fluff-standard-top", "fluff-standard-bottom", "fluff-ripped"); //predefined array of all possible style classes a "fluff" can take on
    var fluffList = document.getElementsByClassName("fluff");
    var randomFluffClass;
    for (var _i = 0, fluffList_1 = fluffList; _i < fluffList_1.length; _i++) { //appends random fluff class to every fluff
        var item = fluffList_1[_i];
        randomFluffClass = fluffClassArray[Math.floor(Math.random() * fluffClassArray.length)];
        item.classList.add(randomFluffClass);
    }
}
function markerClick(e) {
    if (e.button == 0) { //left mouse button
        var currMove = getMoveForPos(markerPos);
        var moveValid = new MoveValidator(currMove).isBorderClickable();
        console.log("Move Validation: " + moveValid);
        if (moveValid) {
            var points = makeMove(currMove);
            gameCanvas.drawLine(markerPos);
            if (points.length == 0) {
                displayCurrentUser(game.currentPlayer);
            }
            else {
                points.forEach(function (item, index) {
                    gameCanvas.drawPoint(new Score(item.x, item.y, item.ownedBy));
                });
            }
        }
        //console.log(game.field)
    }
}
function getMoveForPos(pos) {
    var d = 0;
    if (pos.x % 1 == 0) { //line vertical
        d = 3; //standard left
    }
    if (pos.x == gameCanvas.playableFieldWidth || pos.y == gameCanvas.playableFieldHeight) { //Line at field border
        //opposite line
        d = (d + 2) % 4;
    }
    var m = new Move(Math.ceil(pos.x - 0.5), Math.ceil(pos.y - 0.5), d); //calculates field where line is drawn on
    // decreases field coordinates when line is at edge of field
    if (pos.x == gameCanvas.playableFieldWidth) {
        m.x = m.x - 1;
    }
    if (pos.y == gameCanvas.playableFieldHeight) {
        m.y = m.y - 1;
    }
    return m;
}
function snapMarkerToGrid(e) {
    var linePos = getLinePosForMousepos(getRelativeMousePos(e));
    var lineValidator = new LineValidator(linePos);
    if (lineValidator.isLineInsidePlayableArea(gameCanvas.playableFieldWidth, gameCanvas.playableFieldHeight) && lineValidator.isLineValid()) {
        markerPos.x = linePos.x;
        markerPos.y = linePos.y;
        marker.style.top = linePos.y * 10 + gameCanvas.playableFieldOffsetTop * 10 + "px";
        marker.style.left = linePos.x * 10 + gameCanvas.playableFieldOffsetLeft * 10 + "px";
        marker.style.transform = "translate(-50%, -50%)";
        if (lineValidator.isMarkerVertical()) { //marker vertical
            marker.style.transform += " rotate(90deg)";
        }
    }
}
function getLinePosForMousepos(mousePos) {
    var xPos = roundHalf(mousePos.x / gameCanvas.cellSize - gameCanvas.playableFieldOffsetLeft);
    var yPos = roundHalf(mousePos.y / gameCanvas.cellSize - gameCanvas.playableFieldOffsetTop);
    return new Pos(xPos, yPos);
}
function roundHalf(num) {
    return Math.round(num * 2) / 2;
}
//returns the absolute coordinates on the canvas in relation to the given position
function getCanvasPosByCoords(x, y) {
    return {
        x: (x + gameCanvas.playableFieldOffsetLeft) * gameCanvas.cellSize,
        y: (y + gameCanvas.playableFieldOffsetTop) * gameCanvas.cellSize
    };
}
function getRandom(diameter) {
    return (0.5 - Math.random()) * diameter;
}
//colors the given rectangle in the given hex color
function colorize(context, x, y, width, height, color) {
    var data = context.getImageData(x, y, width, height);
    var rgbColor = hexToRgb(color);
    //loops through color data
    for (var i = 0, length_1 = data.data.length; i < length_1; i += 4) {
        //is pixel part of the icon?
        if (data.data[i] == 0 && data.data[i] == data.data[i + 2] && data.data[i + 1] == 255) {
            //colors pixel
            data.data[i] = rgbColor.r;
            data.data[i + 1] = rgbColor.g;
            data.data[i + 2] = rgbColor.b;
        }
    }
    context.putImageData(data, x, y);
}
//converts a hex color to a rgb color object
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return new RgbColor(r, g, b);
}
//generates a point icon for the given user from the pointDesigner canvas
function generatePointFromPointDesigner(userId) {
    var generatedImage = new Image;
    generatedImage.src = pointDesigner.toDataURL("image/png");
    designedPointsMap.set(userId, generatedImage);
}
//sets the icon "id" in the color "clr" for the given user
function choosePreset(clr, id, userId) {
    var presetPoint = new Image;
    presetPoint.src = "./images/points/" + id + ".png";
    presetPoint.onload = function () {
        ctxPointDesigner.clearRect(0, 0, pointDesigner.width, pointDesigner.height);
        ctxPointDesigner.drawImage(presetPoint, 0, 0);
        colorize(ctxPointDesigner, 0, 0, pointSize, pointSize, clr);
        generatePointFromPointDesigner(userId);
    };
}
//generates three entries in the designedPointsMap
function mockGenerateAllPoints() {
    for (var i = 0; i < 4; i++) {
        choosePreset(Math.floor(Math.random() * 16777215).toString(16), i, i);
    }
}
//inserts garfield profile pictures for testing
function mockInsertGarfield() {
    var userImages = document.getElementsByClassName('user');
    var userImage;
    for (var i = 0; i < 4; i++) {
        userImage = userImages[i];
        userImage.style.backgroundImage = "url('/images/garfield/" + i + ".gif')";
        userImages[i].firstElementChild.innerHTML = "User #" + i;
    }
}
var userImages = document.getElementsByClassName('user');
function displayCurrentUser(userId) {
    for (var _i = 0, userImages_1 = userImages; _i < userImages_1.length; _i++) {
        var userImage = userImages_1[_i];
        userImage.classList.remove("active");
    }
    userImages[userId].classList.add("active");
}
