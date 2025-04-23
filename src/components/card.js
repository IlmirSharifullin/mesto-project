import { photoPopupImage, photoPopupText, photoPopup } from "../index.js";
import { openPopup } from "./modal.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function deleteCard(evt) {
  if (evt.target.classList.contains('element__trash-button')) {
    const card = evt.target.closest('.element');
    card.remove();
  }
}

function toggleLike(evt) {
  const likeButton = evt.target;
  if (likeButton.classList.contains('element__button')) {
    likeButton.classList.toggle('element__button_active');
  }
}

function handleCardClick(card) {
  const cardTitle = card.querySelector('.element__title').textContent;
  const cardImage = card.querySelector('.element__image').src;
  photoPopupImage.src = cardImage;
  photoPopupImage.alt = cardTitle;
  photoPopupText.textContent = cardTitle;
  openPopup(photoPopup);
}

export { initialCards, deleteCard, toggleLike, handleCardClick };