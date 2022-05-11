const editProfileBtn = document.querySelector('.profile__edit-button'),
      popup = document.querySelector('.popup'),
      closeModalBtn = popup.querySelector('.popup__close-button'),
      formElement = popup.querySelector('#profile'),
      nameInput = formElement.querySelector('#profile__name'),
      aboutInput = formElement.querySelector('#profile__about'),
      nameContainer = document.querySelector('.profile__name'),
      aboutContainer = document.querySelector('.profile__about');

const openPopup = (block, visibilityClass) => {
  block.classList.add(visibilityClass);
  nameInput.value = nameContainer.textContent;  // заполняю форму при открытии данными из профиля
  aboutInput.value = aboutContainer.textContent;
};

const closePopup = (block, visibilityClass) => {
  block.classList.remove(visibilityClass);
  document.removeEventListener('keydown', closePopupByEsc);  // отслеживаю нажатие Esc только при открытом окне
};

const closePopupByEsc = (evt) => {
  if (evt.code === 'Escape') {
    closePopup(popup, 'popup_opened');  //добавил закрытие по Esc - по ТЗ нет, но с точки зрения UX вроде как просится
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameContainer.textContent = nameInput.value;
  aboutContainer.textContent = aboutInput.value;

  closePopup(popup, 'popup_opened');
};

editProfileBtn.addEventListener('click', () => {
  openPopup(popup, 'popup_opened');
  document.addEventListener('keydown', closePopupByEsc);  // отслеживаю нажатие Esc при открытом окне
});

popup.addEventListener('click', event => {
  if (event.target === popup || event.target === closeModalBtn) {
    closePopup(popup, 'popup_opened');
  }
});

formElement.addEventListener('submit', formSubmitHandler);


