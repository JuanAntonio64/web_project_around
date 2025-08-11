import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import { PopupWithImage } from '../scripts/PopupWithImages.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { api } from '../scripts/Api.js';
import {
  openPopup,
  closePopup,
  setPopupListeners,
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

  const userInfo = new UserInfo({
    nameSelector: '.main__paragraph_name',
    jobSelector: '.main__paragraph_job'
  });

  let currentUserId = null;
  api.getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });
  })
  .catch((err) => {
    console.error('Error al obtener la información del usuario:', err);
  });

api.getInitialCards()
  .then((initialCards) => {
    const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(
        cardData.name,
        cardData.link,
        cardData._id,
        cardData.owner,
        cardData.isLiked,
        currentUserId,
        templateSelector,
        (title, link) => popupWithImage.open(title, link),
        (cardId, isLiked, likeImage) => {
          if (!isLiked) {
            api.likeCard(cardId)
              .then(updatedCard => {
                card._isLiked = true;  // actualizar propiedad
                card.updateLikeIcon(likeImage, true);
              })
              .catch(err => console.error('Error al dar like:', err));
          } else {
            api.deleteLikeCard(cardId)
              .then(updatedCard => {
                card._isLiked = false; // actualizar propiedad
                card.updateLikeIcon(likeImage, false);
              })
              .catch(err => console.error('Error al quitar like:', err));
          }
        },
          (cardId, cardElement) => {
          api.deleteCard(cardId)
            .then(() => {
              cardElement.remove();
            })
            .catch(err => console.error('Error al eliminar tarjeta:', err));
        }
      );

      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    }

  }, '.cards');

  cardSection.renderItems();  
  
  //-------------------------------------------------------------------------

  const popupEditForm = new PopupWithForm('#popup-edit', (formData) => {
  const name = formData['name-input'];
  const job = formData['about-input'];

  api.editProfile(name, job)
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        job: updatedUser.about
      });
      popupEditForm.close();
    })
    .catch((err) => {
      console.error('Error updating profile:', err);
    });
});

popupEditForm.setEventListeners();

openButtonEdit.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = job;
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  aboutInput.dispatchEvent(new Event('input', { bubbles: true }));
  popupEditForm.open();
});

closeButtonEdit.addEventListener('click', () => popupEditForm.close());


  //-------------------------------------------------------------------------


  const popupAddForm = new PopupWithForm('#popup-add', (formData) => {
  const name = formData['title-input'];
  const link = formData['url-input'];

  api.createCard(name, link)
    .then((createdCard) => {
      const card = new Card(
        createdCard.name,
        createdCard.link,
        createdCard._id,
        createdCard.owner,
        createdCard.isLiked || false,
        currentUserId,
        templateSelector,
        (title, link) => popupWithImage.open(title, link),
        (cardId, isLiked, likeImage) => {
          if (!isLiked) {
            api.likeCard(cardId)
              .then(updatedCard => {
                card._isLiked = true;
                card.updateLikeIcon(likeImage, true);
              })
              .catch(err => console.error('Error al dar like:', err));
          } else {
            api.deleteLikeCard(cardId)
              .then(updatedCard => {
                card._isLiked = false;
                card.updateLikeIcon(likeImage, false);
              })
              .catch(err => console.error('Error al quitar like:', err));
          }
        },
          (cardId, cardElement) => {
          api.deleteCard(cardId)
            .then(() => {
              cardElement.remove();
            })
            .catch(err => console.error('Error al eliminar tarjeta:', err));
        }
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      popupAddForm.close();
    })
    .catch((err) => {
      console.error('Error creating card:', err);
    });

  });

  popupAddForm.setEventListeners();

  openButtonAdd.addEventListener('click', () => {
    formAdd.reset();
    titleInput.dispatchEvent(new Event('input', { bubbles: true }));
    urlInput.dispatchEvent(new Event('input', { bubbles: true }));
    popupAddForm.open();
  });

  closeButtonAdd.addEventListener('click', () => popupAddForm.close());


}).catch((err) => { 
    console.error('Error fetching initial cards:', err);
  });

const validatorEdit = new FormValidator(config, formEdit);
const validatorAdd = new FormValidator(config, formAdd);

validatorEdit.enableValidation();
validatorAdd.enableValidation();
setPopupListeners();









closeButtonImage.addEventListener('click', () => popupWithImage.close());


