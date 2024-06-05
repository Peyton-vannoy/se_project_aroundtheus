import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { initialCards, settings } from "../utils/constants.js";

/* Profile */
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditForm = document.forms["profile-form"];
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* Places */
const placesAddBtn = document.querySelector("#places-add-btn");
const placeAddForm = document.forms["add-place-form"];

/* Edit Profile Button Listener */
profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editProfileModal.open();
  profileEditValidation.resetValidation();
});

/* Profile Edit Function */
function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData);
  editProfileModal.close();
}

/* Add Place Button Listener */
placesAddBtn.addEventListener("click", () => {
  addPlaceModal.open();
});

/* Add Place Function */
function handleNewPlaceSubmit(cardData) {
  const { title, url } = cardData;
  const cardElement = getCardElement({ name: title, link: url });
  section.addItem(cardElement);
  addPlaceModal.close();
  addPlaceModal.reset();
  addPlaceValidation.disableButton();
}

/* Image Click Preview Function */
function handleImageClick(imageData) {
  imagePreviewModal.open(imageData);
}

/* Api instantiation */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ddc88790-62af-4c4d-983c-0779aaa6d561",
    "Content-Type": "application/json",
  },
});

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

const profileEditValidation = new FormValidator(settings, profileEditForm);
const addPlaceValidation = new FormValidator(settings, placeAddForm);

const section = new Section(
  { items: initialCards, renderer: getCardElement },
  ".cards__list"
);

const imagePreviewModal = new PopupWithImage("#places-preview-modal");

const userInfo = new UserInfo();

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addPlaceModal = new PopupWithForm(
  "#places-add-modal",
  handleNewPlaceSubmit
);

editProfileModal.setEventListeners();
imagePreviewModal.setEventListeners();
addPlaceModal.setEventListeners();
section.renderItems();
profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();
