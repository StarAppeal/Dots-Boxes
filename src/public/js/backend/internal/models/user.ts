class User {
  _id: Number;
  private _email: string;
  private _username: string;
  private _profilePic: string;

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get username() {
    return this._username;
  }

  get profilePic() {
    return this._profilePic;
  }

}
