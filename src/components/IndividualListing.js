import React, { Component } from "react";
import UserAPI from "../api/UserApi";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, FormGroup, Input } from "reactstrap";

class IndividualListing extends Component {
  state = {
    showMessageButton: true,
    modal: false,
    message: ""
  };

  componentDidMount() {
    UserAPI.getBookMessages(this.props.listing.book.id).then(messages => {
      messages.find(message => {
        if (
          message.sender.username === this.props.username ||
          message.recipient.username === this.props.username
        ) {
          this.setState({ showMessageButton: !this.state.showMessageButton });
        }
      });
    });
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  sendMessage = () => {
    const message = {
      book: this.props.listing.book.id,
      body: this.state.message,
      recipient: this.props.listing.user.id
    };
    UserAPI.sendMessage(message)
      .then(resp => console.log(resp))
      .then(this.toggle())
      .then(
        this.setState({ showMessageButton: !this.state.showMessageButton })
      );
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return this.props.listing ? (
      <div>
        <div>
          <img
            src={this.props.listing.image_url}
            alt={this.props.listing.book.title}
          />
        </div>{" "}
        <div>
          <h2>Further details</h2>
          {this.state.showMessageButton ? (
            <div>
              <Button color="muted" onClick={this.toggle}>
                Message Owner
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
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.sendMessage}>
                    Send Message
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          ) : (
            <h2>You have messaged the owner</h2>
          )}
        </div>{" "}
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

export default IndividualListing;
