import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(config, submitHandler) {
    super(config);
    this._form = this._popupElement.querySelector(config.formSelector);
    this._handleSubmit = submitHandler;
  }

  setData(data) {
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._data)
        .then(() => this.close());
    })
  }    
}


// evt.preventDefault();
// this._handleSubmit(id)
// this.close();