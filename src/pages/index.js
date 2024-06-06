import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { initialCards, settings } from "../utils/constants.js";

/* Api instantiation */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ddc88790-62af-4c4d-983c-0779aaa6d561",
    "Content-Type": "application/json",
  },
});

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

const userInfo = new UserInfo();

api.getUserInformation().then((formData) => {
  userInfo.setUserInfo(formData.name, formData.about);
  // userInfo.setUserAvatar(data.avatar);
});

/* Edit Profile Button Listener */
profileEditBtn.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.about;
  editProfileModal.open();
  profileEditValidation.resetValidation();
});

/* Profile Edit Function */
function handleProfileEditSubmit(formData) {
  api.editProfile(formData.name, formData.about).then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    editProfileModal.close();
  });
}

/* Add Place Button Listener */
placesAddBtn.addEventListener("click", () => {
  addPlaceModal.open();
});

/* Add Place Function */
function handleNewPlaceSubmit(cardData) {
  const { title, url } = cardData;
  api
    .addCard({ name: title, link: url })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      section.addItem(cardElement);
      addPlaceModal.close();
      addPlaceModal.reset();
      addPlaceValidation.disableButton();
    })
    .catch((err) => {
      console.log("Error adding card: ", err);
    });
}

/* Image Click Preview Function */
function handleImageClick(imageData) {
  imagePreviewModal.open(imageData);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

const profileEditValidation = new FormValidator(settings, profileEditForm);
const addPlaceValidation = new FormValidator(settings, placeAddForm);

let section;
api
  .getInitialCards()
  .then((cardData) => {
    section = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          const cardElement = getCardElement(cardData);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );

    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const imagePreviewModal = new PopupWithImage("#places-preview-modal");

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

profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();

/* Api functions */

// api
//   .getInitialCards()
//   .then((result) => {
//     section.renderItems(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // api
// //   .getUserInformation()
// //   .then((data) => {
// //     userInfo.setUserInfo(data);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// api
//   .editProfile({
//     name: profileTitleInput.value,
//     about: profileDescriptionInput.value,
//   })
//   .then((data) => {
//     userInfo.setUserInfo(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // api
// //   .addCard({})
// //   .then((cardData) => {
// //     const cardElement = getCardElement(cardData);
// //     section.addItem(cardElement);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
