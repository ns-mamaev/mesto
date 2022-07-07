export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._aboutField = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent, 
      about: this._aboutField.textContent,
    };
  }

  setUserInfo({name, about}) {
    this._nameField.textContent = name;
    this._aboutField.textContent = about;
  }
}