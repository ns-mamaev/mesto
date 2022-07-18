export default class UserInfo {
  constructor(selectors, userData) {
    this._nameField = document.querySelector(selectors.profileName);
    this._aboutField = document.querySelector(selectors.profileAbout);
    this._avatarElement = document.querySelector(selectors.profileAvatar);
    this._user = userData;
  }

  getUserInfo() {
    return this._user;
  }

  getUserId() {
    return this._user._id;
  }

  setUserInfo({name, about}) {
    this._user.name = name;
    this._user.about = about;
    this._nameField.textContent = name;
    this._aboutField.textContent = about;
  }

  setAvatar({avatar}) {
    this._avatarElement.src = avatar;
  }

}