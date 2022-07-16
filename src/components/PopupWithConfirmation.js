import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(config, submitHandler) {
    super(config);
    this._handleSubmit = submitHandler;
    this._form = this._popupElement.querySelector(config.formSelector);
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleSubmit();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
      this.close();
    });
  }

}