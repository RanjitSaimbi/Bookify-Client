import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AppAPI from "../api/AppApi";
import UserAPI from "../api/UserApi";
import Container from "./Container";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import MyListings from "./MyListings";
import CreateListing from "../components/CreateListing";

class App extends Component {
  state = { listings: [], myListings: [] };

  signin = (username, token) => {
    localStorage.setItem("token", token);
    this.setState({ username });
    AppAPI.fetchMyListings().then(resp => this.setState({ myListings: resp }));
    this.props.history.push("/");
  };

  filterOutMylistings = listings => {
    const filteredListings = listings.filter(listing => {
      return listing.user.username !== this.state.username;
    });
    this.setState({ listings: filteredListings });
  };

  signout = () => {
    this.setState({ username: "", myListings: [] });
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  deleteListing = id => {
    AppAPI.destroyListing(id).then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        this.setState({
          ...this.state,
          myListings: this.state.myListings.filter(listing => {
            return listing.id !== id;
          })
        });

        this.setState({
          ...this.state,
          listings: this.state.listings.filter(listing => {
            return listing.id !== id;
          })
        });
      }
    });
  };

  updateStateOnCreate = createdListing => {
    const updatedListings = [...this.state.listings, createdListing];
    const myUpdatedListings = [...this.state.myListings, createdListing];
    this.setState({ listings: updatedListings, myListings: myUpdatedListings });
  };

  editListing = listingDetails => {
    AppAPI.editListing(listingDetails).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        const myListings = this.state.myListings.map(listing =>
          listing.id === data.id ? data : listing
        );
        this.setState({ myListings });
      }
    });
  };

  componentDidMount() {
    AppAPI.fetchListings().then(resp => this.filterOutMylistings(resp));
    UserAPI.validate().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.signin(data.username, localStorage.getItem("token"));
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar signout={this.signout} username={this.state.username} />
        <Switch>
          <Route
            exact
            path="/"
            component={props => (
              <Container listings={this.state.listings}> </Container>
            )}
          />
          <Route
            exact
            path="/listing/create"
            component={props => (
              <CreateListing
                {...props}
                updateStateOnCreate={this.updateStateOnCreate}
              />
            )}
          />
          <Route
            exact
            path="/listing/:id"
            component={props => <h1>INDIVIDUAL LISTING</h1>}
          />
          <Route
            exact
            path="/mylistings"
            component={props => (
              <MyListings
                {...props}
                myListings={this.state.myListings}
                deleteListing={this.deleteListing}
                editListing={this.editListing}
              />
            )}
          />
          <Route exact path="/about" component={props => <h1>ABOUT</h1>} />
          <Route
            exact
            path="/signup"
            component={props => (
              <SignUp {...props} signin={this.signin}>
                {" "}
              </SignUp>
            )}
          />
          <Route component={props => <h1>404 - Not Found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
