import React from "react";
import Navbar from "./Navbar";
import styles from "../styles/Container.module.css";

function Container() {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
}

export default Container;
