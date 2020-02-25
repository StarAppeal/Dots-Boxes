var fluffClassArray = Array("fluff-standard-top", "fluff-standard-bottom", "fluff-ripped");

var list = document.getElementsByClassName("fluff");
for (let item of list) {
    item.classList.add(fluffClassArray[Math.floor(Math.random()*fluffClassArray.length)]);
}


var zoom;
const cellSize = 10;
const canvasWidth = 440;
const canvasHeight = 590;

var ctx = canvas.getContext("2d");

var page = document.getElementById("page");
var parentEl = document.getElementById("parent");

cavasSizeFactor = 3
zoom = 1
zoomFunct(zoom);
redraw();

function redraw() {
  canvas.width = canvasWidth * cavasSizeFactor;
  canvas.height = canvasHeight * cavasSizeFactor;
  drawLines();
}

function zoomFunct(newZoom) {
  //console.log(newZoom)
  zoom = newZoom
  page.style.transform = "scale("+zoom+")";
  //if (canvasZoom % 2 == 0) {
    //redraw();
  //}
}

function printMousePos(canvas, event) {
  var mousePos = getMousePos(event);
  const x = mousePos.x;
  const y = mousePos.y;
  
  console.log("x: " + x);
  console.log("y: " + y);
}

function drawLines() {
  ctx.strokeStyle = "#bcd1d8";
  ctx.beginPath();
  ctx.lineWidth = 0.5 * cavasSizeFactor;
  for (var i = 0; i < canvasWidth / cellSize; i++) {
    ctx.moveTo(i*cavasSizeFactor*cellSize + 0.2*cavasSizeFactor*cellSize,0);
    ctx.lineTo(i*cavasSizeFactor*cellSize + 0.2*cavasSizeFactor*cellSize,canvas.height);
  }
  for (var i = 0; i < canvasHeight / cellSize; i++) {
    ctx.moveTo(0, i*cavasSizeFactor*cellSize + 0.8*cavasSizeFactor*cellSize);
    ctx.lineTo(canvas.width, i*cavasSizeFactor*cellSize + 0.8*cavasSizeFactor*cellSize);
  }
  ctx.stroke()
  
  ctx.beginPath();
  ctx.lineWidth = 1 * cavasSizeFactor;
  ctx.moveTo(7*cavasSizeFactor*cellSize + 0.2*cavasSizeFactor*cellSize,0);
  ctx.lineTo(7*cavasSizeFactor*cellSize + 0.2*cavasSizeFactor*cellSize,canvas.height);
  
  ctx.moveTo(38*cavasSizeFactor*cellSize + 0.2*cavasSizeFactor*cellSize,0);
  ctx.lineTo(38*cavasSizeFactor*cellSize + 0.2*cavasSizeFactor*cellSize,canvas.height);
  
  ctx.stroke()
}

function scroll(e) {
  if (e.wheelDeltaX != 0) {return}
  var newZoom = zoom
  if (event.deltaY > 0) {
    newZoom = newZoom / 1.5
  } else {
    newZoom = newZoom * 1.5
  }
  if (newZoom > 15 | newZoom < 1) {
    return;
  }
  //page.style.transformOrigin = getAbsoluteMousePos(e).x + "px " + getAbsoluteMousePos(e).y+"px";
  zoomFunct(newZoom);
  snapMarkerToGrid(e)
  
  var mousePos = getMousePos(event);
  const x = mousePos.x;
  const y = mousePos.y;
}

window.addEventListener("wheel", event => scroll(event));

function getAbsoluteMousePos(e) {
  return {
    x: event.clientX,
    y: event.clientY
  }
}

function  getMousePos(e) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvasWidth / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvasHeight / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (event.clientY - rect.top) * scaleY    // been adjusted to be relative to element
  }
}

window.addEventListener('mousedown', mouseState);
window.addEventListener('mouseup', mouseState);

var hold = false;
var oldMousePos;
function mouseState(e) {
  if (e.button === 1) {
    dragField(e)
  }
}

function dragField(e) {
  if (e.type == "mousedown") {
      parentEl.style.cursor = "grabbing";
      oldMousePos = getAbsoluteMousePos(e);
      oldTop = parseInt(page.style.top);
      oldLeft = parseInt(page.style.left);
      hold = true;
    } else {
      parentEl.style.cursor = "default";
      hold = false;
    }
}

var oldTop
var oldLeft
page.style.top = 0;
page.style.left = 0;

window.onmousemove = function(e) {
  var mousePos = getAbsoluteMousePos(e);
  if (hold) {
    page.style.top = oldTop + (mousePos.y - oldMousePos.y) +"px";
    page.style.left = oldLeft + (mousePos.x - oldMousePos.x) +"px";
  }
  snapMarkerToGrid(e);
}

var offsetLeft = 5.2
var offsetTop = 0.8
var playableFieldWidth = 38
var playableFieldHeight = 57

var marker = document.getElementById("hoverMarker");
marker.addEventListener('mouseup', function(e) {
  if (e.button == 0) {
    var currMove = getMoveForPos(markerPos);
    var moveValid = new MoveValidator(currMove).isBorderClickable()
    console.log("Move Validation: "+moveValid)
    if (moveValid) {
      makeMove(currMove)
      drawLine(markerPos)
    }
    console.log(game.field)
  }
})

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

marker.oncontextmenu = function (e) {
    e.preventDefault()
};

var markerPos = {}
function snapMarkerToGrid(event) {
  if (event.button === 0) {
    var mousePos = getMousePos(event);
    var linePos = getLinePosForMousepos(mousePos.x, mousePos.y)
    
    if (linePos.x >= 0 && linePos.x <= playableFieldWidth && linePos.y >= 0 && linePos.y <= playableFieldHeight) {
      if (linePos.x % 1 != linePos.y % 1) {
        markerPos.x = linePos.x
        markerPos.y = linePos.y
        marker.style.top = linePos.y * 10 + offsetTop * 10 + "px"
        marker.style.left = linePos.x * 10 + offsetLeft * 10 + "px"
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
  linePos.x = Math.round(((x/10) - offsetLeft)*2)/2
  linePos.y = Math.round(((y/10) - offsetTop)*2)/2
  return linePos
}

function drawLine(pos) {
  var absoluteCellSize = cellSize * cavasSizeFactor
  
  calculatedPos = {
    x: (pos.x + offsetLeft) * absoluteCellSize,
    y: (pos.y + offsetTop) * absoluteCellSize
  }
  
  var senkrecht
  if (pos.x % 1 == 0) {
    senkrecht = true
    calculatedPos.y = calculatedPos.y -(0.5 * absoluteCellSize)
  } else {
    senkrecht = false
    calculatedPos.x = calculatedPos.x -(0.5 * absoluteCellSize)
  }
  
  ctx.strokeStyle = "#5984db";
  ctx.beginPath();
  ctx.lineWidth = 1.5 * cavasSizeFactor;
  ctx.moveTo(calculatedPos.x + getRandomLinePos(), calculatedPos.y + getRandomLinePos());
  if (senkrecht) {
    ctx.lineTo(calculatedPos.x + getRandomLinePos(), calculatedPos.y + absoluteCellSize + getRandomLinePos());
  } else {
    ctx.lineTo(calculatedPos.x + absoluteCellSize + getRandomLinePos(), calculatedPos.y + getRandomLinePos());
  }
  
  ctx.stroke()
}

function getRandomLinePos() {
  return (0.5 - Math.random()) * cavasSizeFactor
}

createField(playableFieldWidth, playableFieldHeight)
addField(0, 0, playableFieldWidth, playableFieldHeight)