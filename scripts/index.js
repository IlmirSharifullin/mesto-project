function HandleProfileFormSubmit(evt) {
    evt.preventDefault()

    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value

    closeModal(profilePopup)
}

function createCard(title, imgSrc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = imgSrc
    cardImage.alt = title

    cardElement.querySelector('.card__title').textContent = title
    cardElement.querySelector('.card__like-button').addEventListener('click', HandleLikeCard)
    cardElement.querySelector('.card__delete-button').addEventListener('click', HandleDeleteCard)

    cardImage.addEventListener('click', () => {
        popupImage.src = imgSrc
        popupCaption.textContent = title
        openModal(imagePopup)
    })

    return cardElement
}

function HandleLikeCard(evt) {
    evt.currentTarget.classList.toggle('card__like-button_is-active')
}

function HandleDeleteCard(evt) {
    const card = evt.target.closest('.places__item')
    placesList.removeChild(card)
}

function HandleCardFormSubmit(evt) {
    evt.preventDefault()

    const cardElement = createCard(placeNameInput.value, linkInput.value)
    placesList.prepend(cardElement)
    closeModal(cardPopup)
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

const cardTemplate = document.querySelector('#card-template').content

const placesList = document.querySelector('.places__list')

const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
profilePopup.classList.add('popup_is-animated')
cardPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')

const profileFormElement = document.querySelector('form[name="edit-profile"]')
const nameInput = document.querySelector('input[name="name"]')
const jobInput = document.querySelector('input[name="description"]')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

profileFormElement.addEventListener('submit', HandleProfileFormSubmit)


const profileEditButton = document.querySelector('.profile__edit-button')
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
    openModal(profilePopup)
})

const newCardFormElement = document.querySelector('form[name="new-place"]')
const placeNameInput = document.querySelector('input[name="place-name"]')
const linkInput = document.querySelector('input[name="link"]')

newCardFormElement.addEventListener('submit', HandleCardFormSubmit)


const cardAddButton = document.querySelector('.profile__add-button')
cardAddButton.addEventListener('click', () => {
    placeNameInput.value = ""
    linkInput.value = ""
    openModal(cardPopup)
})


const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')

const popupCloseButtons = document.querySelectorAll('.popup__close')
popupCloseButtons.forEach((btn) => {btn.addEventListener('click', () => {
    closeModal(profilePopup)
    closeModal(cardPopup)
    closeModal(imagePopup)
})})

initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link)
    placesList.appendChild(cardElement)
})