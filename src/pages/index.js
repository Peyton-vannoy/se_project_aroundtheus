import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "697fd183-9a82-4522-9294-b01c12c32a59",
    "Content-Type": "application/json",
  },
});

/* Profile Var */
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditForm = document.forms["profile-form"];
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* Avatar Var */
const avatarUpdateBtn = document.querySelector("#avatar-update-btn");
const avatarForm = document.forms["update-avatar-form"];
const avatarPreview = document.querySelector(".profile__avatar");

/* Places Var */
const placesAddBtn = document.querySelector("#places-add-btn");
const placeAddForm = document.forms["add-place-form"];

/* Image Click Preview Function */
function handleImageClick(imageData) {
  imagePreviewModal.open(imageData);
}

/* Validation */
const profileEditValidation = new FormValidator(settings, profileEditForm);
const addPlaceValidation = new FormValidator(settings, placeAddForm);
const avatarValidation = new FormValidator(settings, avatarForm);

/* Modals */
const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
const addPlaceModal = new PopupWithForm(
  "#places-add-modal",
  handleNewPlaceSubmit
);
const updateAvatarModal = new PopupWithForm(
  "#avatar-update-modal",
  handleAvatarSubmit
);
const imagePreviewModal = new PopupWithImage("#places-preview-modal");
const deletePlaceModal = new PopupWithForm("#places-delete-modal", () => {});

/* Event Listeners */
editProfileModal.setEventListeners();
imagePreviewModal.setEventListeners();
updateAvatarModal.setEventListeners();
addPlaceModal.setEventListeners();

/* Form Validation */
deletePlaceModal.setEventListeners();
avatarValidation.enableValidation();
profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();

/* DELETE Place Function */
function handleDeleteClick(cardID, cardElement) {
  deletePlaceModal.setSubmitHandler(() => {
    deletePlaceModal.setLoading(true, "Removing...", "Yes");
    api
      .removePlace(cardID)
      .then(() => {
        cardElement.remove();
        deletePlaceModal.close();
      })
      .catch((err) => {
        console.error("Error deleting place:", err);
      })
      .finally(() => {
        deletePlaceModal.setLoading(false, "Removing...", "Yes");
      });
  });
  deletePlaceModal.open();
}

/* Create Cards */
function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeReact
  );
  return card.getView();
}

/* GET Cards */
let section;
api
  .getInitialCards()
  .then((items) => {
    section = new Section(
      {
        items: items,
        renderer: (cardData) => {
          const cardElement = getCardElement(cardData);
          return cardElement;
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => console.error(err));

/* GET Profile */
const userInfo = new UserInfo();
api
  .getUserInfo()
  .then((profileData) => {
    userInfo.setUserInfo(profileData);
  })
  .catch((err) => console.error(err));

/* PATCH Profile Edit Function */
function handleProfileEditSubmit(profileInputValues) {
  editProfileModal.setLoading(true);

  const userData = {
    name: profileInputValues.title,
    about: profileInputValues.description,
  };

  api
    .editUserInfo(userData.name, userData.about)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      editProfileModal.close();
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    })
    .finally(() => {
      editProfileModal.setLoading(false);
    });
}

/* PATCH Profile Avatar Function */
function handleAvatarSubmit({ url }) {
  updateAvatarModal.setLoading(true);

  api
    .updateAvatar(url)
    .then((res) => {
      userInfo.updateAvatar(url);
      updateAvatarModal.reset();
      updateAvatarModal.close();
      console.log("Success:", res);
    })
    .catch((err) => {
      console.error("Error updating profile avatar:", err);
    })
    .finally(() => {
      updateAvatarModal.setLoading(true, "Save");
    });
}

/* POST Add Place Function */
function handleNewPlaceSubmit(placeCardData) {
  addPlaceModal.setLoading(true);
  const cardData = {
    name: placeCardData.title,
    link: placeCardData.url,
  };

  api
    .addNewPlace(cardData.name, cardData.link)
    .then((newPlaceCard) => {
      const cardElement = getCardElement({
        name: newPlaceCard.name,
        link: newPlaceCard.link,
        _id: newPlaceCard._id,
      });
      section.addItem(cardElement);
      addPlaceModal.close();
      addPlaceModal.reset();
    })
    .catch((err) => {
      console.error("Error adding new place:", err);
    })
    .finally(() => {
      addPlaceModal.setLoading(false);
      addPlaceValidation.disableButton();
    });
}

/* PUT Add Like React */
function handleLikeReact(likeReact, likeStatus, cardId) {
  if (likeStatus) {
    api
      .removeLikeReact(cardId)
      .then(() => {
        likeReact.classList.remove("card__react-button_active");
      })
      .catch((error) => console.error("Error removing like reaction:", error));
  } else {
    api
      .addLikeReact(cardId)
      .then(() => {
        likeReact.classList.add("card__react-button_active");
      })
      .catch((error) => console.error("Error adding like reaction:", error));
  }
}

/* Edit Profile Button Listener */
profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editProfileModal.open();
  profileEditValidation.resetValidation();
});

/* Add Place Button Listener */
placesAddBtn.addEventListener("click", () => {
  addPlaceModal.open();
});

/* Profile Avatar Button Listener */
avatarUpdateBtn.addEventListener("click", () => {
  updateAvatarModal.open();
});
