import Popup from "./Popup";

export default class PopupWithForm {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._handleSubmit = submitHandler;
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