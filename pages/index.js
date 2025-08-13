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
  popupDelete,
  openButtonEdit,
  openButtonAdd,
  closeButtonEdit,
  closeButtonAdd,
  closeButtonImage,
  closeDeleteButton,
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
let cardToDelete = { id: null, element: null };


  const userInfo = new UserInfo({
    nameSelector: '.main__paragraph_name',
    jobSelector: '.main__paragraph_job',
    avatarSelector: '.main__profile-image'
  });


  let currentUserId = null;
  api.getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error('Error al obtener la información del usuario:', err);
  });

const closeButtonDelete = document.querySelector('#close-button-delete');
const deletePopup = new PopupWithForm('#popup-delete', () => {
  api.deleteCard(cardToDelete.id)
    .then(() => {
      cardToDelete.element.remove();
      cardToDelete = { id: null, element: null }; 
      deletePopup.close();
    })
    .catch(err => console.error('Error al eliminar tarjeta:', err));
});
deletePopup.setEventListeners();


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
            cardToDelete = { id: cardId, element: cardElement };
            deletePopup.open();
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
  popupEditForm.renderLoading(true); 

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
    })
    .finally(() => {
      popupEditForm.renderLoading(false); 
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
  popupAddForm.renderLoading(true); 

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
            cardToDelete = { id: cardId, element: cardElement };
            deletePopup.open();
          }
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      popupAddForm.close();
    })
    .catch((err) => {
      console.error('Error creating card:', err);
    })
    .finally(() => {
      popupAddForm.renderLoading(false); 
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


  //-------------------------------------------------------------------------

  const popupEditProfile = new PopupWithForm('#popup-editProfile', (formData) => {
  const urlProfile = formData['profile-input'];
  popupEditProfile.renderLoading(true); 

  api.setUserAvatar(urlProfile)
    .then((updatedUser) => {
      userInfo.setUserAvatar(updatedUser.avatar); 
      popupEditProfile.close();
    })
    .catch((err) => {
      console.error('Error cambiando foto de perfil:', err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false); 
    });
  });
  popupEditProfile.setEventListeners();


// Botones de abrir/cerrar
const openButtonEditProfile = document.querySelector('#open-button-editProfile');
const closeButtonEditProfile = document.querySelector('#close-button-editProfile');

openButtonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
});

closeButtonEditProfile.addEventListener('click', () => {
  popupEditProfile.close();
});


})
.catch((err) => { 
    console.error('Error fetching initial cards:', err);
  });

const validatorEdit = new FormValidator(config, formEdit);
const validatorAdd = new FormValidator(config, formAdd);

validatorEdit.enableValidation();
validatorAdd.enableValidation();
setPopupListeners();

closeButtonImage.addEventListener('click', () => popupWithImage.close());


