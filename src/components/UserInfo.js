class UserInfo {
  constructor(nameSelector, jobSelector) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      job: this.jobElement.textContent,
    };
  }

  setUserInfo(newUserData) {
    this.nameElement.textContent = newUserData.name;
    this.jobElement.textContent = newUserData.job;
  }
}

export default UserInfo;
