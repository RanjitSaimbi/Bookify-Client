import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class EditForm extends Component {
  state = {
    title: this.props.listingToEdit.book.title,
    author: this.props.listingToEdit.book.author,
    genre: this.props.listingToEdit.book.genre,
    location: this.props.listingToEdit.location,
    image_url: this.props.listingToEdit.image_url,
    category: this.props.listingToEdit.category,
    condition: this.props.listingToEdit.condition
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = id => {
    const listingDetails = {
      id: id,
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
    this.props.editListing(listingDetails);
  };

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
      <div width={20}>
        <h5>Edit Listing</h5>
        <TextField
          label={`Title`}
          value={title}
          onChange={handleChange}
          margin="normal"
          name="title"
          fullWidth={true}
        />
        <br />
        <TextField
          label={`Author`}
          value={author}
          onChange={handleChange}
          margin="normal"
          name="author"
          type="author"
          fullWidth={true}
        />
        <br />
        <TextField
          label={`Genre`}
          value={genre}
          onChange={handleChange}
          margin="normal"
          name="genre"
          type="genre"
          fullWidth={true}
        />
        <br />
        <TextField
          label={`Location`}
          value={location}
          onChange={handleChange}
          margin="normal"
          name="location"
          type="location"
          fullWidth={true}
        />
        <br />
        <TextField
          label={`Image`}
          value={image_url}
          onChange={handleChange}
          margin="normal"
          name="image_url"
          type=""
          fullWidth={true}
        />
        <br />
        <TextField
          label={`Category`}
          value={category}
          onChange={handleChange}
          margin="normal"
          name="category"
          type="category"
          fullWidth={true}
        />
        <br />
        <TextField
          label={`Condition`}
          value={condition}
          onChange={handleChange}
          margin="normal"
          name="condition"
          type="condition"
          fullWidth={true}
        />
        <br />
        <Button
          onClick={() => {
            handleSubmit(this.props.listingToEdit.id);
          }}
          variant="contained"
          color="primary"
        >
          EDIT
        </Button>
      </div>
    );
  }
}

export default EditForm;
