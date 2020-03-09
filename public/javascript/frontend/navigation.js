var zoom = 1.1 //the visual zoom (scale) of the paper

//mouse stuff
var holdMouseWheel = false
var mousePosAtLastDrag
var mousePosAbs

//adding all events to the window and marker
window.addEventListener('wheel', scroll)
window.addEventListener('mousedown', dragField)
window.addEventListener('mouseup', stopDragField)
window.addEventListener('mousemove', mouseMove)

function zoomFunct(newZoom) {
    zoom = newZoom
    page.style.transform = "scale("+zoom+")"
    //commented out until I figure out if redrawing on the fly is necessary / how it can be achieved with good performance
    //if (canvasZoom % 2 == 0) {
        //draw()
    //}
}

function scroll(e) {
    if (e.wheelDeltaX != 0) return //unwanted mouse wheel action
    var newZoom = zoom
    if (event.deltaY > 0) {
        newZoom = newZoom / 1.5
    } else {
        newZoom = newZoom * 1.5
    }
    if (newZoom > 15 || newZoom < 1) return //zoom outside of allowed range

    let oldMousePosRel = getRelativeMousePos(e)
    zoomFunct(newZoom)
    let newMousePosRel = getRelativeMousePos(e)

    //setting top and left values relative to the mouse position so it stays the same
    //(not completely sure why it works, but it does!)
    page.style.top = parseInt(page.style.top) + (newMousePosRel.y - oldMousePosRel.y) * zoom / canvasSizeFactor + "px"
    page.style.left = parseInt(page.style.left) + (newMousePosRel.x - oldMousePosRel.x) * zoom / canvasSizeFactor + "px"
}

function getAbsoluteMousePos(event) {
    return {
        x: event.clientX,
        y: event.clientY
    }
}

//mouse pos relative to (/not influenced by) the current zoom
function getRelativeMousePos(e) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvasWidth / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvasHeight / rect.height  // relationship bitmap vs. element for Y

    return {
        x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (event.clientY - rect.top) * scaleY    // been adjusted to be relative to element
    }
}

function dragField(e) {
    if (e.button === 2) { //right mouse button
        parentEl.style.cursor = "grabbing"
        mousePosAtLastDrag = getAbsoluteMousePos(e)
        holdMouseWheel = true
    }
}

function stopDragField(e) {
    if (e.button === 2) { //right mouse button
        parentEl.style.cursor = "default"
        holdMouseWheel = false
    }
}

function mouseMove(e) {
    mousePosAbs = getAbsoluteMousePos(e)
    if (holdMouseWheel) {
        //calculates position difference between the last position change and now, and modifies the position accordingly
        page.style.top = parseInt(page.style.top) + mousePosAbs.y - mousePosAtLastDrag.y +"px"
        page.style.left = parseInt(page.style.left) + mousePosAbs.x - mousePosAtLastDrag.x +"px"
        mousePosAtLastDrag = getAbsoluteMousePos(e)
    }
}

function setDefaultPaperPosition() {
    page.style.top = (window.innerHeight * 0.5 - (parseInt(page.style.height) * zoom / 2)) + 'px'
    page.style.left = (window.innerWidth * 0.5 - (parseInt(page.style.width) * zoom / 2)) + 'px'
}