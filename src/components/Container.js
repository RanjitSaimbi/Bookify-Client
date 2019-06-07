import React from "react";
import styles from "../styles/Container.module.css";
import Navbar from "./Navbar";

const Container = () => (
  <div className={styles.container}>
    <Navbar />
  </div>
);

export default Container;
