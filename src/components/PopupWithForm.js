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
    this._submitButton.textContent = 'Сохранение...'
    this._handleSubmit(this._getInputValues())
      .then(() =>{
        this._submitButton.textContent = 'Cохранено!';
        this.close()
        setTimeout(() => {
          this._submitButton.textContent = 'Сохранить';
        }, 1000)
      })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
    });
  }

  close() {
    super.close();
    setTimeout(() => {
      this._form.reset();
    }, 500) //сброс формы только после окончания анимации
  }

}