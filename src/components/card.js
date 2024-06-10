export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = {
      name: data.name,
      link: data.link,
      id: data._id,
      isLiked: data.isLiked,
    };
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeIcon.addEventListener("click", () => {
      this._handleLikeClick(this._likeIcon, this._data.isLiked, this._data.id);
      this._data.isLiked = !this._data.isLiked;
    });
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this._data.id, this._cardElement);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardTitleEl.textContent = this._data.name;
    this._cardImageEl.src = this._data.link;
    this._cardImageEl.alt = "Photo of " + this._data.name;
    this._likeIcon = this._cardElement.querySelector(".card__react-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    if (this._data.isLiked) {
      this._likeIcon.classList.add("card__react-button_active");
    } else {
      this._likeIcon.classList.remove("card__react-button_active");
    }

    this._setEventListeners();
    return this._cardElement;
  }
}
