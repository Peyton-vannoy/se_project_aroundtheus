export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const profileEditPopup = document.querySelector("#profile-edit-popup");
export const addCardPopup = document.querySelector("#add-card-popup");

export const profileEditForm = profileEditPopup.querySelector(".popup__form");
export const addCardFormElement = addCardPopup.querySelector(".popup__form");

export const imagePopup = document.querySelector("#image-popup");
export const popupImageElement = imagePopup.querySelector(".popup__image");
export const popupCaption = imagePopup.querySelector(".popup__caption");

export const popups = document.querySelectorAll(".popup");

export const closeButtons = document.querySelectorAll(".popup__close");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

export const profileTitleInput = document.querySelector("#profile-title-input");

export const profileEditBtn = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const cardNameInput = addCardFormElement.querySelector(
  ".popup__input_description_type_name"
);
export const cardUrlInput = addCardFormElement.querySelector(
  ".popup__input_type_url"
);

export const cardListEl = document.querySelector(".cards__list");

export const cardSelector = "#card-template";

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  previewPopup: "#image-popup",
};
