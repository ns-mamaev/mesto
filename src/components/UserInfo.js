export default class UserInfo {
  constructor(selectors, userData) {
    this._nameField = document.querySelector(selectors.nameSelector);
    this._aboutField = document.querySelector(selectors.aboutSelector);
    this._avatarElement = document.querySelector(selectors.avatarSelector);
    this._user = userData;
  }

  getUserInfo() {
    return this._user;
  }

  getUserId() {
    return this._user._id;
  }

  setUserInfo({ name, about }) {
    this._nameField.textContent = name;
    this._aboutField.textContent = about;
  }

  setAvatar({avatar}) {
    this._avatarElement.src = avatar;
  }

}