export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._aboutField = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      profileName: this._nameField.textContent, 
      profileAbout: this._aboutField.textContent,
    };
  }

  setUserInfo({ profileName, profileAbout}) {
    this._nameField.textContent = profileName;
    this._aboutField.textContent = profileAbout;
  }
}