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
    window.scrollBy(0, -9000);
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

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div
        style={{
          backgroundColor: "#F6BECB",
          height: "max-content",
          minHeight: "100vh"
        }}
      >
        <div className={styles.container} />

        <div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="5">
                <MDBMedia>
                  <MDBMedia left className="mr-3">
                    <div
                      style={{
                        border: "1px solid #FFE4E1",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "7px",
                        textAlign: "center",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                      }}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${
                            this.props.listing.image_url
                          })`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "50vh",
                          width: "30vh",
                          display: "inline-block",
                          borderRadius: "2px",
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                        }}
                      />
                      <p />
                      <p className="text-justify">
                        {this.props.listing.book.description}
                      </p>
                    </div>
                  </MDBMedia>
                </MDBMedia>
              </MDBCol>
              <MDBCol md="6">
                <div>
                  <h1 style={{ fontWeight: "bold" }}>
                    {this.props.listing.book.title}
                  </h1>
                  <p />
                  <MDBMedia body className="text-justify">
                    <MDBMedia heading>
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
                              <MDBBtn
                                color="primary"
                                onClick={() => {
                                  const message = {
                                    book: this.props.listing.book.id,
                                    body: this.state.message,
                                    recipient: this.props.listing.user.username
                                  };
                                  this.props.sendMessage(message);
                                }}
                              >
                                Send Message
                              </MDBBtn>{" "}
                              <MDBBtn color="secondary" onClick={this.toggle}>
                                Cancel
                              </MDBBtn>
                            </ModalFooter>
                          </Modal>
                        </div>
                      ) : (
                        <div>
                          <p />
                          <h5 style={{ fontWeight: "bold", color: "#3f51b5" }}>
                            You have messaged the owner
                          </h5>
                        </div>
                      )}
                      <p />
                    </MDBMedia>
                  </MDBMedia>
                  {this.state.longAndLat ? (
                    <div>
                      <div>
                        <p className="float-left">
                          Condition: {this.props.listing.condition}
                          <p className="float-none">
                            Category: {this.props.listing.category}
                          </p>
                        </p>
                        <p />
                        <br />
                        <br />
                      </div>
                      <SimpleMap
                        center={{
                          lat: this.state.longAndLat.results[0].geometry
                            .location.lat,
                          lng: this.state.longAndLat.results[0].geometry
                            .location.lng
                        }}
                        zoom={11}
                      />{" "}
                    </div>
                  ) : null}{" "}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default IndividualListing;
