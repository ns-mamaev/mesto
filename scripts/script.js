import initialCards from './initialCards.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js';

//open-close popups
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

const closePopup = (popup) => {
  popup.classList.remove(CLASS_OPENED_POPUP);
  document.removeEventListener('keydown', closePopupByEsc);
};

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });   
});

//validation

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

const formValidators = {};
const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach(formElement => {
    const validator = new FormValidator(formElement, settings);
    const formName = formElement.name;
    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

enableValidation(validationSettings);

//profile edit

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
  formValidators['edit-profile'].resetValidation();
  openPopup(profileEditPopup);
  getProfileInfo();
});

const handleProfileFormSubmit = evt => {
  evt.preventDefault();
  nameContainer.textContent = nameInput.value;
  aboutContainer.textContent = aboutInput.value;
  closePopup(profileEditPopup);
};

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

//add card

const cardAddPopup = document.querySelector('.popup_content_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form_content_add-card');
const placeNameInput = cardAddForm.querySelector('.form__item_content_new-place-name');
const placeLinkInput = cardAddForm.querySelector('.form__item_content_new-place-link');

const imagePopup = document.querySelector('.popup_content_zoomed-card-image');
const zoomedImage = imagePopup.querySelector('.popup__zoomed-image');
const zoomedImageCaption = imagePopup.querySelector('.popup__zoomed-image-caption');

const handleCardClick = (name, link) => {
  zoomedImage.src = link;
  zoomedImage.alt = name;
  zoomedImageCaption.textContent = name;
  openPopup(imagePopup);
};

const handleCreateCardFormSubmit = evt => {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  }  
  cardsContainer.prepend(createCard(cardData));

  closePopup(cardAddPopup);
  cardAddForm.reset();
};

cardAddButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  openPopup(cardAddPopup);
});

cardAddForm.addEventListener('submit', handleCreateCardFormSubmit);

//insert cards

const cardsContainer = document.querySelector('.elements__list');
const createCard = (cardData) => {
  return (new Card(cardData, '#photo-card-template', handleCardClick).generateCard());
}

cardsContainer.prepend(...initialCards.map(cardData => createCard(cardData)));





