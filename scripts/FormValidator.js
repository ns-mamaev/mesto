export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _hasInvalidInputs(inputList) {
    return inputList.some(input => !input.validity.valid);
  };  

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInputs(inputList)) {
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.removeAttribute('disabled');
    }  
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass); 
  }

  _checkInputValidity(inputElement, errorElement) {  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.form__error_field_${inputElement.name}`);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, errorElement);
        this._toggleButtonState(inputList, buttonElement);
      });  
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }
}

