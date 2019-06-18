import React, { Component } from "react";
import UserAPI from "../api/UserApi";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from "reactstrap";
import styles from "../styles/IndividualListing.module.css";
import { MDBContainer, MDBRow, MDBCol, MDBMedia, MDBBtn } from "mdbreact";
import SimpleMap from "./GoogleMapReact";

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
    UserAPI.getLongAndLat(this.props.listing.location).then(data =>
      this.setState({ longAndLat: data })
    );
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  sendMessage = () => {
    const message = {
      book: this.props.listing.book.id,
      body: this.state.message,
      recipient: this.props.listing.user.username
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
    return (
      <div>
        <div className={styles.container} />

        <div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="5">
                <MDBMedia>
                  <MDBMedia left className="mr-3" href="#">
                    <MDBMedia
                      object
                      src={this.props.listing.image_url}
                      alt=""
                    />
                  </MDBMedia>
                </MDBMedia>
              </MDBCol>
              <MDBCol md="6">
                <MDBMedia body className="text-justify">
                  <MDBMedia heading>
                    {this.props.listing.book.title}{" "}
                    {this.state.showMessageButton ? (
                      <div>
                        <MDBBtn gradient="purple" onClick={this.toggle}>
                          Message {this.props.listing.user.username}
                        </MDBBtn>
                        <Modal
                          isOpen={this.state.modal}
                          toggle={this.toggle}
                          className={this.props.className}
                        >
                          <ModalHeader toggle={this.toggle}>
                            Message {this.props.listing.user.username}
                          </ModalHeader>
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
                            <MDBBtn color="primary" onClick={this.sendMessage}>
                              Send Message
                            </MDBBtn>{" "}
                            <MDBBtn color="secondary" onClick={this.toggle}>
                              Cancel
                            </MDBBtn>
                          </ModalFooter>
                        </Modal>
                      </div>
                    ) : (
                      <h2>You have messaged the owner</h2>
                    )}
                  </MDBMedia>
                  {this.props.listing.book.description}
                </MDBMedia>
                {this.state.longAndLat ? (
                  <div>
                    <div>
                      <br />
                      <p className="float-left">
                        Condition: {this.props.listing.condition}
                      </p>
                      <br />
                      <br />
                      <p className="float-none">
                        Category: {this.props.listing.category}
                      </p>
                    </div>
                    <SimpleMap
                      center={{
                        lat: this.state.longAndLat.results[0].geometry.location
                          .lat,
                        lng: this.state.longAndLat.results[0].geometry.location
                          .lng
                      }}
                      zoom={11}
                    />{" "}
                  </div>
                ) : null}{" "}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default IndividualListing;
