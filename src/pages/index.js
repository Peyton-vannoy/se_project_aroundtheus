import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { settings } from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "697fd183-9a82-4522-9294-b01c12c32a59",
    "Content-Type": "application/json",
  },
});

/* Profile Variables */
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditForm = document.forms["profile-form"];
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* Avatar Variables */
const updateAvatarBtn = document.querySelector("#avatar-save-btn");
const avatarForm = document.forms["update-avatar-form"];

/* Add Place Variables */
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
const updateProfileImage = new PopupWithForm(
  "#avatar-update-modal",
  handleProfileImageSubmit
);
const imagePreviewModal = new PopupWithImage("#places-preview-modal");
const deletePlaceModal = new PopupWithConfirmation(
  "#places-delete-modal",
  handleDeleteClick
);

/* Event Listeners */
editProfileModal.setEventListeners();
imagePreviewModal.setEventListeners();
updateProfileImage.setEventListeners();
addPlaceModal.setEventListeners();

/* Form Validation */
deletePlaceModal.setEventListeners();
avatarValidation.enableValidation();
profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();

/* DELETE Place Function */
function handleDeleteClick(card) {
  deletePlaceModal.open();

  deletePlaceModal.setSubmitHandler(() => {
    deletePlaceModal.setSubmitButtonText("Deleting...");

    api
      .removePlace(card._id)
      .then(() => {
        card.handleDeleteCard();
        deletePlaceModal.close();
      })
      .catch((err) => {
        console.error("Error deleting place:", err);
      })
      .finally(() => {
        deletePlaceModal.setSubmitButtonText("Delete");
      });
  });
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

/* user info instance */
const userInfo = new UserInfo({
  profileName: ".profile__title",
  profileJob: ".profile__description",
  profileAvatar: ".profile__image",
});

/* GET User Info */
api
  .getUserInfo()
  .then((profileData) => {
    userInfo.setUserInfo({
      name: profileData.name,
      about: profileData.about,
    });
    userInfo.setUserAvatar({ avatar: profileData.avatar });
  })
  .catch((err) => console.error(err));

/* PATCH Profile Edit Function */
function handleProfileEditSubmit(inputValues) {
  editProfileModal.setSubmitButtonText("Saving...");

  if (!inputValues.name || !inputValues.about) {
    console.error("Please fill in all the fields");
    return;
  }

  api
    .editProfile({
      name: inputValues.name,
      about: inputValues.about,
    })
    .then(({ name, about }) => {
      userInfo.setUserInfo({
        name: name,
        about: about,
      });
      editProfileModal.close();
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    })
    .finally(() => {
      editProfileModal.setSubmitButtonText("Save");
    });
}

/* PATCH Profile Avatar Function */
function handleProfileImageSubmit(inputValues) {
  updateProfileImage.setSubmitButtonText("Saving...");

  api
    .editProfileImage(inputValues)
    .then((res) => {
      userInfo.setUserAvatar(res);
      updateProfileImage.reset();
      updateProfileImage.close();
      console.log("Success:", res);
    })
    .catch((err) => {
      console.error("Error updating profile avatar:", err);
    })
    .finally(() => {
      updateProfileImage.setSubmitButtonText("Save");
    });
}

/* POST Add Place Function */
function handleNewPlaceSubmit(inputValues) {
  addPlaceModal.setSubmitButtonText("Saving...");

  api
    .addCard({ name: inputValues.name, link: inputValues.link })
    .then(({ name, link, _id }) => {
      section.addItem(getCardElement({ name, link, _id }));
      addPlaceModal.close();

      addPlaceModal.reset();
    })
    .catch((err) => {
      console.error("Error adding new place:", err);
    })
    .finally(() => {
      addPlaceModal.setSubmitButtonText("Save");
    });
}

/* PUT Add Like React */
function handleLikeReact(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => {
        card.toggleLike();
        card.setIsLiked(false);
      })
      .catch((error) => console.error("Error removing like reaction:", error));
  }
  if (!card.isLiked) {
    api
      .likeCard(card._id)
      .then(() => {
        card.toggleLike();
        card.setIsLiked(true);
      })
      .catch((error) => console.error("Error adding like reaction:", error));
  }
}

/* Edit Profile Button Listener */
profileEditBtn.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name || "";
  profileDescriptionInput.value = currentUser.about || "";
  profileEditValidation.resetValidation();
  editProfileModal.open();
});

/* Add Place Button Listener */
placesAddBtn.addEventListener("click", () => {
  addPlaceModal.open();
});

/*Profile Avatar Button Listener*/
updateAvatarBtn.addEventListener("click", () => {
  updateProfileImage.open();
});
