import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Input } from "reactstrap";
import UserAPI from "../api/UserApi";
import CheckButtons from "./CheckButtons";

class BookMessages extends Component {
  state = {
    expanded: false,
    modal: false,
    message: ""
  };

  handleSelectionOfRecipient = event => {
    this.setState({ selectedRecipient: event.target.value });
  };

  handleChange = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleTyping = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  sendMessage = (book, recipient) => {
    const message = {
      book: book,
      body: this.state.message,
      recipient: recipient
    };
    UserAPI.sendMessage(message)
      .then(resp => console.log(resp))
      .then(this.toggle());
    //   make relevant changes to state where necessary
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
      <div className={classes.root}>
        <ExpansionPanel
          expanded={this.state.expanded}
          onChange={this.handleChange}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Messages relating to{" "}
              {this.props.bookMessages
                ? this.props.bookMessages[0].book.title
                : null}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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
                      handleSelectionOfRecipient={
                        this.handleSelectionOfRecipient
                      }
                      username={this.props.username}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      let book = this.props.bookMessages[0].book;
                      this.sendMessage(book);
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

            {this.props.bookMessages.map(bookMessage => {
              return (
                <div>
                  {" "}
                  <br />
                  <Typography>
                    from: {bookMessage.sender.username} to{" "}
                    {bookMessage.recipient.username} at {bookMessage.created_at}{" "}
                    {bookMessage.body}
                  </Typography>
                </div>
              );
            })}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default BookMessages;
