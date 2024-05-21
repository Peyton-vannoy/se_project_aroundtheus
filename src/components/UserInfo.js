class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._titleElement.textContent,
      job: this._descriptionElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._titleElement.textContent = userData.title;
    this._descriptionElement.textContent = userData.description;
  }
}

export default UserInfo;
