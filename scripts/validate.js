
  const formEdit = document.querySelector('.popup__form-edit');
  const formAdd = document.querySelector('.popup__form-add');


// validate.js

export function showError(input, errorElement) {
  errorElement.textContent = input.validationMessage;
  input.classList.add('popup__input_invalid');
}

export function hideError(input, errorElement) {
  errorElement.textContent = '';
  input.classList.remove('popup__input_invalid');
}

export function checkInputValidity(input, errorElement) {
  if (!input.validity.valid) {
    showError(input, errorElement);
  } else {
    hideError(input, errorElement);
  }
}

export function toggleButtonState(form, button) {
  if (form.checkValidity()) {
    button.disabled = false;
    button.classList.remove('popup__button_disabled');
  } else {
    button.disabled = true;
    button.classList.add('popup__button_disabled');
  }
}
