import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._handleSubmit = submitHandler;
    this._form = this._popupElement.querySelector('.form');
  }

  _getInputValues() {

  }

  _setEventListeners() {
    //
    super._setEventListeners();
  }

  close() {
    //
    super.close();
  }

}