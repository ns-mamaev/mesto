import initialCards from './initialCards.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

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

const profile = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
})

// const profileEditPopup = document.querySelector('.popup_content_edit-profile');
// const profileEditForm = profileEditPopup.querySelector('.form_content_edit-profile');
// const nameInput = profileEditForm.querySelector('.form__item_content_profile-name');
// const aboutInput = profileEditForm.querySelector('.form__item_content_profile-about');
// const nameContainer = document.querySelector('.profile__name');
// const aboutContainer = document.querySelector('.profile__about');

// const getProfileInfo = () => {
  //   nameInput.value = nameContainer.textContent;
  //   aboutInput.value = aboutContainer.textContent;
  // };
  
const profileEditButton = document.querySelector('.profile__edit-button');

const handleProfileFormSubmit = (data) => {
  profile.setUserInfo(data)
};

const popupProfile = new PopupWithForm('.popup_content_edit-profile', handleProfileFormSubmit);
popupProfile.setEventListeners();


profileEditButton.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  const profileInfo = profile.getUserInfo();
  document.querySelector('.form__item_content_profile-name').value = profileInfo.profileName;
  document.querySelector('.form__item_content_profile-about').value = profileInfo.profileAbout;
  
  popupProfile.open();
});



// profileEditForm.addEventListener('submit', handleProfileFormSubmit);

//add card

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const createCard = (cardData) => {
  const card = new Card(cardData, '#photo-card-template', handleCardClick);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    cardList.addItem(createCard(cardData))
  }
}, '.elements__list');

cardList.renderItems();

const cardAddButton = document.querySelector('.profile__add-button');
// const cardAddForm = cardAddPopup.querySelector('.form_content_add-card');
// const placeNameInput = cardAddForm.querySelector('.form__item_content_new-place-name');
// const placeLinkInput = cardAddForm.querySelector('.form__item_content_new-place-link');

const handleCreateCardFormSubmit = ({placeName: name, placeLink: link}) => {
  const cardData = {
    name,
    link
  }
  cardList.addItem(cardData);
};

const popupNewCard = new PopupWithForm('.popup_content_add-card', handleCreateCardFormSubmit);
popupNewCard.setEventListeners();

const imagePopup = new PopupWithImage('.popup_content_zoomed-card-image');
imagePopup.setEventListeners();


cardAddButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupNewCard.open();
});

// cardAddForm.addEventListener('submit', handleCreateCardFormSubmit);

//insert cards



// const cardsContainer = document.querySelector('.elements__list');
// const createCard = (cardData) => {
//   return (new Card(cardData, '#photo-card-template', handleCardClick).generateCard());
// }

// cardsContainer.prepend(...initialCards.map(cardData => createCard(cardData)));





