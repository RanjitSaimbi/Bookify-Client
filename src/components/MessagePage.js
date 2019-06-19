import React, { Component } from "react";
import BookMessages from "./BookMessages";
import styles from "../styles/MessagePage.module.css";

class MessagePage extends Component {
  state = {};
  render() {
    let myMessages = this.props.myMessages;
    let arrayOfMyMessages = Object.keys(myMessages).map(i => myMessages[i]);
    return (
      <div>
        <div className={styles.container} />
        {arrayOfMyMessages
          ? arrayOfMyMessages.map(bookMessages => {
              return (
                <BookMessages
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
