const CLASS_OPENED_POPUP = 'popup_opened';

const openPopup = popup => popup.classList.add(CLASS_OPENED_POPUP);

const closePopup = popup => popup.classList.remove(CLASS_OPENED_POPUP);

const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

buttonsClosePopup.forEach(button => {
  button.addEventListener('click', evt => {
    const popup = evt.target.parentNode.parentNode;
    closePopup(popup);
  });
});

//profile

const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = popupEditProfile.querySelector('.form_content_edit-profile');
const nameInput = formEditProfile.querySelector('.form__item_content_profile-name');
const aboutInput = formEditProfile.querySelector('.form__item_content_profile-about');
const nameContainer = document.querySelector('.profile__name');
const aboutContainer = document.querySelector('.profile__about');

const getProfileInfo = () => {
  nameInput.value = nameContainer.textContent;
  aboutInput.value = aboutContainer.textContent;
};

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  getProfileInfo();
});

const formSubmitHandler = evt => {
  evt.preventDefault();
  nameContainer.textContent = nameInput.value;
  aboutContainer.textContent = aboutInput.value;
  closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', formSubmitHandler);

//cards

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

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#photo-card-template').content;

const renderLike = evt => evt.target.classList.toggle('photo-card__like-button_liked');

const removeCard = evt => evt.target.parentNode.remove();

const popupZoomedImage = document.querySelector('.popup_content_zoomed-card-image');
const zoomedImage = popupZoomedImage.querySelector('.popup__zoomed-image');
const zoomedImageCaption = zoomedImage.nextElementSibling;

const openZoomedImage = evt => {
  openPopup(popupZoomedImage);
  zoomedImage.src = evt.target.src;
  zoomedImage.alt = evt.target.alt;
  zoomedImageCaption.textContent = evt.target.alt;
};

const addCard = cardDescription => {
  const newCard = cardTemplate.querySelector('.photo-card').cloneNode(true);
  const cardTitle = newCard.querySelector('.photo-card__title');
  const cardImg = newCard.querySelector('.photo-card__image');
  const buttonLike = newCard.querySelector('.photo-card__like-button');
  const buttonRemove = newCard.querySelector('.photo-card__delete-button');

  cardTitle.textContent = cardDescription.name;
  cardImg.src = cardDescription.link;
  cardImg.alt = cardDescription.name;

  buttonLike.addEventListener('click', renderLike);
  buttonRemove.addEventListener('click', removeCard);
  cardImg.addEventListener('click', openZoomedImage);

  cardsContainer.prepend(newCard);
};

initialCards.forEach(card => {
  addCard(card);
});

//add Card

const popupAddCard = document.querySelector('.popup_content_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('.form_content_add-card');

const formCreateCardHandler = evt => {
  evt.preventDefault();
  const card = {};
  card.name = formAddCard.querySelector('.form__item_content_new-place-name').value;
  card.link = formAddCard.querySelector('.form__item_content_new-place-link').value;
  addCard(card);

  closePopup(popupAddCard);
  formAddCard.reset();
};

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', formCreateCardHandler);

