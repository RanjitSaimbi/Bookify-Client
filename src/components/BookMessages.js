import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

class BookMessages extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const classes = {
      root: {
        width: "100%"
      },
      heading: {
        flexBasis: "33.33%",
        flexShrink: 0
      }
    };

    return (
      <div className={classes.root}>
        <Collapse in={this.props.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.bookMessages
              ? this.props.bookMessages.map(bookMessage => {
                  return (
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText
                        primary={`From ${bookMessage.sender.username} to ${
                          bookMessage.recipient.username
                        } at ${bookMessage.created_at}`}
                      />
                      <p>{bookMessage.body}</p>
                    </ListItem>
                  );
                })
              : null}
          </List>
        </Collapse>
      </div>
    );
  }
}

export default BookMessages;
