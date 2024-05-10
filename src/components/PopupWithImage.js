import Popup from "./Popup";

class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".popup__caption").textContent = name;
    const image = this._popupElement.querySelector(".popup__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}

export default PopupWithImage;
