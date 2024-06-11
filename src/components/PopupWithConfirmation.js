import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__save-button");
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitHandler(callbackFunction) {
    this._handleFormSubmit = callbackFunction;
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
