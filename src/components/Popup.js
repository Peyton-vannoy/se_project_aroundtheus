export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (e) => {
      if (e.target === this._popupElement) {
        this.close();
      }
    });
  }
}
