export class Card {
  constructor(title, link, templateSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._title, this._link);
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
