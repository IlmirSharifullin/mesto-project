import { deleteCard, toggleLike, handleCardClick } from './card.js';
import { cardTemplate, popupTitle, popupLink, elementsList, addPopup, popupAddForm } from "../index.js";
import { closePopup } from "./modal.js";

function createCardElement({ name, link }) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.element');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const cardLikeButton = cardElement.querySelector('.element__button');
  const cardTrashButton = cardElement.querySelector('.element__trash-button');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikeButton.addEventListener('click', toggleLike);
  cardTrashButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', (evt) => {
    evt.stopPropagation();
    handleCardClick(cardElement);
  });
  return cardElement;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const addedCard = createCardElement({ name: popupTitle.value, link: popupLink.value });
  elementsList.insertBefore(addedCard, elementsList.firstChild);
  closePopup(addPopup);
  popupAddForm.reset();
}

export { createCardElement, handleAddCardSubmit };