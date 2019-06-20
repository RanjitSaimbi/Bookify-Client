import React, { Component } from "react";

import styles from "../styles/MessagePage.module.css";

import MessageFolder from "./MessageFolder";

class MessagePage extends Component {
  render() {
    let myMessages = this.props.myMessages;
    let arrayOfMyMessages = Object.keys(myMessages).map(i => myMessages[i]);
    return (
      <div>
        <div className={styles.container} />
        {arrayOfMyMessages
          ? arrayOfMyMessages.map(bookMessages => {
              return (
                <MessageFolder
                  bookMessages={bookMessages}
                  username={this.props.username}
                  sendMessage={this.props.sendMessage}
                />
              );
            })
          : null}
      </div>
    );
  }
}

export default MessagePage;
