import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(config, submitHandler) {
    super(config);
    this._handleSubmit = submitHandler;
    this._form = this._popupElement.querySelector(config.formSelector);
    this._inputList = this._form.querySelectorAll(config.inputSelector) 
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => values[input.name] = input.value);
    
    return values;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}