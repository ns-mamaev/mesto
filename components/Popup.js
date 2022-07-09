import { OPENED_POPUP_CLASS } from "../utils/constants.js";

export default class Popup {
  constructor(config) {
    this._popupElement = document.querySelector(config.popupSelector);
    this._closeButton = this._popupElement.querySelector(config.closeButtonSelector);
  }

  open() {
    this._popupElement.classList.add(OPENED_POPUP_CLASS);
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove(OPENED_POPUP_CLASS);
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
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