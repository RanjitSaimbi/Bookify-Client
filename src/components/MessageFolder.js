import React, { Component } from "react";
import BookMessages from "./BookMessages";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import Button from "@material-ui/core/Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Input } from "reactstrap";
import CheckButtons from "./CheckButtons";

class MessageFolder extends Component {
  state = {
    open: false,
    expanded: false,
    modal: false,
    message: "",
    selectedRecipient: null
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSelectionOfRecipient = event => {
    event.persist();
    this.setState({ selectedRecipient: event.target.value });
  };

  handleChange = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleTyping = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal, message: "" });
  };

  render() {
    const classes = {
      root: {
        width: "100%"
      },
      heading: {
        flexBasis: "33.33%",
        flexShrink: 0
      }
    };

    return (
      <List className={classes.root}>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={this.props.bookMessages[0].book.title} />
          <div>
            <Button onClick={this.toggle} color="primary">
              New message
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Message Owner</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Input
                    value={this.state.message}
                    name="message"
                    placeholder="Write message..."
                    onChange={this.handleTyping}
                  />
                  <CheckButtons
                    bookMessages={this.props.bookMessages}
                    handleSelectionOfRecipient={this.handleSelectionOfRecipient}
                    username={this.props.username}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    const message = {
                      book: this.props.bookMessages[0].book.id,
                      body: this.state.message,
                      recipient: this.state.selectedRecipient
                    };
                    this.props.sendMessage(message).then(this.toggle());
                  }}
                >
                  Send Message
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>

          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <BookMessages
          bookMessages={this.props.bookMessages}
          username={this.props.username}
          sendMessage={this.props.sendMessage}
          open={this.state.open}
        />
      </List>
    );
  }
}

export default MessageFolder;
