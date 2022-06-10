const popups = document.querySelectorAll('.popup');
const CLASS_OPENED_POPUP = 'popup_opened';

const closePopupByEsc = function(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(`.${CLASS_OPENED_POPUP}`));
  }
};

const openPopup = popup => {
  popup.classList.add(CLASS_OPENED_POPUP);
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = popup => {
  popup.classList.remove(CLASS_OPENED_POPUP);
  document.removeEventListener('keydown', closePopupByEsc);
};

const disableSubmitButton = buttonElement => buttonElement.setAttribute('disabled', '');


const handleClickOnPopup = function (evt) {
  if (evt.target === this || evt.target.classList.contains('popup__close-button')) {
    closePopup(this);
  }
};

popups.forEach(popup => popup.addEventListener('mousedown', handleClickOnPopup));

//profile

const profileEditPopup = document.querySelector('.popup_content_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form_content_edit-profile');
const nameInput = profileEditForm.querySelector('.form__item_content_profile-name');
const aboutInput = profileEditForm.querySelector('.form__item_content_profile-about');
const nameContainer = document.querySelector('.profile__name');
const aboutContainer = document.querySelector('.profile__about');

const getProfileInfo = () => {
  nameInput.value = nameContainer.textContent;
  aboutInput.value = aboutContainer.textContent;
};

profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  getProfileInfo();
});

const handleProfileFormSubmit = evt => {
  evt.preventDefault();
  nameContainer.textContent = nameInput.value;
  aboutContainer.textContent = aboutInput.value;
  closePopup(profileEditPopup);
  const submitButton = evt.target.querySelector('.form__button');
  disableSubmitButton(submitButton);
};

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

//cards

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#photo-card-template').content;

const renderLike = evt => evt.target.classList.toggle('photo-card__like-button_liked');

const removeCard = evt => evt.target.closest('.photo-card').remove();

const imagePopup = document.querySelector('.popup_content_zoomed-card-image');
const zoomedImage = imagePopup.querySelector('.popup__zoomed-image');
const zoomedImageCaption = imagePopup.querySelector('.popup__zoomed-image-caption');

const handleCardClick = (imageDescription) => {
  openPopup(imagePopup);
  zoomedImage.src = imageDescription.link;
  zoomedImage.alt = imageDescription.name;
  zoomedImageCaption.textContent = imageDescription.name;
};

const createCard = (cardDescription) => {
  const cardElement = cardTemplate.querySelector('.photo-card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.photo-card__title');
  const cardImg = cardElement.querySelector('.photo-card__image');
  const likeButton = cardElement.querySelector('.photo-card__like-button');
  const buttonRemove = cardElement.querySelector('.photo-card__delete-button');

  cardTitle.textContent = cardDescription.name;
  cardImg.src = cardDescription.link;
  cardImg.alt = cardDescription.name;

  likeButton.addEventListener('click', renderLike);
  buttonRemove.addEventListener('click', removeCard);
  cardImg.addEventListener('click', () => handleCardClick(cardDescription));

  return cardElement;
};

const addCard = cardDescription => {
  const newCard = createCard(cardDescription);
  cardsContainer.prepend(newCard);
};

cardsContainer.prepend(...initialCards.map(cardDescription => createCard(cardDescription)));  //создаю массив карточек и добавляю их сразу вместе

//add Card form

const cardAddPopup = document.querySelector('.popup_content_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form_content_add-card');
const placeNameInput = cardAddForm.querySelector('.form__item_content_new-place-name');
const placeLinkInput = cardAddForm.querySelector('.form__item_content_new-place-link');

const handleCreateCardFormSubmit = evt => {
  evt.preventDefault();
  const card = {};
  card.name = placeNameInput.value;
  card.link = placeLinkInput.value;
  addCard(card);

  closePopup(cardAddPopup);
  cardAddForm.reset();
  const submitButton = evt.target.querySelector('.form__button');
  disableSubmitButton(submitButton);
};

cardAddButton.addEventListener('click', () => {
  openPopup(cardAddPopup);
});

cardAddForm.addEventListener('submit', handleCreateCardFormSubmit);


