export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function setPopupListeners() {
  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (e) => {
      if (e.target === popup) closePopup(popup);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) closePopup(openedPopup);
    }
  });
}


export const formEdit = document.querySelector('.popup__form-edit');
export const formAdd = document.querySelector('.popup__form-add');

export const popupEdit = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');
export const popupImage = document.querySelector('#popup-image');
export const popupDelete = document.querySelector('#popup-delete');

export const openButtonEdit = document.querySelector('.main__button_edit');
export const openButtonAdd = document.querySelector('.main__button_add');

export const closeButtonEdit = document.querySelector('#close-button-edit');
export const closeButtonAdd = document.querySelector('#close-button-add');
export const closeButtonImage = document.querySelector('#close-button-image');
export const closeDeleteButton = document.querySelector('#close-button-delete');

export const nameInput = document.querySelector('#name-input');
export const aboutInput = document.querySelector('#about-input');
export const titleInput = document.querySelector('#title-input');
export const urlInput = document.querySelector('#url-input');

export const nameParagraph = document.querySelector('.main__paragraph_name');
export const jobParagraph = document.querySelector('.main__paragraph_job');

export const sectionCard = document.querySelector('.cards');
export const templateSelector = '.template-card';

export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid'
};