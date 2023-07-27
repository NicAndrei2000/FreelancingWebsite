import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

function Login(props) {
  const [enteredUsername, setenteredUsername] = useState("");
  const [enteredPassword, setenteredPassword] = useState("");
  const { login } = useContext(UserContext);

  const usernameChangeHandler = (event) => {
    setenteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setenteredPassword(event.target.value);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    // login();
    const dataUser = {
      userName: enteredUsername,
      userPassword: enteredPassword,
    };
    props.doLogin(dataUser);
  };

  return (
    <div className={styles.login}>
      <form>
        <div className={styles.control}>
          <label>Username</label>
          <input
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.btn} onClick={loginHandler}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
