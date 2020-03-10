let zoom = 1.1 //the visual zoom (scale) of the paper

//mouse stuff
let holdMouseWheel = false
let mousePosAtLastDrag: Pos
let mousePosAbs: Pos

//adding all events to the window and marker
window.addEventListener('wheel', canvasScroll)
window.addEventListener('mousedown', dragField)
window.addEventListener('mouseup', stopDragField)
window.addEventListener('mousemove', mouseMove)

function zoomFunct(newZoom: number) {
    zoom = newZoom
    page.style.transform = "scale("+zoom+")"
    //commented out until I figure out if redrawing on the fly is necessary / how it can be achieved with good performance
    //if (canvasZoom % 2 == 0) {
        //draw()
    //}
}

function canvasScroll(e: any) {
    if (e.wheelDeltaX != 0) return //unwanted mouse wheel action
    let newZoom = zoom
    if (e.deltaY > 0) {
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
    page.style.top = parseInt(page.style.top) + (newMousePosRel.y - oldMousePosRel.y) * zoom / gameCanvas.canvasSizeFactor + "px"
    page.style.left = parseInt(page.style.left) + (newMousePosRel.x - oldMousePosRel.x) * zoom / gameCanvas.canvasSizeFactor + "px"
}

function getAbsoluteMousePos(e: any) {
    return new Pos(e.clientX, e.clientY)
}

//mouse pos relative to (/not influenced by) the current zoom
function getRelativeMousePos(e: any) {
    let rect = gameCanvas.canvas.getBoundingClientRect(), // abs. size of element
        scaleX = gameCanvas.canvasWidth / rect.width,    // relationship bitmap vs. element for X
        scaleY = gameCanvas.canvasHeight / rect.height  // relationship bitmap vs. element for Y

    let xPos = (e.clientX - rect.left) * scaleX // scale mouse coordinates after they have
    let yPos = (e.clientY - rect.top) * scaleY  // been adjusted to be relative to element

    return new Pos(xPos, yPos)
}

function dragField(e: any) {
    if (e.button === 2) { //right mouse button
        parentEl.style.cursor = "grabbing"
        mousePosAtLastDrag = getAbsoluteMousePos(e)
        holdMouseWheel = true
    }
}

function stopDragField(e: any) {
    if (e.button === 2) { //right mouse button
        parentEl.style.cursor = "default"
        holdMouseWheel = false
    }
}

function mouseMove(e: any) {
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