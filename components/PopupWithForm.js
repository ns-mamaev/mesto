import Popup from './Popup.js';
import { validationSettings } from '../utils/constants.js'

export default class PopupWithForm extends Popup {
  constructor(config, submitHandler) {
    super(config);
    this._handleSubmit = submitHandler;
    this._form = this._popupElement.querySelector(validationSettings.formSelector);
    this._inputList = this._form.querySelectorAll(validationSettings.inputSelector)   //наверно неправильно брать это из вадидации
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => values[input.name] = input.value);
    
    return values;
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