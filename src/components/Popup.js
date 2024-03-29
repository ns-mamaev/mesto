export default class Popup {
  constructor(popupSelector, config) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(config.closeButton);
    this._openedClass = config.openedPopupClass;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add(this._openedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(this._openedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => this._handleCliskClose(evt));
  }

  _handleCliskClose(evt) {
    if (evt.target === this._popupElement || evt.target === this._closeButton) {
        this.close();
    }
  }
}