import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Container.module.css";
import CardMounter from "./CardMounter";
import TextField from "@material-ui/core/TextField";

class Container extends Component {
  state = { searchTerm: "" };

  setSearch = event => this.setState({ searchTerm: event.target.value });

  searchListings = () => {
    return this.props.listings.filter(listing => {
      return (
        listing.book.author
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        listing.book.title
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        listing.book.genre
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        listing.location
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase())
      );
    });
  };

  render() {
    const { searchTerm } = this.state;
    const { setSearch, searchListings } = this;
    return (
      <div className={styles.container}>
        <div />
        <div
          className={styles.imgStyle}
          style={{ position: "relative", textAlign: "center" }}
        >
          <div
            style={{
              position: "relative",
              top: "61%"
            }}
          >
            <TextField
              placeholder="Search for books to borrow / buy in your area"
              helperText="Search by author, title, genre and listing location"
              color="red"
              margin="normal"
              InputProps={{
                style: {
                  fontSize: 58,
                  color: "#f73b5a"
                }
              }}
              style={{ width: "80%" }}
              value={searchTerm}
              onChange={setSearch}
            />
            <br />
            <br />
            {this.props.username ? (
              <Link to="/listing/create">
                <h3>List Book </h3>
              </Link>
            ) : null}
          </div>
        </div>
        <div className={styles.nested}>
          {" "}
          {this.props.listings
            ? searchListings().map(listing => (
                <CardMounter
                  key={listing.id}
                  listing={listing}
                  username={this.props.username}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Container;
