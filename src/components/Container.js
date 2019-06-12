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
        <div>
          <TextField
            style={{ margin: 8 }}
            placeholder="Search for books to borrow / buy in your area"
            helperText="Search by author, title, genre and listing location"
            fullWidth
            margin="normal"
            InputProps={{ style: { fontSize: 40 } }}
            value={searchTerm}
            onChange={setSearch}
          />
          <br />
          <br />
          <Link to="/listing/create">
            <h5>List Book </h5>
          </Link>
        </div>
        <div className={styles.nested}>
          {" "}
          {this.props.listings
            ? searchListings().map(listing => (
                <CardMounter key={listing.id} listing={listing} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Container;
