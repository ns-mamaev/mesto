import './index.css';
import {validationSettings, selectors} from '../utils/constants.js'
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: 'c057a3e7-5ee0-421c-b032-822b62f6abd9',
    'Content-Type': 'application/json'
  }
});

//Validation

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
  
const editProfile = (inputsValues) => {
  return api.changeUserInfo(inputsValues)
    .then((res) => {
      const {name, about} = res;
      profile.setUserInfo({name, about});
    })
    .catch(err => console.log(`Невозможно обновить профиль: ${err}`))
};

const popupProfile = new PopupWithForm(selectors.popupProfile, {
  config: selectors,
  submitHandler: editProfile
});
popupProfile.setEventListeners();

const profileEditButton = document.querySelector(selectors.profileEditButton);
profileEditButton.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  popupProfile.setInputValues(profile.getUserInfo());
  popupProfile.open();
});

// avatar popup

const changeAvatar = (data) => {
  return api.changeAvatar(data)
    .then(res => {
      profile.setAvatar(res);
    })
    .catch(err => console.log(`Невозможно обновить аватар: ${err}`));
}

const popupAvatar = new PopupWithForm(selectors.popupAvatar, {
  config: selectors,
  submitHandler: changeAvatar
});
popupAvatar.setEventListeners();

const avatarEditButton = document.querySelector(selectors.avatarEditButton);
avatarEditButton.addEventListener('click', () => {
  formValidators['edit-avatar'].resetValidation();
  popupAvatar.open();
});

//confirmation popup

const removeCard = (card) => {
  return api.deleteCard(card.getId())
    .then(() => {
      card.removeCard();
    })
}

const confirmationPopup = new PopupWithConfirmation(selectors.confirmationPopup, {
  config: selectors,
  submitHandler: removeCard
})
confirmationPopup.setEventListeners();

// zoomed img 

const imagePopup = new PopupWithImage(selectors.popupImage, {
  config: selectors
});
imagePopup.setEventListeners();

const cardAddButton = document.querySelector(selectors.addCardButton);
cardAddButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupNewCard.open();
});

// card

const zoomImage = (name, link) => {
  imagePopup.open(name, link);
};

const handleClickOnDeleteIcon = (card) => {
  confirmationPopup.open()
  confirmationPopup.setData(card)
}

const setLike = (id) => api.setLike(id);
const removeLike = (id) => api.removeLike(id);

const createCard = (cardData) => {
  const card = new Card(cardData, {
    config: selectors,
    clickOnImgHandler: zoomImage,
    clickOnRemoveButtonHandler: handleClickOnDeleteIcon,
    setLike: setLike,
    removeLike: removeLike,
    currentUserId: profile.getUserId()
  })
  return card.generateCard();
};

const renderCard = (cardData) => cardList.addItem(createCard(cardData));

const addCard = (data) => {
  return api.addCard(data)
    .then(data => {
      renderCard(data);
    })
}

//new Card Popup

const popupNewCard = new PopupWithForm(selectors.popupAddCard, {
  config: selectors,
  submitHandler: addCard
})
popupNewCard.setEventListeners();

const cardList = new Section(selectors.cardsList, {
  renderer: renderCard,
});

let profile;
const loadingScreen = document.querySelector('.loading-screen');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profile = new UserInfo(selectors, userData)
    profile.setUserInfo(userData);
    profile.setAvatar(userData);
    
    cardList.renderItems(cards);

    loadingScreen.classList.add('loading-screen_disabled');
  })
  .catch(err => {
    console.log(`Ошибка запроса к серверу: ${err}`)
    loadingScreen.textContent = 'Не удается подключиться к серверу, попробуйте перезагрузить страницу или зайти позже'
  }); 



