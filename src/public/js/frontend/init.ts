zoomFunct(zoom)
setDefaultPaperPosition()
setFluffStyles()
gameCanvas.draw()
createField(gameCanvas.playableFieldWidth, gameCanvas.playableFieldHeight)
addField(0, 0, gameCanvas.playableFieldWidth, gameCanvas.playableFieldHeight)
mockGenerateAllPoints()
mockInsertGarfield()
displayCurrentUser(game.currentPlayer);

//iconModal.next()

parentEl.classList.remove("invisible")
