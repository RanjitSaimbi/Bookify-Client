import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import styles from "../styles/CreateListing.module.css";
import { debounce } from "lodash";

class SearchBooksAPI extends Component {
  state = {
    search: "",
    searchResults: [],
    selectedBook: {}
  };

  getBooks = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${
        this.state.search
      }:keyes&key=INSERTKEY`
    )
      .then(resp => resp.json())
      .then(resp => this.setState({ searchResults: resp }));
  };

  handleChange = event => {
    this.setState(
      { [event.target.name]: event.target.value },
      debounce(() => {
        this.getBooks(this.state.search);
      }, 2000)
    );
  };

  render() {
    return (
      <div>
        <div className={styles.container} />
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <p />
              <p className="h5 text-center mb-3">Search Google Books</p>
            </MDBCol>
          </MDBRow>
          <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
            Search
          </label>
          <input
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control"
            value={this.state.search}
            onChange={this.handleChange}
            name="search"
          />
          <p />
          <ul>
            {this.state.searchResults.items
              ? this.state.searchResults.items.map(result => {
                  return result.volumeInfo.imageLinks ? (
                    <div
                      key={result.id}
                      onClick={() => {
                        this.props.selectBook(result);
                      }}
                    >
                      <img
                        src={result.volumeInfo.imageLinks.thumbnail}
                        alt=""
                      />
                      <h6>{result.volumeInfo.title}</h6>
                    </div>
                  ) : null;
                })
              : null}
          </ul>
        </MDBContainer>
      </div>
    );
  }
}

export default SearchBooksAPI;
