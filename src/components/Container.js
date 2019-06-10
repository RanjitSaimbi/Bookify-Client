import React from "react";
import styles from "../styles/Container.module.css";
import CardMounter from "./CardMounter";

const Container = props => (
  <div className={styles.container}>
    <div />
    <h2>Search</h2>
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
