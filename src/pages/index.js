import './index.css';
import {
  validationSettings,
  selectors,
} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Api

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});


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

api.getUserInfo()
  .then(res => {
    profile.setUserInfo(res);
    profile.setAvatar(res);
  })
  .catch(err => console.log(`Данные профиля недоступны: ${err}`)); 

//Переписать 
const handleProfileFormSubmit = (inputsValues) => {
  api.changeUserInfo(inputsValues)
    .then((res) => {
      const {name, about} = res;
      profile.setUserInfo({name, about})
    })
    .catch(err => console.log(`Невозможно обновить профиль: ${err}`))
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

api.getInitialCards()
  .then(cards => {
    cardList.renderItems(cards)
  })
  .catch(err => console.log(`ошибка получения карточек: ${err}`));

const cardList = new Section({
  renderer: addCard,
}, selectors.cardsList);

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



