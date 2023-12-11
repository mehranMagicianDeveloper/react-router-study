import React from "react";
import styles from "./Vans.module.css";
import axios from "axios";

const Vans = () => {
  const fetchingVans = async () => {
    const resp = axios.get("/api/vans");
  };

  return (
    <div>
      <h1 className={styles.title}>Vans Page</h1>
    </div>
  );
};

export default Vans;
