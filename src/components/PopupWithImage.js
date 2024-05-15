import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popupElement.querySelector(".popup__image");
    this._popupCaption = this._popupElement.querySelector(".popup__caption");
  }
  open(cardData) {
    this._popupImageElement.src = cardData.link;
    this._popupImageElement.alt = `${cardData.link}`;
    this._popupCaption.textContent = cardData.name;
    super.open();
  }
}

export default PopupWithImage;
