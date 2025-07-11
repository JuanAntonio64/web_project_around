export class Card {
  constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return template;
  }

  _setEventListeners(cardElement) {
    const deleteButton = cardElement.querySelector('#trash-button');
    const likeButton = cardElement.querySelector('#like-button');
    const likeImage = cardElement.querySelector('#card-image');
    const image = cardElement.querySelector('.card__image');

    deleteButton.addEventListener('click', () => cardElement.remove());

    likeButton.addEventListener('click', () => {
      likeImage.classList.toggle('liked');
      likeImage.src = likeImage.classList.contains('liked')
        ? './images/hearth_click.svg'
        : './images/hearth.svg';
    });

    image.addEventListener('click', () => {
      const popupImage = document.querySelector('#popup-image');
      const popupImageElement = popupImage.querySelector('.popup__image-modal');
      const popupImageCaption = popupImage.querySelector('.popup__caption');

      popupImageElement.src = this._link;
      popupImageElement.alt = this._title;
      popupImageCaption.textContent = this._title;
      popupImage.classList.add('popup_opened');
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._title;

    this._setEventListeners(cardElement);
    return cardElement;
  }
}
