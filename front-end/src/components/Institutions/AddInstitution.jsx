import React, { useState } from "react";
import styles from "./AddInstitution.module.css";
import axios from "axios";
import closeIcon from "./../../assets/icons/close.svg";
import ValidationAddInstitution from "../Validation/ValidationAddInstitution";

function AddInstitution(props) {
  const [enteredInstitutionName, setenteredInstitutionName] = useState("");
  const [enteredInstitutionEmail, setenteredInstitutionEmail] = useState("");
  const [enteredInstitutionIdentifNumber, setenteredInstitutionIdentifNumber] =
    useState("");
  const [enteredInstitutionAccessCode, setenteredInstitutionAccessCode] =
    useState("");
  const [enteredInstitutionContact, setenteredInstitutionContact] =
    useState("");
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [errors, setErrors] = useState({});

  const InstitutionNameChangeHandler = (event) => {
    setenteredInstitutionName(event.target.value);
  };
  const InstitutionEmailChangeHandler = (event) => {
    setenteredInstitutionEmail(event.target.value);
  };
  const InstitutionIdentifNbChangeHandler = (event) => {
    setenteredInstitutionIdentifNumber(event.target.value);
  };
  const InstitutionAccessCodeChangeHandler = (event) => {
    setenteredInstitutionAccessCode(event.target.value);
  };
  const InstitutionContactChangeHandler = (event) => {
    setenteredInstitutionContact(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setErrors(
      ValidationAddInstitution(
        enteredInstitutionName,
        enteredInstitutionEmail,
        enteredInstitutionIdentifNumber,
        enteredInstitutionAccessCode,
        enteredInstitutionContact
      )
    );
    let errorsValidation = ValidationAddInstitution(
      enteredInstitutionName,
      enteredInstitutionEmail,
      enteredInstitutionIdentifNumber,
      enteredInstitutionAccessCode,
      enteredInstitutionContact
    );

    if (Object.keys(errorsValidation).length === 0) {
      axios
        .post("http://localhost:8080/api/facultati", {
          nume: enteredInstitutionName,
          numarIdentificator: enteredInstitutionIdentifNumber,
          codAcces: enteredInstitutionAccessCode,
          contact: enteredInstitutionContact,
          email: enteredInstitutionEmail,
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.error("Error institution", err);
        });
      setenteredInstitutionEmail("");
      setenteredInstitutionName("");
      setenteredInstitutionIdentifNumber("");
      setenteredInstitutionAccessCode("");
      setenteredInstitutionContact("");
    }
  };

  if (isFormOpened)
    return (
      <>
        <button
          className={styles.addButton}
          onClick={() => {
            setIsFormOpened(!isFormOpened);
          }}
        >
          Add institution
        </button>

        <div className={styles.formBox}>
          <div className={styles.modalHeader}>
            <h2>Add Institution</h2>
            <img
              src={closeIcon}
              alt=""
              onClick={() => {
                setIsFormOpened(!isFormOpened);
              }}
            />
          </div>
          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.control}>
              <label>Institution Name</label>
              <input
                type="text"
                placeholder="Institution Name"
                value={enteredInstitutionName}
                onChange={InstitutionNameChangeHandler}
                className={`${styles.input} ${
                  errors.enteredInstitutionName ? styles.error : ""
                }`}
              />
              {errors.enteredInstitutionName && (
            <p style={{ color: "red" }}>{errors.enteredInstitutionName}</p>
          )}
            </div>
            <div className={styles.control}>
              <label>Identification number</label>
              <input
                type="text"
                placeholder="Identification number"
                value={enteredInstitutionIdentifNumber}
                onChange={InstitutionIdentifNbChangeHandler}
                className={`${styles.input} ${
                  errors.enteredInstitutionIdentifNumber ? styles.error : ""
                }`}
              />
              {errors.enteredInstitutionIdentifNumber && (
            <p style={{ color: "red" }}>{errors.enteredInstitutionIdentifNumber}</p>
          )}
            </div>
            <div className={styles.control}>
              <label>Access code</label>
              <input
                type="text"
                placeholder="Access code"
                value={enteredInstitutionAccessCode}
                onChange={InstitutionAccessCodeChangeHandler}
                className={`${styles.input} ${
                  errors.enteredInstitutionAccessCode ? styles.error : ""
                }`}
              />
              {errors.enteredInstitutionAccessCode && (
            <p style={{ color: "red" }}>{errors.enteredInstitutionAccessCode}</p>
          )}
            </div>
            <div className={styles.control}>
              <label>Contact</label>
              <input
                type="text"
                placeholder="Contact"
                value={enteredInstitutionContact}
                onChange={InstitutionContactChangeHandler}
                className={`${styles.input} ${
                  errors.enteredInstitutionContact ? styles.error : ""
                }`}
              />
              {errors.enteredInstitutionContact && (
            <p style={{ color: "red" }}>{errors.enteredInstitutionContact}</p>
          )}
            </div>
            <div className={styles.control}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                value={enteredInstitutionEmail}
                onChange={InstitutionEmailChangeHandler}
                className={`${styles.input} ${
                  errors.enteredInstitutionEmail ? styles.error : ""
                }`}
              />
            </div>
            {errors.enteredInstitutionEmail && (
            <p style={{ color: "red" }}>{errors.enteredInstitutionEmail}</p>
          )}
            <button className={styles.addButtonPost} type="submit">
              Add Institution
            </button>
          </form>
        </div>
      </>
    );
  else {
    return (
      <button
        className={styles.addButton}
        onClick={() => {
          setIsFormOpened(!isFormOpened);
        }}
      >
        Add Institution
      </button>
    );
  }
}

export default AddInstitution;
