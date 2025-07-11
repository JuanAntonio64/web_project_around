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
