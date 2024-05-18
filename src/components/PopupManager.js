class PopupManager {
  constructor(popupSelector) {
    this.closeButtons = document.querySelectorAll(
      `${popupSelector} .closeButton`
    );
    this.popups = document.querySelectorAll(popupSelector);
    this.addNewCardButton = document.getElementById("addNewCardButton");
    this.popupSelector = popupSelector;

    this.addCloseButtonListeners();
    this.addPopupListeners();
    this.addNewCardButtonListener();
  }

  addCloseButtonListeners() {
    this.closeButtons.forEach((button) => {
      const popup = button.closest(this.popupSelector);
      button.addEventListener("click", () => this.closePopup(popup));
    });
  }

  addPopupListeners() {
    this.popups.forEach((popup) => {
      popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          this.closePopup(popup);
        }
      });
    });
  }

  addNewCardButtonListener() {
    this.addNewCardButton.addEventListener("click", () =>
      this.openPopup(addCardPopup)
    );
  }

  openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", this.handleEscape);
  }

  closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.handleEscape);
  }

  handleEscape(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(
        `${this.popupSelector}.popup_opened`
      );
      if (openedPopup) {
        this.closePopup(openedPopup);
      }
    }
  }
}

// Usage
const popupManager = new PopupManager(".popup");
