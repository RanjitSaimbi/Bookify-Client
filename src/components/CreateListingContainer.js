import React, { Component } from "react";
import CreateListing from "../components/CreateListing";
import SearchBooksAPI from "./SearchBooksAPI";
import styles from "../styles/ListingContainer.module.css";

class CreateListingContainer extends Component {
  state = {};
  render() {
    return (
      <div className={styles.container}>
        <CreateListing updateStateOnCreate={this.props.updateStateOnCreate} />
        <SearchBooksAPI />
      </div>
    );
  }
}

export default CreateListingContainer;
