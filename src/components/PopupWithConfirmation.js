import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {config, submitHandler}) {
    super(popupSelector, config);
    this._form = this._popupElement.querySelector(config.form);
    this._handleSubmit = submitHandler;
    this._submitButton = this._form.querySelector(config.submitButton);
  }

  setData(data) {
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Выполнение...';
      this._submitButton.setAttribute('disabled', '');
      this._handleSubmit(this._data)
        .then(() =>{
          this._submitButton.textContent = 'Выполнено!';
          this.close()
          setTimeout(() => {
            this._submitButton.textContent = 'Да';
            this._submitButton.removeAttribute('disabled');
          }, 1000)
        })
    });    
  }
}
