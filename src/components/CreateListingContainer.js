import React, { Component } from "react";
import CreateListing from "../components/CreateListing";
import SearchBooksAPI from "./SearchBooksAPI";
import styles from "../styles/ListingContainer.module.css";

class CreateListingContainer extends Component {
  state = {};

  selectBook = result => {
    this.setState({ selectedBook: result });
  };

  render() {
    return (
      <div className={styles.container}>
        <CreateListing
          updateStateOnCreate={this.props.updateStateOnCreate}
          selectedBook={this.state.selectedBook}
        />
        <SearchBooksAPI selectBook={this.selectBook} />
      </div>
    );
  }
}

export default CreateListingContainer;
