import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(config) {
    super(config);
    this._form = this._popupElement.querySelector(config.formSelector);
  }

  _submit(evt) {
    evt.preventDefault();
    return true;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
      this.close();
    });
  }

}