import initialCards from './initialCards.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js';

//popups logic
const popups = document.querySelectorAll('.popup');
const CLASS_OPENED_POPUP = 'popup_opened';
const validationSettings = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

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
const profileFormValidator = new FormValidator(validationSettings, profileEditForm);
profileFormValidator.enableValidation();

const getProfileInfo = () => {
  nameInput.value = nameContainer.textContent;
  aboutInput.value = aboutContainer.textContent;
};

profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetValidation()
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

//cards

const cardsContainer = document.querySelector('.elements__list');
const createCard = (cardData) => {
  return (new Card(cardData, '#photo-card-template').generateCard());
}

cardsContainer.prepend(...initialCards.map(cardData => createCard(cardData)));  

const cardAddPopup = document.querySelector('.popup_content_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form_content_add-card');
const placeNameInput = cardAddForm.querySelector('.form__item_content_new-place-name');
const placeLinkInput = cardAddForm.querySelector('.form__item_content_new-place-link');

const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);
cardAddFormValidator.enableValidation();

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
  cardAddFormValidator.resetValidation();
  openPopup(cardAddPopup);
});

cardAddForm.addEventListener('submit', handleCreateCardFormSubmit);

console.log(profileFormValidator);

  export {openPopup};

