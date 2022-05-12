const editProfileBtn = document.querySelector('.profile__edit-button'),
      popup = document.querySelector('.popup'),
      closeModalBtn = popup.querySelector('.popup__close-button'),
      formElement = popup.querySelector('#profile'),
      nameInput = formElement.querySelector('#profile__name'),
      aboutInput = formElement.querySelector('#profile__about'),
      nameContainer = document.querySelector('.profile__name'),
      aboutContainer = document.querySelector('.profile__about'),
      openedPopupClass = 'popup_opened';

const openPopup = () => {
  popup.classList.add(openedPopupClass);
  nameInput.value = nameContainer.textContent;  // заполняю форму при открытии данными из профиля
  aboutInput.value = aboutContainer.textContent;
};

const closePopup = () => {
  popup.classList.remove(openedPopupClass);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameContainer.textContent = nameInput.value;
  aboutContainer.textContent = aboutInput.value;

  closePopup();
};

editProfileBtn.addEventListener('click', openPopup);

closeModalBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);


