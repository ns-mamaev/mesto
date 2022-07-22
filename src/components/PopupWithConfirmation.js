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

  _submit(evt) {
    evt.preventDefault();
    this._submitButton.textContent = 'Выполнение...';
    this._submitButton.setAttribute('disabled', '');
    this._handleSubmit(this._data)
      .then(() =>{
        this._submitButton.textContent = 'Выполнено!';
        setTimeout(this.close.bind(this), 1000);
      })
      .catch((err) => {
        console.log(`Ошибка выполнения запроса к серверу - ${err}`)
        this._submitButton.textContent = 'Упс( Ошибка сервера';
      })
      .finally(() => {
        setTimeout(() => {
          this._submitButton.textContent = 'Да';
          this._submitButton.removeAttribute('disabled');
        }, 1500);
      });  
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
    });  
  }
  
}
