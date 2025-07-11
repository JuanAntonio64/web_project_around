export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
  }

  _showError(input, errorElement) {
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showError(input, errorElement);
    } else {
      this._hideError(input, errorElement);
    }
  }

  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
