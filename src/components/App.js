import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AppAPI from "../api/AppApi";
import UserAPI from "../api/UserApi";
import Container from "./Container";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import MyListings from "./MyListings";

import IndividualListing from "./IndividualListing";
import MessagePage from "./MessagePage";
import CreateListingContainer from "./CreateListingContainer";

class App extends Component {
  state = { listings: [], myListings: [], myMessages: [] };

  signin = (username, token) => {
    localStorage.setItem("token", token);
    this.setState({ username });
    AppAPI.fetchMyListings().then(resp => this.setState({ myListings: resp }));
    AppAPI.fetchListings().then(resp => this.filterOutMylistings(resp));
    UserAPI.getSenderRecipientMessages().then(data =>
      this.setState({ myMessages: data })
    );
  };

  filterOutMylistings = listings => {
    const filteredListings = listings.filter(listing => {
      return listing.user.username !== this.state.username;
    });
    this.setState({ listings: filteredListings });
  };

  signout = () => {
    this.setState({ username: "", myListings: [], myMessages: [] });
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
    const myUpdatedListings = [...this.state.myListings, createdListing];
    this.setState({ myListings: myUpdatedListings });
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

  sendMessage = message => {
    return UserAPI.sendMessage(message).then(resp => {
      let messageForState = resp.message;
      let key = resp.message.book.id;
      let arrayforState = [
        ...this.state.myMessages[resp.message.book.id],
        messageForState
      ];

      this.setState({
        myMessages: { ...this.state.myMessages, [key]: arrayforState }
      });
    });
  };

  sendFirstMessage = message => {
    return UserAPI.sendMessage(message).then(resp => {
      let messageForState = resp.message;
      let key = resp.message.book.id;

      this.setState({
        myMessages: { ...this.state.myMessages, [key]: [messageForState] }
      });
    });
  };

  componentDidMount() {
    if (!this.state.username) {
      AppAPI.fetchListings().then(resp => this.setState({ listings: resp }));
    }

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
              <Container
                listings={this.state.listings}
                username={this.state.username}
              >
                {" "}
              </Container>
            )}
          />
          <Route
            exact
            path="/listing/create"
            component={props => (
              <CreateListingContainer
                {...props}
                updateStateOnCreate={this.updateStateOnCreate}
              />
            )}
          />
          <Route
            exact
            path="/messages"
            component={props => (
              <MessagePage
                myMessages={this.state.myMessages}
                username={this.state.username}
                sendMessage={this.sendMessage}
              />
            )}
          />
          <Route
            exact
            path="/listing/:id"
            component={props => {
              const id = parseInt(props.match.params.id);
              const listing = this.state.listings.find(
                listing => listing.id === id
              );
              if (this.state.listings.length === 0) return <h1>Loading...</h1>;
              if (this.state.listings > 0 && listing === undefined)
                return <h1>Listing Not found</h1>;
              return (
                <IndividualListing
                  listing={listing}
                  username={this.state.username}
                  {...props}
                  sendMessage={this.sendFirstMessage}
                />
              );
            }}
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
              <SignUp
                {...props}
                signin={this.signin}
                filterOutMylistings={this.filterOutMylistings}
              >
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
