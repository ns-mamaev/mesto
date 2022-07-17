import './index.css';
import {
  validationSettings,
  selectors,
} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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


//validation // что с валидацией пустой формы? Убрать?

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
let profile;

api.getUserInfo()
  .then(res => {
    profile = new UserInfo(selectors, res)
    profile.setUserInfo(res);
    profile.setAvatar(res);
    console.log(profile)
  })
  .catch(err => console.log(`Данные профиля недоступны: ${err}`)); 

  
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

// avatar popup

const changeAvatar = (data) => {
  api.changeUserInfo(data)
    .then(res => profile.setAvatar(res))
    .catch(err => console.log(`Невозможно обновить аватар: ${err}`));
}

const popupAvatar = new PopupWithForm({
  popupSelector: selectors.popupAvatar,
  closeButtonSelector: selectors.closeButton,
  openedClass: selectors.openedPopupClass,
  formSelector: selectors.formSelector,
  inputSelector: selectors.inputSelector
}, changeAvatar);
popupAvatar.setEventListeners();

const avatarEditButton = document.querySelector(selectors.avatarEditButton);
avatarEditButton.addEventListener('click', () => {
  formValidators['edit-avatar'].resetValidation();
  popupAvatar.open();
});


//confirmation popup

const confirmationPopup = new PopupWithConfirmation({
  popupSelector: selectors.popupConfirmation,
  closeButtonSelector: selectors.closeButton,
  formSelector: selectors.formSelector,
  openedClass: selectors.openedPopupClass
})

confirmationPopup.setEventListeners();

//Add card

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const handleRemove = () => {
  confirmationPopup.open()
}

const createCard = (cardData) => {
  const card = new Card(cardData, 
  {
    templateSelector: selectors.cardTemplate,
    cardSelector: selectors.card,
    titleSelector: selectors.cardTitle,
    imageSelector: selectors.cardImage,
    btnLikeSelector: selectors.cardLike,
    likesCounterSelector: selectors.cardLikesCount,
    activeLikeClass: selectors.cardLikeActive,
    btnDeleteSelector: selectors.cardDelete,
  },
  handleCardClick, profile.getUserId());

  return card.generateCard();
};

const renderCard = (cardData) => cardList.addItem(createCard(cardData));

const addCard = (data) => {
  api.addCard(data)
    .then(data => renderCard(data))
    .catch(err => console.log(`Ошибка добавления карточки: ${err}`));
}
 
api.getInitialCards()
  .then(cards => {
    cardList.renderItems(cards)
  })
  .catch(err => console.log(`ошибка получения карточек: ${err}`));

const cardList = new Section({
  renderer: renderCard,
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



