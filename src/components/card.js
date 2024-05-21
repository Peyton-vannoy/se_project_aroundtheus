class Card {
  constructor(cardData, { handlePreviewPicture }, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _setEventListeners() {
    // ".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeIcon);

    // ".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });

    this._cardImageEl = this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture({ link: this._link, name: this._name });
      });
  }

  _handleLikeIcon = () => {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
