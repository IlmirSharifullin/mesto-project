import { popupName, popupDescription, profileName, profileDescription, editPopup } from "../index.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleEscButton (evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function handleOutsideClick(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && !evt.target.closest('.popup__container') && !evt.target.closest('.popup__image-container')) {
    closePopup(openedPopup);
  }
}

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(editPopup);
}

function fillEditPopup () {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

export { openPopup, closePopup, handleEscButton, handleOutsideClick, updateProfile, fillEditPopup };