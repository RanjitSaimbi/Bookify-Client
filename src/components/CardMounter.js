import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdbreact";

class CardMounter extends Component {
  state = {};
  render() {
    return (
      <Link to={`/listing/${this.props.listing.id}`}>
        <MDBCard>
          <MDBCardImage
            className="img-fluid"
            src={this.props.listing.image_url}
          />
          <MDBCardBody>
            <h6>
              {this.props.listing.book.title} by{" "}
              {this.props.listing.book.author}
            </h6>
            <h6 className="font-weight-bold blue-text">
              {this.props.listing.location}, {this.props.listing.user.username}
            </h6>
          </MDBCardBody>
        </MDBCard>
      </Link>
    );
  }
}

export default CardMounter;
