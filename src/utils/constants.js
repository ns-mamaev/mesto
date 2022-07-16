// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   } 
// ];

export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__item_type_error',
  errorSelector: '.form__error',
  errorClass: 'form__error_visible'
};

export const selectors = {
  formSelector: '.form',
  inputSelector: '.form__item',
  closeButton: '.popup__close-button',
  popupProfile: '.popup_content_edit-profile',
  profileEditButton: '.profile__edit-button',
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about', 
  popupAddCard: '.popup_content_add-card',
  addCardButton: '.profile__add-button',
  cardsList: '.elements__list',
  cardTemplate: '#photo-card-template',
  card: '.photo-card',
  cardTitle: '.photo-card__title',
  cardImage: '.photo-card__image',
  cardLike: '.photo-card__like-button',
  cardLikeActive: 'photo-card__like-button_liked',
  cardDelete: '.photo-card__delete-button',
  popupImage: '.popup_content_zoomed-card-image',
  popupImageZoomedImg: '.popup__zoomed-image',
  popupImageCaption: '.popup__zoomed-image-caption',
  openedPopupClass: 'popup_opened'
};

