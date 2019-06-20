import React, { Component } from "react";
import BookMessages from "./BookMessages";
import styles from "../styles/MessagePage.module.css";

import MessageFolder from "./MessageFolder";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import FolderIcon from "@material-ui/icons/Folder";

class MessagePage extends Component {
  // state = { open: false };

  // handleClick = () => {
  //   this.setState({ open: !this.state.open });
  // };
  render() {
    // const classes = {
    //   root: {
    //     width: "100%"
    //   },
    //   heading: {
    //     flexBasis: "33.33%",
    //     flexShrink: 0
    //   }
    // };

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
