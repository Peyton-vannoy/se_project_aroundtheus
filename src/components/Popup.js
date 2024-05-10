export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("click", this._handleEscapeClose);
    this._popupElement.addEventListener("click", this._handleOverlayClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("click", this._handleEscapeClose);
    this._popupElement.removeEventListener("click", this._handleOverlayClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popupElement) {
      this._close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
