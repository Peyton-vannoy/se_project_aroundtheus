import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this.popupElement.querySelector(".modal__image");
    this._caption = this.popupElement.querySelector(".modal__caption");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
export default PopupWithImage;
