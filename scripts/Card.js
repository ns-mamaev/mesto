export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardName = cardData.name;
    this._cardImgLink= cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._elementlikeButton.classList.toggle('photo-card__like-button_liked');
    this._isLiked = !this._isLiked;
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }
}