export default class ProfileEditImage {
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
    this._container.addEventListener("mouseover", () => {
      this.showIcon(this);
    });
    this._container.addEventListener("mouseout", () => {
      this.hideIcon(this);
    });
  }
}
