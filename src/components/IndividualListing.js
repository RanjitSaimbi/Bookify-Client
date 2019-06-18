import React, { Component } from "react";
import UserAPI from "../api/UserApi";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, FormGroup, Input } from "reactstrap";
import styles from "../styles/IndividualListing.module.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBMedia } from "mdbreact";

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
    // return this.props.listing ? (
    //   <div>
    //     <div className={styles.container}>
    //       <div />
    //       <img
    //         src={this.props.listing.image_url}
    //         alt={this.props.listing.book.title}
    //       />
    //     </div>{" "}
    //     <div>
    //       <h2>Further details</h2>
    //       {this.state.showMessageButton ? (
    //         <div>
    //           <Button color="muted" onClick={this.toggle}>
    //             Message Owner
    //           </Button>
    //           <Modal
    //             isOpen={this.state.modal}
    //             toggle={this.toggle}
    //             className={this.props.className}
    //           >
    //             <ModalHeader toggle={this.toggle}>Message Owner</ModalHeader>
    //             <ModalBody>
    //               <FormGroup>
    //                 <Input
    //                   value={this.state.message}
    //                   name="message"
    //                   placeholder="Write message..."
    //                   onChange={this.handleChange}
    //                 />
    //               </FormGroup>
    //             </ModalBody>
    //             <ModalFooter>
    //               <Button color="primary" onClick={this.sendMessage}>
    //                 Send Message
    //               </Button>{" "}
    //               <Button color="secondary" onClick={this.toggle}>
    //                 Cancel
    //               </Button>
    //             </ModalFooter>
    //           </Modal>
    //         </div>
    //       ) : (
    //         <h2>You have messaged the owner</h2>
    //       )}
    //     </div>{" "}
    //   </div>
    // ) : (
    //   <h1>Loading</h1>
    // );
    return (
      <div>
        <div className={styles.container} />

        <div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="8">
                <MDBMedia>
                  <MDBMedia left className="mr-3" href="#">
                    <MDBMedia
                      object
                      src={this.props.listing.image_url}
                      alt=""
                    />
                  </MDBMedia>
                  <MDBMedia body>
                    <MDBMedia heading>{this.props.listing.book.title}</MDBMedia>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin. Cras purus odio, vestibulum
                    in vulputate at, tempus viverra turpis. Fusce condimentum
                    nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                    in faucibus.
                  </MDBMedia>
                </MDBMedia>
              </MDBCol>
              <MDBCol md="4">.col-md-4</MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default IndividualListing;
