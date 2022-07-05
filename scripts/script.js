import initialCards from './initialCards.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';

const popupUser = new Popup('.popup_content_edit-profile');
popupUser.setEventListeners();

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
  popupUser.open();
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

const imagePopup = new PopupWithImage('.popup_content_zoomed-card-image');
imagePopup.setEventListeners();

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
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





