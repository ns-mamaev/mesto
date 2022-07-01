export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _hasInvalidInputs() {
    return this._inputList.some(input => !input.validity.valid);
  };  

  _toggleButtonState() {
    if (this._hasInvalidInputs(this._inputList)) {
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.removeAttribute('disabled');
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
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.form__error_field_${inputElement.name}`);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, errorElement);
        this._toggleButtonState();
      });  
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.form__error_field_${inputElement.name}`);
      this._hideInputError(inputElement, errorElement);
    });
  }
}

