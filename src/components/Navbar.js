import React from "react";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from "mdbreact";

const Navbar = props => (
  <MDBNavbar color="indigo" dark expand="md">
    <MDBNavbarBrand>
      <strong className="white-text">Navbar</strong>
    </MDBNavbarBrand>
    <MDBNavbarNav right>
      <MDBNavItem>
        <Link to="/mylistings">
          <h6>My Listings </h6>
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
