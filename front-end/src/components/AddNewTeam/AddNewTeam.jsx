import React from "react";
import { useState } from "react";
import styles from "./AddNewTeam.module.css";
import axios from "axios";
import ValidationAddTeam from "../Validation/ValidationAddTeam";

function AddNewTeam() {
  const [enteredNumeEchipa, setenteredNumeEchipa] = useState("");
  const [enteredFacultate, setenteredFacultate] = useState("");
  const [enteredSpecializareEchipa, setenteredSpecializareEchipa] =
    useState("");
  const [enteredDescriere, setenteredDescriere] = useState("");
  const [enteredContact, setenteredContact] = useState("");

  const [errors, setError] = useState({});

  const numeEchipaChangeHandler = (event) => {
    setenteredNumeEchipa(event.target.value);
  };
  const FacultateChangeHandler = (event) => {
    setenteredFacultate(event.target.value);
  };
  const SpecializareEchipaChangeHandler = (event) => {
    setenteredSpecializareEchipa(event.target.value);
  };
  const descriereEchipaChangeHandler = (event) => {
    setenteredDescriere(event.target.value);
  };
  const contactChangeHandler = (event) => {
    setenteredContact(event.target.value);
  };

  const AddTeam = (event) => {
    event.preventDefault();
    setError(
      ValidationAddTeam(
        enteredNumeEchipa,
        enteredFacultate,
        enteredSpecializareEchipa,
        enteredDescriere,
        enteredContact
      )
    );

    let errorsValidation = ValidationAddTeam(
      enteredNumeEchipa,
      enteredFacultate,
      enteredSpecializareEchipa,
      enteredDescriere,
      enteredContact
    );
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("VerficarePur");
    console.log(errorsValidation);
    if (Object.keys(errorsValidation).length === 0) {
      axios
        .post("http://localhost:8080/api/echipe", {
          E_UtilizatoriId: user.id,
          nume_echipa: enteredNumeEchipa,
          facultate_apartinatoare: enteredFacultate,
          specializare_echipa: enteredSpecializareEchipa,
          descriere: enteredDescriere,
          contact: enteredContact,
        })
        .then((res) => {
          console.log("Am adaugat echipa cu succes!");
        })
        .catch((err) => console.log(err));
      setenteredNumeEchipa("");
      setenteredFacultate("");
      setenteredSpecializareEchipa("");
      setenteredDescriere("");
      setenteredContact("");
    }
  };
  return (
    <div className={styles.formBox}>
      <form className={styles.form}>
        <div className={styles.control}>
          <label>Team name</label>
          <textarea
            type="text"
            value={enteredNumeEchipa}
            onChange={numeEchipaChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredNumeEchipa ? styles.error : ""
            }`}
          />
          {errors.enteredNumeEchipa && (
            <p style={{ color: "red" }}>{errors.enteredNumeEchipa}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Faculty</label>
          <textarea
            type="text"
            value={enteredFacultate}
            onChange={FacultateChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredFacultate ? styles.error : ""
            }`}
          />
          {errors.enteredFacultate && (
            <p style={{ color: "red" }}>{errors.enteredFacultate}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Specialization team</label>
          <textarea
            type="text"
            value={enteredSpecializareEchipa}
            onChange={SpecializareEchipaChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredSpecializareEchipa ? styles.error : ""
            }`}
          />
          {errors.enteredSpecializareEchipa && (
            <p style={{ color: "red" }}>{errors.enteredSpecializareEchipa}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Summary about team</label>
          <textarea
            type="text"
            value={enteredDescriere}
            onChange={descriereEchipaChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredDescriere ? styles.error : ""
            }`}
          />
          {errors.enteredDescriere && (
            <p style={{ color: "red" }}>{errors.enteredDescriere}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Contact</label>
          <textarea
            type="text"
            value={enteredContact}
            onChange={contactChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredContact ? styles.error : ""
            }`}
          />
          {errors.enteredContact && (
            <p style={{ color: "red" }}>{errors.enteredContact}</p>
          )}
        </div>
        <button className={styles.btn} type="submit" onClick={AddTeam}>
          Create team
        </button>
      </form>
    </div>
  );
}

export default AddNewTeam;
