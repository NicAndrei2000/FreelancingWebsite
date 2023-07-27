import React, { useState } from "react";
import styles from "./AddCompany.module.css";
import axios from "axios";
import ValidationAddCompany from "../Validation/ValidationAddCompany";
import closeIcon from "./../../assets/icons/close.svg";

function AddCompany() {
  const [enteredCompanyName, setenteredCompanyName] = useState("");
  const [enteredCompanyIdentifNumber, setenteredCompanyIdentifNumber] =
    useState("");
  const [enteredCompanyAccessCode, setenteredCompanyAccessCode] = useState("");
  const [enteredCompanyContact, setenteredCompanyContact] = useState("");
  const [enteredCompanyEmail, setenteredCompanyEmail] = useState("");
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [errors, setErrors] = useState({});

  const CompanyNameChangeHandler = (event) => {
    setenteredCompanyName(event.target.value);
  };
  const CompanyIdentifNbChangeHandler = (event) => {
    setenteredCompanyIdentifNumber(event.target.value);
  };
  const CompanyAccessCodeChangeHandler = (event) => {
    setenteredCompanyAccessCode(event.target.value);
  };
  const CompanyContactChangeHandler = (event) => {
    setenteredCompanyContact(event.target.value);
  };
  const CompanyEmailChangeHandler = (event) => {
    setenteredCompanyEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setErrors(
      ValidationAddCompany(
        enteredCompanyName,
        enteredCompanyIdentifNumber,
        enteredCompanyAccessCode,
        enteredCompanyContact,
        enteredCompanyEmail
      )
    );
    let errorsValidation = ValidationAddCompany(
      enteredCompanyName,
      enteredCompanyIdentifNumber,
      enteredCompanyAccessCode,
      enteredCompanyContact,
      enteredCompanyEmail
    );

    if (Object.keys(errorsValidation).length === 0) {
      axios
        .post("http://localhost:8080/api/clienti", {
          nume: enteredCompanyName,
          numarIdentificator: enteredCompanyIdentifNumber,
          codAcces: enteredCompanyAccessCode,
          contact: enteredCompanyContact,
          email: enteredCompanyEmail,
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.error("Error fetching addCompany:", err);
        });

      setenteredCompanyName("");
      setenteredCompanyEmail("");
      setenteredCompanyIdentifNumber("");
      setenteredCompanyContact("");
      setenteredCompanyAccessCode("");
    }
  };

  const addCompanyHandler = () => {
    // console.log(enteredCompanyName);
    // console.log(enteredCompanyEmail);
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
          Add company
        </button>
        <div className={styles.formBox}>
          <div className={styles.modalHeader}>
            <h2>Add Company</h2>
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
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Company Name"
                value={enteredCompanyName}
                onChange={CompanyNameChangeHandler}
                className={`${styles.input} ${
                  errors.enteredCompanyName ? styles.error : ""
                }`}
              />
              {errors.enteredCompanyName && (
                <p style={{ color: "red" }}>{errors.enteredCompanyName}</p>
              )}
            </div>
            <div className={styles.control}>
              <label>Identification number</label>
              <input
                type="text"
                placeholder="Identification number "
                value={enteredCompanyIdentifNumber}
                onChange={CompanyIdentifNbChangeHandler}
                className={`${styles.input} ${
                  errors.enteredCompanyIdentifNumber ? styles.error : ""
                }`}
              />
              {errors.enteredCompanyIdentifNumber && (
                <p style={{ color: "red" }}>
                  {errors.enteredCompanyIdentifNumber}
                </p>
              )}
            </div>
            <div className={styles.control}>
              <label>Access code</label>
              <input
                type="text"
                placeholder="Access code "
                value={enteredCompanyAccessCode}
                onChange={CompanyAccessCodeChangeHandler}
                className={`${styles.input} ${
                  errors.enteredCompanyAccessCode ? styles.error : ""
                }`}
              />
              {errors.enteredCompanyAccessCode && (
                <p style={{ color: "red" }}>
                  {errors.enteredCompanyAccessCode}
                </p>
              )}
            </div>
            <div className={styles.control}>
              <label>Contact</label>
              <input
                type="text"
                placeholder="Phone number "
                value={enteredCompanyContact}
                onChange={CompanyContactChangeHandler}
                className={`${styles.input} ${
                  errors.enteredCompanyContact ? styles.error : ""
                }`}
              />
              {errors.enteredCompanyContact && (
                <p style={{ color: "red" }}>{errors.enteredCompanyContact}</p>
              )}
            </div>
            <div className={styles.control}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Email "
                value={enteredCompanyEmail}
                onChange={CompanyEmailChangeHandler}
                className={`${styles.input} ${
                  errors.enteredCompanyEmail ? styles.error : ""
                }`}
              />
              {errors.enteredCompanyEmail && (
                <p style={{ color: "red" }}>{errors.enteredCompanyEmail}</p>
              )}
            </div>
            <button
              className={styles.addButtonPost}
              type="submit"
              onClick={addCompanyHandler}
            >
              Add Company
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
        Add company
      </button>
    );
  }
}

export default AddCompany;
