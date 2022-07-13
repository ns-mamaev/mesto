import './index.css';
import {
  initialCards,
  validationSettings,
  selectors,
} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

//validation

const formValidators = {};
const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach(formElement => {
    const validator = new FormValidator(formElement, settings);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

enableValidation(validationSettings);

//profile edit
const profile = new UserInfo(selectors);

const handleProfileFormSubmit = (inputsValues) => {
  profile.setUserInfo(inputsValues)
};

const popupProfile = new PopupWithForm({
  popupSelector: selectors.popupProfile,
  closeButtonSelector: selectors.closeButton
}, handleProfileFormSubmit);
popupProfile.setEventListeners();

const profileEditButton = document.querySelector(selectors.profileEditButton);
const popupProfileInputName = document.querySelector(selectors.popupProfileInputName);
const popupProfileInputAbout = document.querySelector(selectors.popupProfileInputAbout);

profileEditButton.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  const {name, about} = profile.getUserInfo();
  popupProfileInputName.value = name;
  popupProfileInputAbout.value = about;
  
  popupProfile.open();
});

//Add card

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const addCard = (cardData) => {
  const card = new Card(cardData, selectors.cardTemplate, handleCardClick);
  const cardElement = card.generateCard();

  cardList.addItem(cardElement)
};

const cardList = new Section({
  items: initialCards,
  renderer: addCard
}, selectors.cardsList);

cardList.renderItems();

const cardAddButton = document.querySelector(selectors.addCardButton);

const popupNewCard = new PopupWithForm({
  popupSelector: selectors.popupAddCard,
  closeButtonSelector: selectors.closeButton
}, addCard);
popupNewCard.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: selectors.popupImage,
  closeButtonSelector: selectors.closeButton
});
imagePopup.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupNewCard.open();
});



