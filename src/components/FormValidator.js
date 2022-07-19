export default class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._errorSelector = settings.errorSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._buttonDisabledClass = settings.submitButtonDisabledClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _hasInvalidInputs() {
    const inputs = this._fieldsList.map(field => field.inputElement);
    return inputs.some(input => !input.validity.valid);
  };  

  _toggleButtonState() {
    if (this._hasInvalidInputs()) {
      this._buttonElement.setAttribute('disabled', '');
      this._buttonElement.classList.add(this._buttonDisabledClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._buttonDisabledClass);
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
    this._fieldsList = [];
    this._formElement.querySelectorAll(this._inputSelector).forEach(inputElement => {
      const errorElement = inputElement.parentNode.querySelector(this._errorSelector);
      const field = { inputElement, errorElement };
      this._fieldsList.push(field);

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, errorElement);
        this._toggleButtonState();
      });  
    })

    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();

    this._fieldsList.forEach(field => {
      this._hideInputError(field.inputElement, field.errorElement);
    });
  }
}

