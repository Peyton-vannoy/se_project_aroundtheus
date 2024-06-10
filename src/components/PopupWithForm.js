class ProfileEditImage {
  constructor(container, icon) {
    this._container = document.querySelector(container);
    this._icon = document.querySelector(icon);
  }

  showIcon() {
    this._icon.style.display = "inline-block";
  }

  hideIcon() {
    this._icon.style.display = "none";
  }

  setEventListeners() {
    this._container.addEventListener("mouseenter", this.showIcon.bind(this));
    this._container.addEventListener("mouseleave", this.hideIcon.bind(this));
  }
}

export default ProfileEditImage;
