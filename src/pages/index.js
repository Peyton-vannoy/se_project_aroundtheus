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
  (cardData) => {
    console.log("Edit Profile Form Data:", cardData);
  }
);
const addImagePopup = new PopupWithForm("#add-card-popup", (cardData) => {
  console.log("Add Image Form Data:", cardData);
});

editProfilePopup.setEventListeners();
addImagePopup.setEventListeners();

const CardPreviewPopup = new PopupWithImage(selectors.previewPopup);
const CardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(
        item,
        {
          handlePreviewPicture: (cardData) => {
            CardPreviewPopup.open(cardData);
          },
        },
        selectors.cardTemplate
      );
      CardSection.addItem(cardElement.getView());
    },
  },
  selectors.cardSection
);

CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// const userData = userInfo.getUserInfo();

// userInfo.setUserInfo("New User", "Developer");

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

// const handlePreviewPicture = (cardData) => {
//   popupImageElement.src = cardData._link;
//   popupImageElement.alt = `${cardData._link}`;
//   popupCaption.textContent = cardData._name;
//   openPopup(imagePopup);
// };

// function renderCard(cardData, wrapper) {
//   const cardElement = createCard(cardData);
//   wrapper.prepend(cardElement);
// }

// function createCard(cardData) {
//   const card = new Card(cardData, { handlePreviewPicture }, cardSelector);

//   return card.getView();
// }

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

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});
