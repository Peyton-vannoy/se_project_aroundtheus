import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = this.popupElement.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitAction(callbackFunction) {
    this._handleFormSubmit = callbackFunction;
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}

export default PopupWithConfirm;
