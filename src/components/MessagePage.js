import React, { Component } from "react";
import BookMessages from "./BookMessages";

class MessagePage extends Component {
  state = {};
  render() {
    return (
      <div>
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
