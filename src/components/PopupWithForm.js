import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {config, submitHandler}) {
    super(popupSelector, config);
    this._handleSubmit = submitHandler;
    this._form = this._popupElement.querySelector(config.form);
    this._submitButton = this._form.querySelector(config.submitButton);
    this._inputList = this._form.querySelectorAll(config.formInput); 
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
    this._submitButton.textContent = 'Сохранение...';
    this._submitButton.setAttribute('disabled', '');
    this._handleSubmit(this._getInputValues())
      .then(() =>{
        this._submitButton.textContent = 'Сохранено!';
        setTimeout(this.close.bind(this), 1000);
      })
      .catch((err) => {
        console.log(`Ошибка выполнения запроса к серверу - ${err}`)
        this._submitButton.textContent = 'Упс( Ошибка сервера';
      })
      .finally(() => {
        setTimeout(() => {
          this._submitButton.textContent = 'Сохранить';
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

  close() {
    super.close();
    this._form.reset()
  }

}