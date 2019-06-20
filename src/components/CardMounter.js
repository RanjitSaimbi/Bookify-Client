import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdbreact";

class CardMounter extends Component {
  state = {};
  render() {
    return (
      <MDBCard>
        <MDBCardImage
          className="img-fluid"
          src={this.props.listing.image_url}
        />
        {this.props.username ? (
          <Link to={`/listing/${this.props.listing.id}`}>
            <MDBCardBody>
              <h6 style={{ color: "#FF5D78" }}>
                {this.props.listing.book.title} by{" "}
                {this.props.listing.book.author}
              </h6>
              <h6 className="font-weight-bold blue-text">
                {this.props.listing.location},{" "}
                {this.props.listing.user.username}
              </h6>
            </MDBCardBody>
          </Link>
        ) : null}
      </MDBCard>
    );
  }
}

export default CardMounter;
