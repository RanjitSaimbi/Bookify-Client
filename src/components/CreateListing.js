import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppAPI from "../api/AppApi";

class CreateListing extends Component {
  state = {};

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    const listingDetails = {
      book: {
        title: this.state.title,
        genre: this.state.genre,
        author: this.state.author
      },
      listing: {
        location: this.state.location,
        image_url: this.state.image_url,
        category: this.state.category,
        condition: this.state.condition
      }
    };
    AppAPI.createListing(listingDetails).then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        this.props.updateStateOnCreate(data);
        this.props.history.push("/");
      }
    });
  };

  componentWillReceiveProps() {
    return this.props.selectedBook
      ? this.setState({
          title: this.props.selectedBook.volumeInfo.title,
          author: this.props.selectedBook.volumeInfo.authors[0],
          genre: this.props.selectedBook.volumeInfo.categories[0],
          image_url: this.props.selectedBook.volumeInfo.imageLinks.thumbnail
        })
      : null;
  }

  render() {
    const {
      title,
      author,
      genre,
      location,
      image_url,
      category,
      condition
    } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h5>Create Listing</h5>
        <TextField
          label="Book title"
          value={title || ""}
          onChange={handleChange}
          margin="normal"
          name="title"
        />
        <br />
        <TextField
          label="Author"
          value={author || ""}
          onChange={handleChange}
          margin="normal"
          name="author"
          type="author"
        />
        <br />
        <TextField
          label="Genre"
          value={genre || ""}
          onChange={handleChange}
          margin="normal"
          name="genre"
          type="genre"
        />
        <br />
        <TextField
          label="Location"
          value={location || ""}
          onChange={handleChange}
          margin="normal"
          name="location"
          type="location"
        />
        <br />
        <TextField
          label="Image"
          value={image_url || ""}
          onChange={handleChange}
          margin="normal"
          name="image_url"
          type=""
        />
        <br />
        <TextField
          label="Category"
          value={category || ""}
          onChange={handleChange}
          margin="normal"
          name="category"
          type="category"
        />
        <br />
        <TextField
          label="Condition"
          value={condition || ""}
          onChange={handleChange}
          margin="normal"
          name="condition"
          type="condition"
        />
        <br />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          CREATE
        </Button>
      </div>
    );
  }
}

export default withRouter(CreateListing);
