import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(config, submitHandler) {
    super(config);
    this._form = this._popupElement.querySelector(config.formSelector);
    this._handleSubmit = submitHandler
  }

  handleSubmit(id) {
    return new Promise((resolve, reject) => {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit(id)
          .then(() => {
            this.close()
            resolve(true);
            reject('Ошибка добавления карточки')
          })
      });
    })
  }
}


// evt.preventDefault();
// this._handleSubmit(id)
// this.close();