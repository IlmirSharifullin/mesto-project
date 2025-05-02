import './pages/index.css';
import {
    closePopup,
    openPopup,
    handleEscButton,
    handleOutsideClick,
    updateProfile,
    updateAvatar,
    fillEditPopup, clearAvatarPopup
} from "./components/modal.js";
import {enableValidation} from "./components/validate.js";
import {createCardElement, handleAddCardSubmit} from "./components/utils";
import {getCards, getUsersMe} from "./components/api";

const baseUrl = 'https://nomoreparties.co/v1/apf-cohort-202/';
const authorization = {
    authorization: '7a6d984f-ee47-48a3-8ee3-bb2675ba62c9'
};


const content = document.querySelector('.page');
const editButton = content.querySelector('.profile__edit-button');
const editPopup = content.querySelector('#edit');
const closeEditButton = editPopup.querySelector('.popup__close-button');
const popupName = content.querySelector('#popupName');
const popupDescription = content.querySelector('#popupDescription');
const popupEditForm = editPopup.querySelector('.popup__form');
const avatarElement = document.querySelector('.profile__avatar')
const avatarWrapperElement = document.querySelector('.profile__avatar-wrapper')
console.log(avatarWrapperElement, avatarElement)
const newAvatarPopup = content.querySelector('#avatar');
const newAvatarForm = newAvatarPopup.querySelector('.popup__form');
const newAvatarUrl = newAvatarPopup.querySelector('#popupAvatarLink');
const closeButtonAvatar = newAvatarPopup.querySelector('.popup__close-button');

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
const profileAvatar = content.querySelector('.profile__avatar');
let profileId = '';


const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function initialUserLoad() {
    getUsersMe()
        .then(res => res.json())
        .then(res => {
            profileName.textContent = res.name
            profileDescription.textContent = res.about
            profileId = res._id
            avatarElement.src = res.avatar
        })
}

function initialCardsLoad() {
    getCards()
        .then(res => res.json())
        .then(res => {
            res.forEach(el => {
                const isLiked = el.likes.some(u => u._id === profileId)
                const cardElement = createCardElement({name: el.name, link: el.link, likes: el.likes.length, cardId: el._id, owner: el.owner._id === profileId, isLiked: isLiked})
                elementsList.appendChild(cardElement);
            })
        })
}

initialUserLoad()
initialCardsLoad()

enableValidation(configObject);


editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  fillEditPopup();
});
addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  openPopup(addPopup);
});
avatarWrapperElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
    clearAvatarPopup();
})
closeEditButton.addEventListener('click', () => closePopup(editPopup));
closeButtonAdd.addEventListener('click', () => closePopup(addPopup));
closeButtonPhoto.addEventListener('click', () => closePopup(photoPopup));
closeButtonAvatar.addEventListener('click', () => closePopup(newAvatarPopup));
popupEditForm.addEventListener('submit', updateProfile);
popupAddForm.addEventListener('submit', handleAddCardSubmit);
newAvatarPopup.addEventListener('submit', updateAvatar)
document.addEventListener('keydown', handleEscButton);
document.addEventListener('click', handleOutsideClick);


export { configObject, photoPopupImage, photoPopupText, photoPopup,
 cardTemplate, popupName, popupDescription, profileName, profileDescription,
 editPopup, popupTitle, popupLink, elementsList, addPopup, popupAddForm, newAvatarPopup, newAvatarUrl, avatarElement, baseUrl, authorization, profileId };