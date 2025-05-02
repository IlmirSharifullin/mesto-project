import {
    popupName,
    popupDescription,
    profileName,
    profileDescription,
    avatarElement,
    editPopup,
    newAvatarPopup,
    newAvatarUrl,
    baseUrl,
    authorization,
} from "../index.js";
import {patchUsersMe, patchUsersMeAvatar} from "./api";

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
    console.log('save')
    editPopup.querySelector('.popup__submit').value = 'Сохранение...'
    patchUsersMe()
        .then(res => res.json())
        .then(res => {
            profileName.textContent = res.name;
            profileDescription.textContent = res.about;
        })
        .finally(() => {
                closePopup(editPopup);
                editPopup.querySelector('.popup__submit').value = 'Сохранить'
            })
}

function fillEditPopup () {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

function clearAvatarPopup () {
  newAvatarUrl.value = ''
  openPopup(newAvatarPopup);
}

function updateAvatar(evt) {
    evt.preventDefault();
    newAvatarPopup.querySelector('.popup__submit').value = 'Сохранение...'
    patchUsersMeAvatar()
        .then(res => res.json())
        .then(res => {
            avatarElement.src = res.avatar
        })
        .finally(() => {
            closePopup(newAvatarPopup);
            newAvatarPopup.querySelector('.popup__submit').value = 'Сохранить'
        })
}

export { openPopup, closePopup, handleEscButton, handleOutsideClick, updateProfile, updateAvatar, fillEditPopup, clearAvatarPopup};