import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._handleSubmit = submitHandler;
    this._form = this._popupElement.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item')
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}