export default class UserInfo {
  constructor() {
    this._profileName = document.querySelector(".profile__title");
    this._profileJob = document.querySelector(".profile__description");
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._profileName.textContent = title;
    this._profileJob.textContent = description;
  }
}
