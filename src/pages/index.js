// import classes
import "../pages/index.css";

// import modules
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithConfirm from "../components/PopupWithComfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import ProfileEditImage from "../components/ProfileEditImage.js";

// import constants
import {
  formList,
  profileEditButton,
  profileEditIcon,
  addCardButton,
  nameInput,
  aboutInput,
  config,
} from "../utils/constants.js";

// * ||--------------------------------------------------------------------------------||
// * ||---------------------------------- Instances -----------------------------------||
// * ||--------------------------------------------------------------------------------||
// Create an instance of the Api class
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1abbe3bb-ec4a-49b1-8cc7-97fb0e8300a6",
    "Content-Type": "application/json",
  },
});

// Create an instance of the Profile class
const profile = new ProfileEditImage(
  ".profile__container",
  ".profile__edit-icon"
);

// Create instances of the Popup classes
const deleteModal = new PopupWithConfirm("#delete__modal", handleDeleteClick);
const profileImageModal = new PopupWithForm(
  "#profile-image-modal",
  handleProfileImageFormSubmit
);
const proileEditModal = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileFormSubmit
);
const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
const previewImageModal = new PopupWithImage("#preview__image-modal");

// set event listeners
deleteModal.setEventListeners();
profileImageModal.setEventListeners();
proileEditModal.setEventListeners();
addCardModal.setEventListeners();
profile.setEventListeners();
previewImageModal.setEventListeners();

// userInfo instance
const userInfo = new UserInfo({
  nameElement: "#profile__title",
  aboutElement: ".profile__description",
  avatarElement: ".profile__image",
});

// ? ||--------------------------------------------------------------------------------||
// ? ||----------------------------------- API ----------------------------------------||
// ? ||--------------------------------------------------------------------------------||
// get user info
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    userInfo.setUserAvatar({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

// get initial cards
let cardSection;
api
  .getInitialCards()
  .then((cardData) => {
    cardSection = new Section(
      {
        items: cardData,
        renderer: renderCard,
      },
      "#card__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

// ? ||--------------------------------------------------------------------------------||
// ? ||-------------------------------Function-----------------------------------------||
// ? ||--------------------------------------------------------------------------------||
// function to create a card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card__template",
    handleCardImageClick,
    handleDeleteClick,
    handleLikeClick
  );

  return card.getCardElement();
}

// function to render a card
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

// function to handle card image click
function handleCardImageClick(cardData) {
  previewImageModal.open(cardData);
}

// function to handle delete click
function handleDeleteClick(card) {
  deleteModal.open();

  deleteModal.setSubmitAction(() => {
    deleteModal.setSubmitButtonText("Deleting....");

    api
      .removeCard(card._id)
      .then(() => {
        card.handleDeleteCard();
        deleteModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteModal.setSubmitButtonText("Delete");
      });
  });
}

// function to handle like click
function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .disLikeCard(card._id)
      .then(() => {
        card.toggleLike();
        card.isLiked = false;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!card.isLiked) {
    api
      .likeCard(card._id)
      .then(() => {
        card.toggleLike();
        card.isLiked = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// * ||--------------------------------------------------------------------------------||
// * ||-------------------------------Event Listeners----------------------------------||
// * ||--------------------------------------------------------------------------------||

// profile edit button event listener
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  aboutInput.value = currentUser.about;
  formValidators["profile-form"].resetValidation();
  proileEditModal.open();
});

// add card button event listener
addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

// profile edit icon event listener
profileEditIcon.addEventListener("click", () => {
  profileImageModal.open();
});

// * ||--------------------------------------------------------------------------------||
// * ||-------------------------------Event Handler------------------------------------||
// * ||--------------------------------------------------------------------------------||
// profile image form submit handlers
function handleProfileImageFormSubmit(inputValues) {
  profileImageModal.setSubmitButtonText("Saving....");
  api
    .editProfileImage(inputValues)
    .then((res) => {
      userInfo.setUserAvatar(res);
      profileImageModal.close();
      formValidators["profile-image-form"].disableButton();
      profileImageModal.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileImageModal.setSubmitButtonText("Save");
    });
}

// profile form submit handlers
function handleProfileFormSubmit(inputValues) {
  proileEditModal.setSubmitButtonText("Saving....");

  api
    .editProfile({
      name: inputValues.name,
      about: inputValues.about,
    })
    .then(({ name, about }) => {
      userInfo.setUserInfo({ name, about });
      proileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      proileEditModal.setSubmitButtonText("Save");
    });
}

// add card form submit handlers
function handleAddCardFormSubmit(inputValues) {
  addCardModal.setSubmitButtonText("Saving....");

  api
    .addCard({
      name: inputValues.name,
      link: inputValues.link,
    })
    .then(({ name, link, _id }) => {
      cardSection.addItem(createCard({ name, link, _id }));
      addCardModal.close();
      formValidators["card-form"].disableButton();
      addCardModal.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardModal.setSubmitButtonText("Save");
    });
}

// ? ||--------------------------------------------------------------------------------||
// ? ||-------------------------------Form Validation----------------------------------||
// ? ||--------------------------------------------------------------------------------||
// form validation
const formValidators = {};
const enableValidation = (formList) => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation();
    formValidators[formElement.getAttribute("name")] = validator;
  });
};

enableValidation(formList);
