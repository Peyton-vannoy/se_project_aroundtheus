export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;

    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeIcon.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }
  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.renderLikes();
  }

  renderLikes() {
    if (this.isLiked) {
      this._likeIcon.classList.add("card__react-button_active");
    } else {
      this._likeIcon.classList.remove("card__react-button_active");
    }
  }

  toggleLike() {
    this._likeIcon.classList.toggle("card__react-button_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = "Photo of " + this._name;
    this._likeIcon = this._cardElement.querySelector(".card__react-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    this.renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }
}
