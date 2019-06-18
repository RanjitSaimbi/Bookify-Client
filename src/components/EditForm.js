import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBMedia } from "mdbreact";

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
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p />
              <p className="h4 text-center mb-4">Edit Listing</p>
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Title
              </label>
              <input
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                value={title}
                onChange={handleChange}
                name="title"
              />
              <br />
              <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                Author
              </label>
              <input
                type="text"
                id="defaultFormRegisterEmailEx"
                className="form-control"
                value={author}
                onChange={handleChange}
                name="author"
              />
              <br />
              <label
                htmlFor="defaultFormRegisterConfirmEx"
                className="grey-text"
              >
                Genre
              </label>
              <input
                type="text"
                id="defaultFormRegisterConfirmEx"
                className="form-control"
                value={genre}
                onChange={handleChange}
                name="genre"
              />
              <br />
              <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
              >
                Location
              </label>
              <input
                type="text"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                value={location}
                onChange={handleChange}
                name="location"
              />
              <br />
              <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
              >
                Image
              </label>
              <input
                type="text"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                value={image_url}
                onChange={handleChange}
                name="image_url"
              />
              <br />
              <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
              >
                Category
              </label>
              <input
                type="text"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                value={category}
                onChange={handleChange}
                name="category"
              />
              <br />
              <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
              >
                Condition
              </label>
              <input
                type="text"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
                value={condition}
                onChange={handleChange}
                name="condition"
              />
              <div className="text-center mt-4">
                <MDBBtn
                  color="unique"
                  type="submit"
                  onClick={() => {
                    handleSubmit(this.props.listingToEdit.id);
                  }}
                >
                  EDIT
                </MDBBtn>
                <MDBBtn
                  color="unique"
                  type="submit"
                  onClick={this.props.goBack}
                >
                  GO BACK
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
          <MDBCol md="2">
            <p />
            <p className="h4 text-center mb-4">Image Preview</p>

            <MDBMedia>
              {" "}
              <MDBMedia object src={image_url} alt="" />
            </MDBMedia>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default EditForm;
