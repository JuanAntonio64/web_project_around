  const openButtonEdit = document.querySelector('.main__button_edit');
  const openButtonAdd = document.querySelector('.main__button_add');
  const closeButtonEdit = document.querySelector('#close-button-edit');
  const closeButtonAdd = document.querySelector('#close-button-add');
  const popupAdd = document.querySelector('#popup-add');
  const popupEdit = document.querySelector('#popup-edit');
  const formEdit = document.querySelector('.popup__form-edit');
  const formAdd = document.querySelector('.popup__form-add');

  // Abrir modales
  openButtonEdit.addEventListener('click', () => {
    popupEdit.classList.add('popup_opened');
  });

  openButtonAdd.addEventListener('click', () => {
    popupAdd.classList.add('popup_opened');
  });

  // Cerrar modales
  closeButtonEdit.addEventListener('click', () => {
    popupEdit.classList.remove('popup_opened');
  });

  closeButtonAdd.addEventListener('click', () => {
    popupAdd.classList.remove('popup_opened');
  });

  // Guardar cambios y actualizar el contenido en editar
  formEdit.addEventListener('submit', (e) => {
    const nameParagraph = document.querySelector('.main__paragraph_name');
    const jobParagraph = document.querySelector('.main__paragraph_job');
    const nameInput = document.querySelector('#name-input');
    const aboutInput = document.querySelector('#about-input');

    e.preventDefault(); // Evita el envío real del formulario

    nameParagraph.textContent = '';
    jobParagraph.textContent = '';

    nameParagraph.insertAdjacentText('afterbegin', nameInput.value);
    jobParagraph.insertAdjacentText('afterbegin', aboutInput.value);

    popupEdit.classList.remove('popup_opened');
  });

  formAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title-input').value;
    const link = document.querySelector('#url-input').value;

    Cards(title, link); // Crear nueva tarjeta

    formAdd.reset(); // Limpiar los campos
    popupAdd.classList.remove('popup_opened'); // Cerrar el popup
  });




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
const templateCard = document.querySelector('.template-card');

initialCards.forEach((card) => {
  Cards(card.name, card.link);
});

// Función para crear una tarjeta
function Cards(title, link) {

  const card = templateCard.content.cloneNode(true).querySelector('.card');
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('#trash-button');
  const cardLikeButton = card.querySelector('#like-button');
  const cardLikeImage = card.querySelector('#card-image');
  const popupImage = document.querySelector('#popup-image');
  const closeButtonImage = document.querySelector('#close-button-image');
  const popupImageElement = popupImage.querySelector('.popup__image-modal');
  const popupImageCaption = popupImage.querySelector('.popup__caption');

  card.addEventListener('click', () => {

  });

  cardDeleteButton.addEventListener('click', () => {
    card.remove();
  });

  cardLikeButton.addEventListener('click', () => {
    cardLikeImage.classList.toggle('liked');
    const isLiked = cardLikeImage.classList.contains('liked');

    if (isLiked) {
      cardLikeImage.src = './images/hearth_click.svg'; // Corazón relleno
    } else {
      cardLikeImage.src = './images/hearth.svg'; // Corazón vacío
    }
  });
  
  cardTitle.textContent = title;  
  cardImage.src = link;

  cardImage.addEventListener('click', () => {
    popupImageElement.src = cardImage.src; // Muestra la imagen de la card
    popupImageElement.alt = cardImage.alt || 'Imagen ampliada';
    popupImageCaption.textContent = cardTitle.textContent;
    popupImage.classList.add('popup_opened');
  });
  closeButtonImage.addEventListener('click', () => {
    popupImage.classList.remove('popup_opened');
  });

  sectionCard.prepend(card);
  
}