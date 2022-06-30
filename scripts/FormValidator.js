class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }


  _hideInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _showInputError() {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass); 
  }

  _checkInputValidity(inputElement) {
    const errorElement = this.querySelector(`.form__error_field_${inputElement.name}`);  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this.querySelectorAll(this._inputSelector));
    const buttonElement = this.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });  
    });
  }

  enableValidation() {
    this.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }
}