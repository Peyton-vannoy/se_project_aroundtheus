class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this.isLiked = cardData.isLiked;

    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // Get the card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);

    return cardElement;
  }

  // Set event listeners
  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
    this._cardImageElement.addEventListener("click", () => {
      this._handleCardImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  toggleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardElement() {
    // Create the card element
    this._cardElement = this._getTemplate();

    // Get the card elements
    this._likeButton = this._cardElement.querySelector("#card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      "#card__delete-button"
    );
    this._cardImageElement = this._cardElement.querySelector("#card__image");
    this._cardTitleElement = this._cardElement.querySelector("#card__title");

    //  Set the card data
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    this.renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
