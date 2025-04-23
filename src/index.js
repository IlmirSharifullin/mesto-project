import './pages/index.css';
import { initialCards } from './components/card.js';
import { closePopup, openPopup, handleEscButton, handleOutsideClick, updateProfile, fillEditPopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { createCardElement, handleAddCardSubmit } from "./components/utils";


const content = document.querySelector('.page');
const editButton = content.querySelector('.profile__edit-button');
const editPopup = content.querySelector('#edit');
const closeEditButton = editPopup.querySelector('.popup__close-button');
const popupName = content.querySelector('#popupName');
const popupDescription = content.querySelector('#popupDescription');
const popupEditForm = editPopup.querySelector('.popup__form');
const addButton = content.querySelector('.profile__add-button');
const addPopup = content.querySelector('#add');
const closeButtonAdd = addPopup.querySelector('.popup__close-button');
const popupAddForm = addPopup.querySelector('.popup__form');
const photoPopup = content.querySelector('#photo');
const closeButtonPhoto = photoPopup.querySelector('.popup__close-button');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupText = photoPopup.querySelector('.popup__image-text');
const cardTemplate = document.querySelector('#card-template');
const elementsList = document.querySelector('.elements__list');
const popupTitle = document.querySelector('#popupTitle');
const popupLink = document.querySelector('#popupImageLink');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


const cardElements = initialCards.map(createCardElement);
cardElements.forEach(cardElement => elementsList.appendChild(cardElement));


enableValidation(configObject);


editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  fillEditPopup();
});
addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  openPopup(addPopup);
});
closeEditButton.addEventListener('click', () => closePopup(editPopup));
closeButtonAdd.addEventListener('click', () => closePopup(addPopup));
closeButtonPhoto.addEventListener('click', () => closePopup(photoPopup));
popupEditForm.addEventListener('submit', updateProfile);
popupAddForm.addEventListener('submit', handleAddCardSubmit);
document.addEventListener('keydown', handleEscButton);
document.addEventListener('click', handleOutsideClick);


export { configObject, photoPopupImage, photoPopupText, photoPopup,
 cardTemplate, popupName, popupDescription, profileName, profileDescription,
 editPopup, popupTitle, popupLink, elementsList, addPopup, popupAddForm };