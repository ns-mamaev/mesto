import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, {config}) {
    super(popupSelector, config);
    this._image = this._popupElement.querySelector(config.zoomedImg);
    this._caption = this._popupElement.querySelector(config.zoomedImgCaption);
  }

  open(name, link) {
    this._image.alt = name;
    this._image.src = link;
    this._caption.textContent = name;
    super.open();
  }
}