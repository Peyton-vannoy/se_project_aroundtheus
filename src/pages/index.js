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
  cardNameInput,
  cardUrlInput,
  profileTitle,
  profileDescription,
  validationSettings,
} from "../components/constants.js";

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
const userInfo = new UserInfo(".profile__title", ".profile__description");
userInfo.getUserInfo();

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
      handlePreviewPicture: (cardData) => {
        cardPreviewPopup.open(cardData);
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
function handleProfileEditSubmit(userData) {
  userInfo.setUserInfo(userData);
  editProfilePopup.close();
}

// Handle add card form submission
function handleAddCardEditSubmit() {
  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);

  addCardFormElement.reset();
  addImagePopup.close();
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addImagePopup.open();
});
