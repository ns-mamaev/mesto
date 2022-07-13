import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(config) {
    super(config);
    this._image = this._popupElement.querySelector(config.imageSelector);
    this._caption = this._popupElement.querySelector(config.captionSelector);
  }

  open(name, link) {
    this._image.alt = name;
    this._image.src = link;
    this._caption.textContent = name;
    super.open();
  }
}