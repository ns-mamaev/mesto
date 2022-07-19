export default class Card {
  constructor(cardData, {config, clickOnImgHandler, clickOnRemoveButtonHandler, currentUserId}) {
    this._cardName = cardData.name;
    this._cardImgLink = cardData.link;
    this._likesCount = cardData.likes.length;
    this._id = cardData._id;
    this._isOwnCard = cardData.owner._id === currentUserId ? true : false;
    
    this._config = config;

    this._handleClickOnImg = clickOnImgHandler;
    this._handleClickOnRemoveButton = clickOnRemoveButtonHandler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._config.cardTemplate)
      .content
      .querySelector(this._config.card)
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
    
    this._elementTitle = this._element.querySelector(this._config.cardTitle);
    this._elementImg = this._element.querySelector(this._config.cardImage);
    this._elementlikeButton = this._element.querySelector(this._config.cardLikeButton);
    this._elementLikesCount = this._element.querySelector(this._config.cardLikesCount);
    this._elementRemoveButton = this._element.querySelector(this._config.cardDeleteButton);
    
    // исключаем возможность отправки запроса на удаление чужих карточек
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
      this._handleClickOnImg(this._cardName, this._cardImgLink);
    });
    this._elementlikeButton.addEventListener('click', () => {
      this._handleLike();
    });

    if (this._isOwnCard) {
      this._elementRemoveButton.addEventListener('click', () => {
        this._handleClickOnRemoveButton(this);
      });
    }
  }

  _handleLike() {
    this._elementlikeButton.classList.toggle(this._config.cardLikeActiveClass);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}