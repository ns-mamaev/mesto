import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(config) {
    super(config);
    this._image = this._popupElement.querySelector(selectors.popupImageZoomedImg);
    this._caption = this._popupElement.querySelector(selectors.popupImageCaption);
  }

  open(name, link) {
    this._image.alt = name;
    this._image.src = link;
    this._caption.textContent = name;
    super.open();
  }
}