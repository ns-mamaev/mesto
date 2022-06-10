const hasInvalidInputs = (inputList) => inputList.some(input => !input.validity.valid);

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInputs(inputList)) {
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.removeAttribute('disabled', true);
  }  
};

const showInputError = (inputElement, errorElement, settings) => {
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass); 
};

const hideInputError = (inputElement, errorElement, settings) => {
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);  
  };

const checkInputValidity = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.form__error_field_${inputElement.name}`);  
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, settings);
  } else {
    hideInputError(inputElement, errorElement, settings);
  }
};


const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement)

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement);
    });  
  });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
}); 