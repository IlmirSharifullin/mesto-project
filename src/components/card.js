import {photoPopupImage, photoPopupText, photoPopup, baseUrl, authorization} from "../index.js";
import { openPopup } from "./modal.js";
import {addLike, deleteCards, removeLike} from "./api";


function deleteCard(evt) {
  if (evt.target.classList.contains('element__trash-button')) {
    const card = evt.target.closest('.element');
    deleteCards(card.id)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.statusText)
        })
        .then(() => {
            card.remove();
        })
        .catch(err => console.log(`Ошибка: ${err}`))
  }
}

function toggleLike(evt) {
  const likeButton = evt.target;
  const card = evt.target.closest('.element');
  const likesNumber = card.querySelector('.element__like-number');
  if (!likeButton.classList.contains('element__button_active')) {
      addLike(card.id)
          .then(res => {
              if (!res.ok) {
                return Promise.reject(res.statusText)
              } else {
                  return res.json()
              }
          })
          .then(res => {
              likesNumber.textContent = res.likes.length
              likeButton.classList.add('element__button_active');
          })
          .catch(err => {
              console.log(err)
          })
  } else {
      removeLike(card.id)
          .then(res => {
              if (!res.ok) {
                return Promise.reject(res.statusText)
              } else {
                  return res.json()
              }
          })
          .then(res => {
              likesNumber.textContent = res.likes.length
              likeButton.classList.remove('element__button_active');
          })
          .catch(err => {
              console.log(err)
          })
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

export { deleteCard, toggleLike, handleCardClick };