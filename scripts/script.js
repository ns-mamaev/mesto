const editProfileBtn = document.querySelector('.profile__edit-button'),
      popup = document.querySelector('.popup'),
      closeModalBtn = popup.querySelector('.popup__close-button'),
      formElement = popup.querySelector('#profile'),
      nameInput = formElement.querySelector('#profile__name'),
      aboutInput = formElement.querySelector('#profile__about'),
      nameContainer = document.querySelector('.profile__name'),
      aboutContainer = document.querySelector('.profile__about'),
      openedPopupClass = 'popup_opened';

const openPopup = () => {
  popup.classList.add(openedPopupClass);
  nameInput.value = nameContainer.textContent;  // заполняю форму при открытии данными из профиля
  aboutInput.value = aboutContainer.textContent;
};

const closePopup = () => {
  popup.classList.remove(openedPopupClass);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameContainer.textContent = nameInput.value;
  aboutContainer.textContent = aboutInput.value;

  closePopup();
};

editProfileBtn.addEventListener('click', openPopup);

closeModalBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

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
