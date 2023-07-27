import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import styles from "./NavbarNavigation.module.css";

function NavbarNavigation(props) {
  const { user } = useContext(UserContext);
  const [isProjectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setTeamDropdownOpen] = useState(false);

  const userLS = JSON.parse(localStorage.getItem("user"));
  const toggleProjectsDropdown = () => {
    setProjectsDropdownOpen(!isProjectsDropdownOpen);
  };

  const toggleTeamDropdown = () => {
    setTeamDropdownOpen(!isTeamDropdownOpen);
  };

  return (
    <nav className={styles.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <Link to={"/Home"}>
              <p>Home</p>
            </Link>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Link to={"/Institutions"}>
              <p>Institutions</p>
            </Link>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Link to={"/Companies"}>
              <p>Companies</p>
            </Link>
          </li>
        )}
        {props.isLoggedIn && (
          <li className={styles.dropdown}>
            <a
              href="#"
              onClick={toggleProjectsDropdown}
              className={styles.mask}
            >
              Projects
            </a>
            {isProjectsDropdownOpen && (
              <div className={styles.dropdownContent}>
                {(userLS.tipUtilizator === "Client" ||
                  userLS.tipUtilizator === "Admin") && (
                  <Link to={"/AddProjects"}>Add Project</Link>
                )}
                {/* <a href="/">Ongoing Projects</a> */}
                {<Link to={"/MyProjects"}>My Projects</Link>}
                <Link to={"/ProjectsCategory"}>Projects</Link>
              </div>
            )}
          </li>
        )}
        {props.isLoggedIn &&
          (userLS.tipUtilizator === "Student" ||
            userLS.tipUtilizator === "Profesor" ||
            userLS.tipUtilizator === "Admin") && (
            <li className={styles.dropdown}>
              <a href="#" onClick={toggleTeamDropdown} className={styles.mask}>
                Team
              </a>
              {isTeamDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {props.isLoggedIn &&
                    (userLS.tipUtilizator === "Student" ||
                      userLS.tipUtilizator === "Admin") && (
                      <Link to={"/JoinTeam"}>Join Team</Link>
                    )}
                  {props.isLoggedIn &&
                    (userLS.tipUtilizator === "Profesor" ||
                      userLS.tipUtilizator === "Admin") && (
                      <Link to={"/AddTeam"}>Add Team</Link>
                    )}
                  {props.isLoggedIn &&
                    (userLS.tipUtilizator === "Profesor" ||
                      userLS.tipUtilizator === "Admin" || userLS.tipUtilizator === "Student") && (
                      <Link to={"/MyTeam"}>My Team</Link>
                    )}
                </div>
              )}
            </li>
          )}
        {props.isLoggedIn && (
          <li>
            <Link to={"/TopTeam"}>
              <p> Top Team</p>
            </Link>
          </li>
        )}
         {props.isLoggedIn && (
          <li>
            <Link to={"/MyProfile"}>
              <p>My Profile</p>
            </Link>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Link to={"/"}>
              <button onClick={props.onLogout}>Logout</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavbarNavigation;
