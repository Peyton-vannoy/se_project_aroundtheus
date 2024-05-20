// Import necessary CSS and components
import "./index.css";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditPopup,
  selectors,
  addCardPopup,
  profileEditForm,
  addCardFormElement,
  profileEditBtn,
  addNewCardButton,
  initialCards,
  cardListEl,
  cardSelector,
  profileTitleInput,
  profileDescriptionInput,
} from "../components/constants.js";

// Validation settings
const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Initialize form validators
const editFormElement = profileEditPopup.querySelector(".popup__form");
const addFormElement = addCardPopup.querySelector(".popup__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initialize popups
const editProfilePopup = new PopupWithForm(
  "#profile-edit-popup",
  handleProfileEditSubmit
);
const addImagePopup = new PopupWithForm(
  "#add-card-popup",
  handleAddCardEditSubmit
);
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

// Set event listeners for popups
editProfilePopup.setEventListeners();
addImagePopup.setEventListeners();
cardPreviewPopup.setEventListeners();

// Initialize user info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Initialize and render initial card section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  selectors.cardSection
);

cardSection.renderItems();

// Function to create a card
function createCard(cardData) {
  const card = new Card(
    cardData,
    {
      handlePreviewPicture: (data) => {
        cardPreviewPopup.open(data);
      },
    },
    cardSelector
  );

  return card.getView();
}

// Function to render a card
function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

// Handle profile edit form submission
function handleProfileEditSubmit(inputValues) {
  const { title, description } = inputValues;

  userInfo.setUserInfo(title, description);
  editProfilePopup.close();
}

// Handle add card form submission
function handleAddCardEditSubmit(inputValues) {
  renderCard(inputValues, cardListEl);
  const { name, link } = inputValues;
  const cardData = {
    name: name,
    link: link,
  };
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);

  addCardFormElement.reset();
  addImagePopup.close();
}

// Event listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardEditSubmit);

profileEditBtn.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.job;

  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addImagePopup.open();
});
