class Box {
    top: boolean
    right: boolean
    bot: boolean
    left: boolean
    ownedBy: number
    constructor(public x: number, public y: number) {
        this.top = false;
        this.left = false;
        this.bot = false;
        this.right = false;
        this.x = x;
        this.y = y;
        this.ownedBy = -1; // not owned by anyone
    }

}
