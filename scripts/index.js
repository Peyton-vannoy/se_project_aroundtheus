const initialCards = [
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

/* -----------------------------------------------------------------------*/
/*                                 Elements                               */
/* -----------------------------------------------------------------------*/

const profileEditPopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#add-card-popup");
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const addCardFormElement = addCardPopup.querySelector(".popup__form");
const imagePopup = document.querySelector("#image-popup");
const popupImageElement = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");

const openedPopup = document.querySelector(".popup_opened");

const closeButtons = document.querySelectorAll(".popup__close");

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//const profilePopupCloseBtn = profileEditPopup.querySelector("#popup-close-btn");
const imagePopupCloseBtn = imagePopup.querySelector("#popup-close-btn");
const addCardPopupCloseBtn = addCardPopup.querySelector("#popup-close-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardNameInput = addCardFormElement.querySelector(
  ".popup__description_type_name"
);
const cardUrlInput = addCardFormElement.querySelector(".popup__input_type_url");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*-------------------------------------------------------------*/
/*-----------------------Functions-----------------------------*/
/*-------------------------------------------------------------*/

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup.classList.remove(".popup_opened");
  }
}

function openModal(modal) {
  openPopup(modal);
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  closePopup(profileEditPopup);
  closePopup(addCardPopup);
  closePopup(imagePopup);
  document.removeEventListener("keydown", handleEscape);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imagePopup);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

/*--------------------------------------------------------------*/
/*---------------------Event Handlers---------------------------*/
/*--------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
}

function handleAddCardEditSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardFormElement.reset();
  closePopup(addCardPopup);
}

/*--------------------------------------------------------------*/
/*---------------------Event Listeners--------------------------*/
/*--------------------------------------------------------------*/

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardEditSubmit);
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

addNewCardButton.addEventListener("click", () => openPopup(addCardPopup));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});
