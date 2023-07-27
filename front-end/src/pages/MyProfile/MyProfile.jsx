import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import axios from "axios";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    const userLS = localStorage.getItem("user");
    const userLSParse = JSON.parse(userLS);

    axios
      .get(`http://localhost:8080/api/utilizatori/${userLSParse.id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("Aici");
  console.log(user);

  const saveModify = () => {
    let modifications = {};

    if (lastName.length) {
      modifications.nume = lastName;
    }
    if (firstName.length) {
      modifications.prenume = firstName;
    }
    if (email.length) {
      modifications.email = email;
    }
    if (phoneNo.length) {
      modifications.nrTelefon = phoneNo;
    }

    axios
      .put(`http://localhost:8080/api/utilizatori/${user.id}`, {
        ...user,
        ...modifications,
      })
      .then((resp) => {
        console.log(resp);
        window.location.href = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {user !== null ? (
        <>
          <div className={styles.title}>
            <h1 className={styles.titleName}>
              Hi {user.nume} {user.prenume}, below you can see details about
              your account.
            </h1>
            <div className={styles.page}>
              <div
                className={styles.btn}
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Edit Profile
              </div>

              <div className={styles.contentPage}>
                <h1>Last Name</h1>
                <p className={styles.parag}>{user.nume}</p>
                <h1>First Name</h1>
                <p className={styles.parag}>{user.prenume}</p>
                <h1>Email</h1>
                <p className={styles.parag}>{user.email}</p>
                <h1>Phone number</h1>
                <p className={styles.parag}>{user.nrTelefon}</p>
                <h1>User type</h1>
                <p className={styles.parag}>{user.tipUtilizator}</p>
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className={styles.modal}>
              <h1>Last Name</h1>
              <input
                type="text"
                className={styles.parag2}
                placeholder={user.nume}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></input>
              <h1>First Name</h1>
              <input
                type="text"
                className={styles.parag2}
                placeholder={user.prenume}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></input>
              <h1>Email</h1>
              <input
                type="text"
                className={styles.parag2}
                placeholder={user.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <h1>Phone number</h1>
              <input
                type="text"
                className={styles.parag2}
                placeholder={user.nrTelefon}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
              ></input>

              <div className={styles.modal_btns}>
                <div
                  className={styles.btn}
                  onClick={() => {
                    saveModify();
                  }}
                >
                  Save
                </div>
                <div
                  className={styles.btn}
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : null}
    </>
  );
}

export default MyProfile;
