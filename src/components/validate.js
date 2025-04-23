import { configObject } from "../index.js";


const showInputError = (formElement, inputElement, errorMessage, configObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(configObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configObject.errorClass);
};


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(configObject.inputErrorClass);
  errorElement.classList.remove(configObject.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, configObject) => {
  const errorText = inputElement.dataset.errorText;
  const isValid = inputElement.validity.valid;
  inputElement.setCustomValidity(inputElement.validity.patternMismatch ? errorText : '');
  isValid ? hideInputError(formElement, inputElement, configObject) : showInputError(formElement, inputElement, inputElement.validationMessage, configObject);
};


const setEventListeners = (formElement, configObject) => {
  const inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
  const buttonElement = formElement.querySelector(configObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, configObject);
      toggleButtonState(inputList, buttonElement, configObject);
    });
  });
};


const enableValidation = (configObject) => {
  const formList = Array.from(document.querySelectorAll(configObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, configObject);
  });
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


function toggleButtonState (inputList, buttonElement, configObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(configObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export { enableValidation };