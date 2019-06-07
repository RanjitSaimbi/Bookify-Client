class UserAPI {
  static baseUrl = "http://localhost:4000";
  static signUpUrl = UserAPI.baseUrl + "/signup";
  static signInUrl = UserAPI.baseUrl + "/signin";
  static validateUrl = UserAPI.baseUrl + "/validate";

  static signup(user) {
    return fetch(this.signUpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(resp => resp.json());
  }

  static signin(user) {
    return fetch(this.signInUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(resp => resp.json());
  }

  static validate() {
    const token = localStorage.getItem("token");
    return fetch(this.validateUrl, {
      headers: { Authorization: token }
    }).then(resp => resp.json());
  }
}

export default UserAPI;
