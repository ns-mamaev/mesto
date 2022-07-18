export default class Card {
  constructor({name, link, likes, id, owner}, config, handleCardClick, userId, handleRemove) {
    this._cardName = name;
    this._cardImgLink = link;
    this._likesCount = likes.length;
    this._id = id;
    this._owner = owner;
    this._isOwnCard = owner._id === userId ? true : false;

    this._templateSelector = config.templateSelector;
    this._cardSelector = config.cardSelector;
    this._titleSelector = config.titleSelector;
    this._imageSelector = config.imageSelector;
    this._btnLikeSelector = config.btnLikeSelector;
    this._likesCounterSelector = config.likesCounterSelector;
    this._activeLikeClass = config.activeLikeClass;
    this._btnDeleteSelector = config.btnDeleteSelector;

    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemove;
  }

  // getOwnerId() {
  //   return this._owner._id;
  // }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true)

    return cardElement;  
  }

  getElement() {
    return this._element;
  }

  getId() {
    return this._id;
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._elementTitle = this._element.querySelector(this._titleSelector);
    this._elementImg = this._element.querySelector(this._imageSelector);
    this._elementlikeButton = this._element.querySelector(this._btnLikeSelector);
    this._elementLikesCount = this._element.querySelector(this._likesCounterSelector);
    this._elementRemoveButton = this._element.querySelector(this._btnDeleteSelector);
    
    if (!this._isOwnCard) {
      this._elementRemoveButton.remove();
      this._elementRemoveButton = null;
    }

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

    if (this._isOwnCard) {
      this._elementRemoveButton.addEventListener('click', () => {
        this._handleRemoveCard(this);
      });
    }
  }

  _handleLike() {
    this._elementlikeButton.classList.toggle(this._activeLikeClass);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}