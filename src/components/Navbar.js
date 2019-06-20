import React from "react";
import { NavLink } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from "mdbreact";
import styles from "../styles/NavBar.module.css";

const Navbar = props => (
  <MDBNavbar color="indigo" dark expand="md" scrolling fixed="top">
    <MDBNavbarBrand>
      <NavLink to="/">
        <h2 className={styles.fontLogo}>BOOKIFY</h2>
      </NavLink>
    </MDBNavbarBrand>
    <MDBNavbarNav right>
      {props.username ? (
        <MDBNavItem>
          <NavLink
            className={styles.linkFont}
            to="/mylistings"
            activeStyle={{ color: "#f73b5a" }}
          >
            <h6>My Listings </h6>
          </NavLink>
        </MDBNavItem>
      ) : null}
      &nbsp; &nbsp; &nbsp;
      <MDBNavItem>
        {props.username ? (
          <NavLink
            className={styles.linkFont}
            to="/messages"
            activeStyle={{ color: "#f73b5a" }}
          >
            <h6> Messages </h6>
          </NavLink>
        ) : null}
      </MDBNavItem>
      &nbsp; &nbsp; &nbsp;
      <MDBNavItem>
        {props.username ? (
          <NavLink
            className={styles.linkFont}
            activeStyle={{ color: "#f73b5a" }}
          >
            <h6 onClick={props.signout}>Log out </h6>
          </NavLink>
        ) : (
          <NavLink to="/signup" className={styles.linkFont}>
            <h6>Sign Up </h6>
          </NavLink>
        )}
      </MDBNavItem>
      &nbsp; &nbsp; &nbsp;
    </MDBNavbarNav>
  </MDBNavbar>
);

export default Navbar;
