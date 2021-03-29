class Move {
  private _x: number;
  private _y: number;
  private _direction: string;
  private _fieldId: number;
  private _userId: number;

  constructor(a: number, b: number, c: number) {

  }

  get x(): number {
    return this._x;
  }

  set x(x: number) {
    this._x = x;
  }

  get y(): number {
    return this._y;
  }
  set y(y: number) {
    this._y = y;
  }

  get direction(): string {
    return this._direction;
  }

  get fieldId(): number {
    return this._fieldId;
  }

  get userId(): number {
    return this._userId;
  }

}
