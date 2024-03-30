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

const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const ImageModal = document.querySelector("#image-modal");
const modalImageElement = ImageModal.querySelector(".popup__image");
const modalCaption = ImageModal.querySelector(".popup__caption");

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileModalCloseBtn = profileEditModal.querySelector("#modal-close-btn");
const ImageModalCloseBtn = ImageModal.querySelector("#modal-close-btn");
const addCardModalCloseBtn = addCardModal.querySelector("#modal-close-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardNameInput = addCardFormElement.querySelector(
  ".modal__input_type_name"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*-------------------------------------------------------------*/
/*-----------------------Functions-----------------------------*/
/*-------------------------------------------------------------*/

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
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

  //add click listener to cardImage element
  //openPopup with previewImageModal

  cardImageEl.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalCaption.textContent = cardData.name;
    openPopup(ImageModal);
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
  closePopup(profileEditModal);
}

function handleAddCardEditSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
}

/*--------------------------------------------------------------*/
/*---------------------Event Listeners--------------------------*/
/*--------------------------------------------------------------*/

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardEditSubmit);
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () =>
  closePopup(profileEditModal)
);
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseBtn.addEventListener("click", () => closePopup(addCardModal));
ImageModal.addEventListener("click", () => closePopup(ImageModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const likeButtons = document.querySelectorAll(".card__like-button");
