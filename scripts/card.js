export class Card {
  constructor(title, link, _id, owner, isLiked, userId, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
    this._title = title;
    this._link = link;
    this._id = _id;
    this._owner = owner;
    this._isLiked = isLiked || false;  // boolean
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners(cardElement) {
    const deleteButton = cardElement.querySelector('#trash-button');
    const likeButton = cardElement.querySelector('#like-button');
    const likeImage = cardElement.querySelector('#card-image');
    const image = cardElement.querySelector('.card__image');

    deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id, cardElement);
    });

    likeButton.addEventListener('click', () => {
      // Invertimos el estado actual para pasarlo a handleLikeClick
      this._handleLikeClick(this._id, this._isLiked, likeImage);
    });

    image.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  updateLikeIcon(likeImage, liked) {
    this._isLiked = liked;
    likeImage.classList.toggle('liked', liked);
    likeImage.src = liked
      ? './images/hearth_click.svg'
      : './images/hearth.svg';
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const likeImage = cardElement.querySelector('#card-image');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._title;

    this.updateLikeIcon(likeImage, this._isLiked);

    this._setEventListeners(cardElement);
    return cardElement;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return template;
  }
}
