// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = errorMessage;
  errorMessageEl.classList.add(errorClass);
};

const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
};

const checkInputValidity = (formEl, inputEl, options) => {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }

  hideInputError(formEl, inputEl, options);
};

const hasInvalidInput = (inputList) => {
  return !inputList.every((inputEl) => inputEl.validity.valid);
};

const toggleButtonState = (inputEls, submitButton, { inactiveButtonClass }) => {
  let foundInvalid = false;

  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
};

const setEventListeners = (formEl, options) => {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options);
  });
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
