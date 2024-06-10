// Form Selectors
export const formList = document.querySelectorAll(".modal__form");

export const profileEditButton = document.querySelector(
  "#profile__edit-button"
);
export const profileEditIcon = document.querySelector(".profile__container");

// Card Selectors
export const addCardButton = document.querySelector(
  "#profile__add-card-button"
);

// Input Selectors
export const nameInput = document.querySelector("[name='name']");
export const aboutInput = document.querySelector("[name='about']");

// Config
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  modalSpan: ".modal__span",
};
