import { openPopup } from "./script.js";

const imagePopup = document.querySelector('.popup_content_zoomed-card-image');
const zoomedImage = imagePopup.querySelector('.popup__zoomed-image');
const zoomedImageCaption = imagePopup.querySelector('.popup__zoomed-image-caption');

export default class Card {
  constructor(cardData, templateSelector) {
    this._cardName = cardData.name;
    this._cardImgLink= cardData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true)

    return cardElement;  
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._elementTitle = this._element.querySelector('.photo-card__title');
    this._elementImg = this._element.querySelector('.photo-card__image');
    this._elementlikeButton = this._element.querySelector('.photo-card__like-button');
    this._elementRemoveButton = this._element.querySelector('.photo-card__delete-button');

    this._setEventListeners();

    this._elementTitle.textContent = this._cardName;
    this._elementImg.src = this._cardImgLink;
    this._elementImg.alt = this._cardName;
    
    return this._element;
  }

  _setEventListeners() {
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick();
    });
    this._elementlikeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._elementRemoveButton.addEventListener('click', () => {
      this._removeCard();
    });
  }

  _handleCardClick() {
    openPopup(imagePopup);
    zoomedImage.src = this._cardImgLink;
    zoomedImage.alt = this._cardName;
    zoomedImageCaption.textContent = this._cardName;
  }

  _handleLike() {
    this._elementlikeButton.classList.toggle('photo-card__like-button_liked');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }
}