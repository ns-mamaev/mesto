const editProfileBtn = document.querySelector('.profile__edit-button'),
      popupEditProfile = document.querySelector('.popup_content_edit-profile'),
      closeModalBtn = popupEditProfile.querySelector('.popup__close-button'),
      formEditProfile = popupEditProfile.querySelector('.form_content_edit-profile'),
      nameInput = formEditProfile.querySelector('.form__item_content_profile-name'),
      aboutInput = formEditProfile.querySelector('.form__item_content_profile-about'),
      nameContainer = document.querySelector('.profile__name'),
      aboutContainer = document.querySelector('.profile__about'),
      openedPopupClass = 'popup_opened';

const openPopup = (popup) => {
  popup.classList.add(openedPopupClass);
};

const closePopup = function(popup) {
  popup.classList.remove(openedPopupClass);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameContainer.textContent = nameInput.value;
  aboutContainer.textContent = aboutInput.value;

  closePopup(popupEditProfile);
};

editProfileBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = nameContainer.textContent;  // заполняю форму при открытии данными из профиля
  aboutInput.value = aboutContainer.textContent;
});

closeModalBtn.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', formSubmitHandler);

//cards by template

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const photoCardTemplate = document.querySelector('#photo-card-template');
const cardList = document.querySelector('.elements__list');

const removeCard = function() {
  initialCards.splice(this.id.slice(5), 1);
  renderPhotoCards(initialCards);
};


const renderPhotoCards = (cardsArray) => {
  cardList.innerHTML = '';
  cardsArray.forEach((item, index) => {
    const card = photoCardTemplate.content.cloneNode(true);
    card.querySelector('.photo-card__title').textContent = item.name;
    const cardImg = card.querySelector('.photo-card__image');
    cardImg.setAttribute('src', item.link);
    cardImg.setAttribute('alt', item.name);

    const removeButton = card.querySelector('.photo-card__delete-button');
    removeButton.addEventListener('click', removeCard);
    removeButton.id = `card#${index}`;

    cardList.appendChild(card);
  });
};

renderPhotoCards(initialCards);

// add Card

const addCardButton = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_content_add-card');

addCardButton.addEventListener('click', () => {
  openPopup(popupAddImage);
});

document.querySelector('.popup_content_add-card .popup__close-button').addEventListener('click', () => {
  closePopup(popupAddImage);
});

const formAddCard = popupAddImage.querySelector('.form_content_add-card'),
    cardNameInput = formAddCard.querySelector('.form__item_content_new-place-name'),
    cardLinkInput = formAddCard.querySelector('.form__item_content_new-place-link');

const formAddCardHandler = (e) => {
  e.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  initialCards.unshift(newCard);
  renderPhotoCards(initialCards);
  closePopup(popupAddImage);
};

formAddCard.addEventListener('submit', formAddCardHandler);
