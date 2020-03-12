class LineValidator {
    constructor(linePos) {
        this.linePos = linePos;
        this.linePos = linePos;
    }
    isLineInsidePlayableArea(playableFieldWidth, playableFieldHeight) {
        return this.linePos.x >= 0 && this.linePos.x <= playableFieldWidth
            && this.linePos.y >= 0 && this.linePos.y <= playableFieldHeight;
    }
    isLineValid() {
        return this.linePos.x % 1 != this.linePos.y % 1;
    }
    isMarkerVertical() {
        return this.linePos.x % 1 == 0;
    }
}
