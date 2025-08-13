import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._inputList = Array.from(this._form.querySelectorAll('input'));
    this._submitButton = this._popup.querySelector('.popup__button_save'); 
    this._submitButtonDefaultText = this._submitButton.textContent;
  }

  // Cambia el texto del botón durante la carga
  renderLoading(isLoading, loadingText = 'Guardando...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText;
    }
  }

  // Obtiene los valores actuales de los inputs del formulario
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Añade el submit del formulario y el cierre con clic/Esc
  setEventListeners() {
    super.setEventListeners(); 

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
