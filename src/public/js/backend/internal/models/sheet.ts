class Sheet {
  private _id: number;
  private _user: User;
  private _archived: boolean;

  get id() {
    return this._id;
  }

  get user() {
    return this._user;
  }

  get archived() {
    return this._archived;
  }

}
