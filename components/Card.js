import { selectors } from "../utils/constants.js";

export default class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._cardName = name;
    this._cardImgLink = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(selectors.card)
      .cloneNode(true)

    return cardElement;  
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._elementTitle = this._element.querySelector(selectors.cardTitle);
    this._elementImg = this._element.querySelector(selectors.cardImage);
    this._elementlikeButton = this._element.querySelector(selectors.cardLike);
    this._elementRemoveButton = this._element.querySelector(selectors.cardDelete);

    this._setEventListeners();

    this._elementTitle.textContent = this._cardName;
    this._elementImg.src = this._cardImgLink;
    this._elementImg.alt = this._cardName;
    
    return this._element;
  }

  _setEventListeners() {
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._cardImgLink);
    });
    this._elementlikeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._elementRemoveButton.addEventListener('click', () => {
      this._removeCard();
    });
  }

  _handleLike() {
    this._elementlikeButton.classList.toggle(selectors.cardLikeActive);
    this._isLiked = !this._isLiked;
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }
}