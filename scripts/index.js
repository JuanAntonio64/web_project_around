import { Card } from './card.js';
import { FormValidator } from './formValidator.js';
import { openPopup, closePopup, setPopupListeners } from './utils.js';

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid'
};

const initialCards = [
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

const sectionCard = document.querySelector('.cards');
const templateSelector = '.template-card';

initialCards.forEach((cardData) => {
  const card = new Card(cardData.name, cardData.link, templateSelector);
  const cardElement = card.generateCard();
  sectionCard.prepend(cardElement);
});

const formEdit = document.querySelector('.popup__form-edit');
const formAdd = document.querySelector('.popup__form-add');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImage = document.querySelector('#popup-image');

const openButtonEdit = document.querySelector('.main__button_edit');
const openButtonAdd = document.querySelector('.main__button_add');
const closeButtonEdit = document.querySelector('#close-button-edit');
const closeButtonAdd = document.querySelector('#close-button-add');
const closeButtonImage = document.querySelector('#close-button-image');

const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const titleInput = document.querySelector('#title-input');
const urlInput = document.querySelector('#url-input');

const nameParagraph = document.querySelector('.main__paragraph_name');
const jobParagraph = document.querySelector('.main__paragraph_job');

const validatorEdit = new FormValidator(config, formEdit);
const validatorAdd = new FormValidator(config, formAdd);

validatorEdit.enableValidation();
validatorAdd.enableValidation();
setPopupListeners();

openButtonEdit.addEventListener('click', () => {
  nameInput.value = nameParagraph.textContent;
  aboutInput.value = jobParagraph.textContent;
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  aboutInput.dispatchEvent(new Event('input', { bubbles: true }));
  openPopup(popupEdit);
});

openButtonAdd.addEventListener('click', () => {
  formAdd.reset();
  urlInput.dispatchEvent(new Event('input', { bubbles: true }));
  titleInput.dispatchEvent(new Event('input', { bubbles: true }));
  openPopup(popupAdd);
});

closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

formEdit.addEventListener('submit', (e) => {
  e.preventDefault();
  nameParagraph.textContent = nameInput.value;
  jobParagraph.textContent = aboutInput.value;
  closePopup(popupEdit);
});

formAdd.addEventListener('submit', (e) => {
  e.preventDefault();
  const newCard = new Card(titleInput.value, urlInput.value, templateSelector);
  sectionCard.prepend(newCard.generateCard());
  closePopup(popupAdd);
  formAdd.reset();
});
