import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

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
      }:keyes&key=AIzaSyBij64ezZmuN4urLgBMDj_b3a25v8x_3r4`
    )
      .then(resp => resp.json())
      .then(resp => this.setState({ searchResults: resp }));
  };

  handleChange = event => {
    this.setState(
      { [event.target.name]: event.target.value },
      this.getBooks(this.state.search)
    );
  };

  render() {
    return (
      <div>
        <h5>Search Google Books </h5>
        <TextField
          label="Search"
          value={this.state.search}
          onChange={this.handleChange}
          margin="normal"
          name="search"
        />
        <ul>
          {this.state.searchResults.items
            ? this.state.searchResults.items.map(result => {
                return result.volumeInfo.imageLinks ? (
                  <div key={result.id}>
                    <img src={result.volumeInfo.imageLinks.thumbnail} alt="" />
                    <h6
                      onClick={() => {
                        this.props.selectBook(result);
                      }}
                    >
                      {result.volumeInfo.title}
                    </h6>
                  </div>
                ) : null;
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default SearchBooksAPI;
