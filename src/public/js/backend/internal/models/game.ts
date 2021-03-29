class Game {
  private _id: number;
  private _field: Field;
  private _gameResult: GameResult;

  constructor(game: any){
    this._id = game.id;
    this._field = game.field;
    this._gameResult = game.gameResult;
  }

  get id(): number {
    return this._id;
  }

  get field(): Field {
    return this._field;
  }

  get gameResult(): GameResult {
    return this._gameResult;
  }

  public static getInstance(metadata: UserMetadata): User[] {
    let result: User[] = null;
    new RestCaller().get<User[]>("/rest/users/").then(response => { result = response }).catch(error => { throw error });
    return result;
  }

}
