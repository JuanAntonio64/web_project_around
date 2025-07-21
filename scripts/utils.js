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

export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

export const formEdit = document.querySelector('.popup__form-edit');
export const formAdd = document.querySelector('.popup__form-add');

export const popupEdit = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');
export const popupImage = document.querySelector('#popup-image');

export const openButtonEdit = document.querySelector('.main__button_edit');
export const openButtonAdd = document.querySelector('.main__button_add');

export const closeButtonEdit = document.querySelector('#close-button-edit');
export const closeButtonAdd = document.querySelector('#close-button-add');
export const closeButtonImage = document.querySelector('#close-button-image');

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