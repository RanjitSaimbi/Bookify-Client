import React, { Component } from "react";
import UserAPI from "../api/UserApi";

class MessagePage extends Component {
  state = {};

  componentDidMount() {
    UserAPI.getSenderRecipientMessages().then(resp =>
      this.setState({ myMessages: Object.keys(resp).map(i => resp[i]) })
    );
  }

  render() {
    return <h1>MESSAGE PAGE</h1>;
  }
}

export default MessagePage;
