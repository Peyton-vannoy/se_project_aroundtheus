import "./index.css";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditPopup,
  addCardPopup,
  profileEditForm,
  addCardFormElement,
  profileEditBtn,
  closeButtons,
  addNewCardButton,
  initialCards,
  cardListEl,
  cardSelector,
  popups,
  profileTitleInput,
  popupImageElement,
  popupCaption,
  imagePopup,
  profileTitle,
  profileDescriptionInput,
  profileDescription,
  cardNameInput,
  cardUrlInput,
} from "../components/constants.js";

/*---------------------------------------------------------------------*/
/*------------------------------Validation-----------------------------*/
/*---------------------------------------------------------------------*/

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormElement = profileEditPopup.querySelector(".popup__form");
const addFormElement = addCardPopup.querySelector(".popup__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-popup",
  (formData) => {
    console.log(formData);
  }
);

const newCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  console.log(formData);
});

editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();

const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const section = new Section(
  {
    items: [],
    renderer: (item) => {
      const element = document.createElement("div");

      section.addItem(element);
    },
  },
  ".container-selector"
);

section.renderItems();

const userInfo = new UserInfo(".profile__title", ".profile__description");

const newUserData = {
  name: "Jacques Cousteau",
  job: "Explorer",
};
userInfo.setUserInfo(newUserData);

/*-------------------------------------------------------------*/
/*-----------------------Functions-----------------------------*/
/*-------------------------------------------------------------*/

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

const handlePreviewPicture = (cardData) => {
  popupImageElement.src = cardData._link;
  popupImageElement.alt = `${cardData._link}`;
  popupCaption.textContent = cardData._name;
  openPopup(imagePopup);
};

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handlePreviewPicture);

  return card.getView();
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
  const cardData = { name, link };

  renderCard(cardData, cardListEl);
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
