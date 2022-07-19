export default class Card {
  constructor(cardData, 
    {
      config, 
      clickOnImgHandler, 
      clickOnRemoveButtonHandler, 
      setLike,
      removeLike, 
      currentUserId
    }) {
    this._cardData = cardData;
    this._isOwnCard = cardData.owner._id === currentUserId ? true : false;
    this._currentUserId = currentUserId;
    this._config = config;

    this._handleClickOnImg = clickOnImgHandler;
    this._handleClickOnRemoveButton = clickOnRemoveButtonHandler;
    this._setLike = setLike;
    this._removeLike = removeLike;
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
    return this._cardData._id;
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._elementTitle = this._element.querySelector(this._config.cardTitle);
    this._elementImg = this._element.querySelector(this._config.cardImage);
    this._elementlikeButton = this._element.querySelector(this._config.cardLikeButton);
    this._elementLikesCounter = this._element.querySelector(this._config.cardLikesCounter);
    this._elementRemoveButton = this._element.querySelector(this._config.cardDeleteButton);
    
    // исключаем возможность отправки запроса на удаление чужих карточек
    if (!this._isOwnCard) {
      this._elementRemoveButton.remove();
      this._elementRemoveButton = null;
    }

    this._setEventListeners();

    this._elementTitle.textContent = this._cardData.name;
    this._elementImg.src = this._cardData.link;
    this._elementImg.alt = this._cardData.name;
    
    this._updateLikes()
    
    return this._element;
  }

  _setEventListeners() {
    this._elementImg.addEventListener('click', () => {
      this._handleClickOnImg(this._cardData.name, this._cardData.link);
    });
    this._elementlikeButton.addEventListener('click', () => {
      this._handleClickOnLike();
    });

    if (this._isOwnCard) {
      this._elementRemoveButton.addEventListener('click', () => {
        this._handleClickOnRemoveButton(this);
      });
    }
  }

  _updateLikes() {
    this._elementLikesCounter.textContent = this._cardData.likes.length;
    if (this._checkLikeStatus()) {
      this._elementlikeButton.classList.add(this._config.cardLikeActiveClass);
    } else {
      this._elementlikeButton.classList.remove(this._config.cardLikeActiveClass);
    }
  }

  _checkLikeStatus() {
    return this._cardData.likes
      .map(user => user._id)
      .some(id => id === this._currentUserId) 
  }

  _handleClickOnLike() {
    const handleClick = this._checkLikeStatus() ? this._removeLike : this._setLike;
    handleClick(this._cardData._id)
      .then((res) => {
        this._cardData = res;
        this._updateLikes()
      });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}