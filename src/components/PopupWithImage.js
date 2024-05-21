import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }
  open(data) {
    this._popupImageElement.src = data.link;
    this._popupImageElement.alt = `${data.link}`;
    this._popupCaption.textContent = data.name;
    super.open();
  }
}

export default PopupWithImage;
