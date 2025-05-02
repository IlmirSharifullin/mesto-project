import { deleteCard, toggleLike, handleCardClick } from './card.js';
import { cardTemplate, popupTitle, popupLink, elementsList, addPopup, popupAddForm, baseUrl, authorization } from "../index.js";
import { closePopup } from "./modal.js";
import {addCard} from "./api";

function createCardElement({ name, link, likes, cardId, owner, isLiked }) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.element');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const cardLikeButton = cardElement.querySelector('.element__button');
  const cardTrashButton = cardElement.querySelector('.element__trash-button');
  const cardLikesNumber = cardElement.querySelector('.element__like-number');
  cardElement.id = cardId
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikesNumber.textContent = likes;
  if (!owner) {
    cardTrashButton.remove();
  } else {
    cardTrashButton.addEventListener('click', deleteCard);
  }
  if (isLiked) {
    cardLikeButton.classList.add('element__button_active')
  }
  cardLikeButton.addEventListener('click', toggleLike);
  cardImage.addEventListener('click', (evt) => {
    evt.stopPropagation();
    handleCardClick(cardElement);
  });
  return cardElement;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  addPopup.querySelector('.popup__submit').value = 'Сохранение...'
  addCard(popupTitle.value, popupLink.value)
      .then(res => res.json())
      .then(res => {
        const addedCard = createCardElement({ name: res.name, link: res.link, likes: 0, cardId: res.id, owner: true});
        elementsList.insertBefore(addedCard, elementsList.firstChild);
      })
      .finally(() => {
        closePopup(addPopup);
        popupAddForm.reset();
        addPopup.querySelector('.popup__submit').value = 'Сохранить'
      })
}

export { createCardElement, handleAddCardSubmit };