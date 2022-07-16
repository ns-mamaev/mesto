export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._aboutField = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent, 
      about: this._aboutField.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameField.textContent = name;
    this._aboutField.textContent = about;
  }

  setAvatar({avatar}) {
    this._avatar.src = avatar;
  }
}