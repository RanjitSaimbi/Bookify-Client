import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Container.module.css";
import CardMounter from "./CardMounter";

const Container = props => (
  <div className={styles.container}>
    <div />
    <div>
      <h2>Search</h2>
      <Link to="/listing/create">
        <h5>List Book </h5>
      </Link>
    </div>
    <div className={styles.nested}>
      {" "}
      {props.listings
        ? props.listings.map(listing => (
            <CardMounter key={listing.id} listing={listing} />
          ))
        : null}
    </div>
  </div>
);

export default Container;
