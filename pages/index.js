import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import { PopupWithImage } from '../scripts/PopupWithImages.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import {
  openPopup,
  closePopup,
  setPopupListeners,
  initialCards,
  formEdit,
  formAdd,
  popupEdit,
  popupAdd,
  popupImage,
  openButtonEdit,
  openButtonAdd,
  closeButtonEdit,
  closeButtonAdd,
  closeButtonImage,
  nameInput,
  aboutInput,
  titleInput,
  urlInput,
  nameParagraph,
  jobParagraph,
  sectionCard,
  templateSelector,
  config
} from '../scripts/utils.js';


const popupWithImage = new PopupWithImage('#popup-image');
popupWithImage.setEventListeners();

const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(
      cardData.name,
      cardData.link,
      templateSelector,
      (title, link) => popupWithImage.open(title, link)  
    );

    const cardElement = card.generateCard();
    cardSection.addItem(cardElement); 
  }
}, '.cards');

cardSection.renderItems();

const validatorEdit = new FormValidator(config, formEdit);
const validatorAdd = new FormValidator(config, formAdd);

validatorEdit.enableValidation();
validatorAdd.enableValidation();
setPopupListeners();




const userInfo = new UserInfo({
  nameSelector: '.main__paragraph_name',
  jobSelector: '.main__paragraph_job'
});


const popupEditForm = new PopupWithForm('#popup-edit', (formData) => {
  userInfo.setUserInfo({
    name: formData['name-input'],
    job: formData['about-input']
  });
  popupEditForm.close();
});
popupEditForm.setEventListeners();


const popupAddForm = new PopupWithForm('#popup-add', (formData) => {
  const newCard = new Card(
    formData['title-input'],
    formData['url-input'],
    templateSelector,
    (title, link) => popupWithImage.open(title, link)
  );

  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
  popupAddForm.close();
});
popupAddForm.setEventListeners();



openButtonEdit.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();

  nameInput.value = name;
  aboutInput.value = job;

  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  aboutInput.dispatchEvent(new Event('input', { bubbles: true }));

  popupEditForm.open();
});


openButtonAdd.addEventListener('click', () => {
  formAdd.reset();
  titleInput.dispatchEvent(new Event('input', { bubbles: true }));
  urlInput.dispatchEvent(new Event('input', { bubbles: true }));

  popupAddForm.open();
});


closeButtonEdit.addEventListener('click', () => popupEditForm.close());
closeButtonAdd.addEventListener('click', () => popupAddForm.close());
closeButtonImage.addEventListener('click', () => popupWithImage.close());


