import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NavbarNavigation from "./NavbarNavigation";

function Navbar(props) {
  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>Freelancing App</h1>
      <NavbarNavigation
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
    </div>
  );
}

export default Navbar;
