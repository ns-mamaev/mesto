export default class Card {
  constructor({name, link, likes}, config, handleCardClick) {
    this._cardName = name;
    this._cardImgLink = link;
    this._likesCount = likes.length;

    this._templateSelector = config.templateSelector;
    this._cardSelector = config.cardSelector;
    this._titleSelector = config.titleSelector;
    this._imageSelector = config.imageSelector;
    this._btnLikeSelector = config.btnLikeSelector;
    this._likesCounterSelector = config.likesCounterSelector;
    this._activeLikeClass = config.activeLikeClass;
    this._btnDeleteSelector = config.btnDeleteSelector;

    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true)

    return cardElement;  
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._elementTitle = this._element.querySelector(this._titleSelector);
    this._elementImg = this._element.querySelector(this._imageSelector);
    this._elementlikeButton = this._element.querySelector(this._btnLikeSelector);
    this._elementLikesCount = this._element.querySelector(this._likesCounterSelector);
    this._elementRemoveButton = this._element.querySelector(this._btnDeleteSelector);

    this._setEventListeners();

    this._elementTitle.textContent = this._cardName;
    this._elementImg.src = this._cardImgLink;
    this._elementImg.alt = this._cardName;
    this._elementLikesCount.textContent = this._likesCount;
    
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
    this._elementlikeButton.classList.toggle(this._activeLikeClass);
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }
}