import React, { Component } from "react";
import BookMessages from "./BookMessages";
import styles from "../styles/MessagePage.module.css";

class MessagePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className={styles.container} />
        {this.props.myMessages
          ? this.props.myMessages.map(bookMessages => {
              return (
                <BookMessages
                  bookMessages={bookMessages}
                  username={this.props.username}
                />
              );
            })
          : null}
      </div>
    );
  }
}

export default MessagePage;
