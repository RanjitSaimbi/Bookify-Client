class UserAPI {
  static baseUrl = "http://localhost:4000";
  static signUpUrl = UserAPI.baseUrl + "/signup";
  static signInUrl = UserAPI.baseUrl + "/signin";
  static validateUrl = UserAPI.baseUrl + "/validate";
  static getBookMessagesUrl = UserAPI.baseUrl + "/getbookmessages";
  static sendMessageUrl = UserAPI.baseUrl + "/sendmessage";
  static senderRecipientMessagesUrl =
    UserAPI.baseUrl + "/getsenderrecipientmesssages";

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
      headers: { token: token }
    }).then(resp => resp.json());
  }

  static getBookMessages(id) {
    return fetch(this.getBookMessagesUrl + `/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json());
  }

  static sendMessage(message) {
    return fetch(this.sendMessageUrl, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    }).then(resp => resp.json());
  }

  static getSenderRecipientMessages() {
    return fetch(this.senderRecipientMessagesUrl, {
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json());
  }
}

export default UserAPI;
