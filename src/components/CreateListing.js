import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBMedia } from "mdbreact";
import AppAPI from "../api/AppApi";
import styles from "../styles/CreateListing.module.css";

class CreateListing extends Component {
  state = {};

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    const listingDetails = {
      book: {
        title: this.state.title,
        genre: this.state.genre,
        author: this.state.author,
        description: this.state.description
      },
      listing: {
        location: this.state.location,
        image_url: this.state.image_url,
        category: this.state.category,
        condition: this.state.condition
      }
    };
    AppAPI.createListing(listingDetails)
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          this.props.updateStateOnCreate(data);
        }
      })
      .then(this.props.history.push("/"));
  };

  componentWillReceiveProps() {
    return this.props.selectedBook
      ? this.setState({
          title: this.props.selectedBook.volumeInfo.title,
          author: this.props.selectedBook.volumeInfo.authors[0],
          genre: this.props.selectedBook.volumeInfo.categories[0],
          description: this.props.selectedBook.volumeInfo.description,
          image_url: this.props.selectedBook.volumeInfo.imageLinks.thumbnail
        })
      : null;
  }

  render() {
    const {
      title,
      author,
      genre,
      description,
      location,
      image_url,
      category,
      condition
    } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <div className={styles.container} />
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p />
                <p className="h4 text-center mb-4">Create Listing</p>
                <label
                  htmlFor="defaultFormRegisterNameEx"
                  className="grey-text"
                >
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
                <label
                  htmlFor="defaultFormRegisterEmailEx"
                  className="grey-text"
                >
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
                <label
                  htmlFor="defaultFormRegisterConfirmEx"
                  className="grey-text"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="defaultFormRegisterConfirmEx"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                  name="description"
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
                  <MDBBtn color="unique" type="submit" onClick={handleSubmit}>
                    CREATE
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
            <MDBCol md="6">
              <p />
              <p className="h4 text-center mb-4">
                Image Preview
                <p />
                <MDBMedia className="mt-3" object src={image_url} alt="" />
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default withRouter(CreateListing);
