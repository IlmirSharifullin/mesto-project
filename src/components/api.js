import {
    authorization,
    baseUrl, newAvatarUrl,
    popupDescription, popupLink,
    popupName, popupTitle,
} from "../index.js";

export const getUsersMe = () => {
    return fetch(baseUrl + "users/me", {
        headers: authorization
    })
}

export const getCards = () => {
    return fetch(baseUrl + 'cards', {
        headers: authorization
    })
}

export const patchUsersMe = () => {
    return fetch(baseUrl + 'users/me', {
        method: 'PATCH',
        headers: {...authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: popupName.value,
            about: popupDescription.value,
        })
    })
}

export const patchUsersMeAvatar = () => {
    return fetch(baseUrl + 'users/me/avatar', {
        method: 'PATCH',
        headers: {...authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({
            avatar: newAvatarUrl.value
        })
    })
}

export const addCard = (name, link) => {
    return fetch(baseUrl + 'cards', {
        method: 'POST',
        headers: {...authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            link: link,
        })
    })
}

export const deleteCards = (cardId) => {
    return fetch(baseUrl + 'cards/' + cardId, {
      method: 'DELETE',
      headers: authorization
    })
}

export const addLike = (cardId) => {
    return fetch(baseUrl + `cards/likes/${cardId}`, {
          method: 'PUT',
          headers: authorization
      })
}

export const removeLike = (cardId) => {
    return fetch(baseUrl + `cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: authorization
      })
}