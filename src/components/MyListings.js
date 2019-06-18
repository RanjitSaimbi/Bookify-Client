import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditForm from "./EditForm";
import styles from "../styles/MyListing.module.css";

class MyListings extends Component {
  handleClick = id => {
    this.props.deleteListing(id);
  };

  handleEdit = id => {
    this.setState({ hideTable: !this.state.hideTable });
    const selectedListingToEdit = this.props.myListings.filter(listing => {
      return listing.id === id;
    });
    this.setState({ selectedListingToEdit });
  };

  state = { hideTable: false, selectedListingToEdit: null };
  render() {
    return (
      <div>
        <div className={styles.container} />
        {this.state.hideTable ? (
          <EditForm
            listingToEdit={this.state.selectedListingToEdit[0]}
            editListing={this.props.editListing}
          />
        ) : (
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Author</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Condition</TableCell>
                  <TableCell align="right">Created</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Delete / Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.myListings.length > 0
                  ? this.props.myListings.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.book.title}
                        </TableCell>
                        <TableCell align="right">{row.book.author}</TableCell>
                        <TableCell align="right">{row.category}</TableCell>
                        <TableCell align="right">{row.condition}</TableCell>
                        <TableCell align="right">
                          {new Date(row.created_at).toGMTString()}
                        </TableCell>
                        <TableCell align="right">
                          {row.open_listing ? `Open` : `Closed Listing`}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            onClick={() => this.handleClick(row.id)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            onClick={() => {
                              this.handleEdit(row.id);
                            }}
                            size="small"
                          >
                            EDIT
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
        )}
      </div>
    );
  }
}

export default MyListings;
