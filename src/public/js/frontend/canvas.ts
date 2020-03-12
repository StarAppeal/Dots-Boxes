class Canvas {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    constructor(id: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(id)
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d")
    }
}