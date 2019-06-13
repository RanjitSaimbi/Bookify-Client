import React from "react";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from "mdbreact";

const Navbar = props => (
  <MDBNavbar color="indigo" dark expand="md">
    <MDBNavbarBrand>
      <Link to="/">
        <strong className="white-text">LOGO</strong>
      </Link>
    </MDBNavbarBrand>
    <MDBNavbarNav right>
      {props.username ? (
        <MDBNavItem>
          <Link to="/mylistings">
            <h6>My Listings </h6>
          </Link>
        </MDBNavItem>
      ) : null}
      &nbsp; &nbsp; &nbsp;
      <MDBNavItem>
        <Link to="/messages">
          <h6>Messages </h6>
        </Link>
      </MDBNavItem>
      &nbsp; &nbsp; &nbsp;
      <MDBNavItem>
        {props.username ? (
          <h6 onClick={props.signout}>Log out </h6>
        ) : (
          <Link to="/signup">
            <h6>Sign Up </h6>
          </Link>
        )}
      </MDBNavItem>
      &nbsp; &nbsp; &nbsp;
      <MDBNavItem>
        <Link to="/about">
          <h6>About </h6>
        </Link>
      </MDBNavItem>
    </MDBNavbarNav>
  </MDBNavbar>
);

export default Navbar;
