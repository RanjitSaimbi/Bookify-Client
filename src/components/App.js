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
  };

  signout = () => {
    this.setState({ username: "" });
    localStorage.removeItem("token");
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
      }
    });
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
    AppAPI.fetchMyListings().then(resp => this.setState({ myListings: resp }));
    AppAPI.fetchListings().then(resp => this.setState({ listings: resp }));
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
            component={props => <CreateListing />}
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
