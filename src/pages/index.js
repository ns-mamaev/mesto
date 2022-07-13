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
  closeButtonSelector: selectors.closeButton,
  openedClass: selectors.openedPopupClass,
  formSelector: selectors.formSelector,
  inputSelector: selectors.inputSelector
}, 
handleProfileFormSubmit);
popupProfile.setEventListeners();

const profileEditButton = document.querySelector(selectors.profileEditButton);

profileEditButton.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  popupProfile.setInputValues(profile.getUserInfo());
  popupProfile.open();
});

//Add card

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const createCard = (cardData) => {
  const card = new Card(cardData, 
  {
    templateSelector: selectors.cardTemplate,
    cardSelector: selectors.card,
    titleSelector: selectors.cardTitle,
    imageSelector: selectors.cardImage,
    btnLikeSelector: selectors.cardLike,
    activeLikeClass: selectors.cardLikeActive,
    btnDeleteSelector: selectors.cardDelete,
  },
  handleCardClick);

  return card.generateCard();
};

const addCard = (cardData) => cardList.addItem(createCard(cardData));

const cardList = new Section({
  items: initialCards,
  renderer: addCard,
}, selectors.cardsList);

cardList.renderItems();

const cardAddButton = document.querySelector(selectors.addCardButton);

const popupNewCard = new PopupWithForm({
  popupSelector: selectors.popupAddCard,
  closeButtonSelector: selectors.closeButton,
  formSelector: selectors.formSelector,
  inputSelector: selectors.inputSelector,
  openedClass: selectors.openedPopupClass
},
 addCard);
popupNewCard.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: selectors.popupImage,
  closeButtonSelector: selectors.closeButton,
  imageSelector: selectors.popupImageZoomedImg,
  captionSelector: selectors.popupImageCaption,
  openedClass: selectors.openedPopupClass
});
imagePopup.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupNewCard.open();
});



