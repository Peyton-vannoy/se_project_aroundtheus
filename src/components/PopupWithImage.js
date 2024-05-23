import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._previewTitle = this._popupElement.querySelector(
      ".modal__image-caption"
    );
  }

  open(imageData) {
    this._previewImage.src = imageData.link;
    this._previewImage.alt = imageData.name;
    this._previewTitle.textContent = imageData.name;
    super.open();
  }
}
