import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const classes = {
  card: {
    // maxWidth: 345,
    // maxHeight: 500
  }
};

class CardMounter extends Component {
  state = {};
  render() {
    return (
      <Link to={`/listing/${this.props.listing.id}`}>
        <Card style={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="auto"
              width="100%"
              image={this.props.listing.image_url}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="h7">
                {this.props.listing.book.title}
                <Typography>by {this.props.listing.book.author}</Typography>
              </Typography>
              <Button size="small" color="primary">
                {this.props.listing.location},{" "}
                {this.props.listing.user.username}
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    );
  }
}

export default CardMounter;
