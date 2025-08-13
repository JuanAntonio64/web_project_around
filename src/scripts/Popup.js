export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Método para abrir el popup y agregar el listener de Escape
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Método para cerrar el popup y quitar el listener de Escape
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Lógica para cerrar el popup si se presiona Escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Agrega listeners al fondo del popup y al botón de cerrar
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup') || 
        evt.target.classList.contains('popup__button_close')
      ) {
        this.close();
      }
    });
  }
}
