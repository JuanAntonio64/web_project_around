  const openButton = document.querySelector('.main__button_edit');
  const closeButton = document.querySelector('.popup__button_close');
  const popup = document.querySelector('.popup');
  const form = document.querySelector('.popup__form');

  const nameInput = document.querySelector('#name-input');
  const aboutInput = document.querySelector('#about-input');

  const nameParagraph = document.querySelector('.main__paragraph_name');
  const jobParagraph = document.querySelector('.main__paragraph_job');

  // Abrir modal
  openButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');
  });

  // Cerrar modal
  closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  });

  // Guardar cambios y actualizar el contenido
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el envío real del formulario

    nameParagraph.textContent = '';
    jobParagraph.textContent = '';

    nameParagraph.insertAdjacentText('afterbegin', nameInput.value);
    jobParagraph.insertAdjacentText('afterbegin', aboutInput.value);

    popup.classList.remove('popup_opened');
  });