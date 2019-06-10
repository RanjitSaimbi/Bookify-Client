import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import AppAPI from "../api/AppApi";

class MyListings extends Component {
  componentDidMount() {
    AppAPI.fetchMyListings().then(resp => this.setState({ myListings: resp }));
  }

  handleClick = id => {
    AppAPI.destroyListing(id).then(data => {
      if (data.error) {
        console.log(data.error);
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

  state = {};
  render() {
    return (
      <div>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.myListings
                ? this.state.myListings.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.book.title}
                      </TableCell>
                      <TableCell align="right">
                        {row.book.authors.map(author => author.author)}
                      </TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.condition}</TableCell>
                      <TableCell align="right">
                        {new Date(row.created_at).toGMTString()}
                      </TableCell>
                      <TableCell align="right">
                        {row.open_listing
                          ? `Open`
                          : `Purchased by ${row.closed_listings.map(
                              purchaser => purchaser.purchaser.username
                            )}`}
                      </TableCell>
                      <DeleteIcon onClick={() => this.handleClick(row.id)} />
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default MyListings;
