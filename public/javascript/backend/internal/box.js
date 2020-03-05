class Box {
  constructor(x, y) {
      this.top = false;
      this.left = false;
      this.bot = false;
      this.right = false;
      this.x = x;
      this.y = y;
      this.ownedBy = -1; // not owned by anyone
  }

}
