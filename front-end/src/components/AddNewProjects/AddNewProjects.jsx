import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./AddNewProjects.module.css";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import { defaultImg } from "../../data/projectsDefaultImage";
import ValidationAddProject from "../Validation/ValidationAddProject";

function AddNewProjects(props) {
  const [enteredNumeProiect, setenteredNumeProiect] = useState("");
  const [enteredDetaliiCompanie, setenteredDetaliiCompanie] = useState("");
  const [enteredRezumatProiect, setenteredRezumatProiect] = useState("");
  const [enteredDescriereProiectDetaliat, setenteredDescriereProiectDetaliat] =
    useState("");
  const [enteredTipuriTehnologii, setenteredTipuriTehnologii] = useState("");
  const [enteredTermenLimitaProiect, setenteredTermenLimitaProiect] =
    useState("");
  const [enteredComunicareProiect, setenteredComunicareProiect] = useState("");
  const [enteredExperientaEchipa, setenteredExperientaEchipa] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [errors, setErrors] = useState({});
  console.log("VerificarePurcelusi");
  console.log(selectedCategory);

  const [succes, setSucces] = useState();

  const numeProiectChangeHandler = (event) => {
    setenteredNumeProiect(event.target.value);
  };
  const detaliiCompanieChangeHandler = (event) => {
    setenteredDetaliiCompanie(event.target.value);
  };
  const rezumatProiectChangeHandler = (event) => {
    setenteredRezumatProiect(event.target.value);
  };
  const descriereProiectDetaliatChangeHandler = (event) => {
    setenteredDescriereProiectDetaliat(event.target.value);
  };
  const tipuriTehnologiiChangeHandler = (event) => {
    setenteredTipuriTehnologii(event.target.value);
  };
  const termenLimitaProiectChangeHandler = (event) => {
    setenteredTermenLimitaProiect(event.target.value);
  };
  const comunicareProiectChangeHandler = (event) => {
    setenteredComunicareProiect(event.target.value);
  };
  const experientaEchipaChangeHandler = (event) => {
    setenteredExperientaEchipa(event.target.value);
  };
  const selectedCategotyHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const imagineFundalChangeHandler = (event) => {
    setSelectedImage(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  // const addProject = (event) => {
  //   event.preventDefault();

  //   // Create a new FileReader instance
  //   const reader = new FileReader();

  //   // When the reader loads the file, convert it to a binary buffer and send it to the API
  //   reader.onload = () => {
  //     const imageBuffer = reader.result;
  //     axios
  //       .post("http://localhost:8080/api/proiecte", {
  //         UtilizatoriId: 1,
  //         numeProiect: enteredNumeProiect,
  //         detaliiCompanie: enteredDetaliiCompanie,
  //         rezumatProiect: enteredRezumatProiect,
  //         descriereProiectDetaliat: enteredDescriereProiectDetaliat,
  //         tipuriTehnologii: enteredTipuriTehnologii,
  //         termenLimitaProiect: enteredTermenLimitaProiect,
  //         comunicareProiect: enteredComunicareProiect,
  //         experientaEchipa: enteredExperientaEchipa,
  //         categorieProiect: selectedCategory,
  //         imagineFundal: imageBuffer // Pass the binary buffer to the API request body

  const addProject = (event) => {
    event.preventDefault();
    setErrors(
      ValidationAddProject(
        enteredNumeProiect,
        enteredDetaliiCompanie,
        enteredRezumatProiect,
        enteredDescriereProiectDetaliat,
        enteredTipuriTehnologii,
        enteredTermenLimitaProiect,
        enteredComunicareProiect,
        enteredExperientaEchipa,
        selectedCategory,
        selectedImage
      )
    );
    let errorsValidation = ValidationAddProject(
      enteredNumeProiect,
      enteredDetaliiCompanie,
      enteredRezumatProiect,
      enteredDescriereProiectDetaliat,
      enteredTipuriTehnologii,
      enteredTermenLimitaProiect,
      enteredComunicareProiect,
      enteredExperientaEchipa,
      selectedCategory,
      selectedImage
    );

    if (Object.keys(errorsValidation).length === 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      let formData = new FormData();
      formData.append("UtilizatoriId", user.id);
      formData.append("numeProiect", enteredNumeProiect);
      formData.append("detaliiCompanie", enteredDetaliiCompanie);
      formData.append("rezumatProiect", enteredRezumatProiect);
      formData.append(
        "descriereProiectDetaliat",
        enteredDescriereProiectDetaliat
      );
      formData.append("tipuriTehnologii", enteredTipuriTehnologii);
      formData.append("termenLimitaProiect", enteredTermenLimitaProiect);
      formData.append("comunicareProiect", enteredComunicareProiect);
      formData.append("experientaEchipa", enteredExperientaEchipa);
      formData.append("categorieProiect", selectedCategory);
      formData.append("imagineFundal", selectedImage);
      formData.append("esteAles", "NU");
      formData.append("rezultatGit", "No result yet!");
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post("http://localhost:8080/api/proiecte", formData, config)
        .then((res) => {
          console.log(res);
          console.log(selectedImage);
        })
        .catch((err) => console.log(err));
      setenteredNumeProiect("");
      setenteredDetaliiCompanie("");
      setenteredRezumatProiect("");
      setenteredDescriereProiectDetaliat("");
      setenteredTipuriTehnologii("");
      setenteredTermenLimitaProiect("");
      setenteredComunicareProiect("");
      setenteredExperientaEchipa("");
      setenteredExperientaEchipa("");
      setSelectedImage(defaultImg);
    }
  };

  return (
    <div className={styles.formBox}>
      <form
        className={styles.form}
        action="/proiecte"
        method="post"
        encType="multipart/form-data"
      >
        <div className={styles.inputControl}>
          <label>Project name</label>
          <input
            type="text"
            value={enteredNumeProiect}
            onChange={numeProiectChangeHandler}
            className={`${styles.input} ${
              errors.enteredNumeProiect ? styles.error : ""
            }`}
          />
          {errors.enteredNumeProiect && (
            <p style={{ color: "red" }}>{errors.enteredNumeProiect}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>About company</label>
          <textarea
            type="text"
            value={enteredDetaliiCompanie}
            onChange={detaliiCompanieChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredDetaliiCompanie ? styles.error : ""
            }`}
          />
          {errors.enteredDetaliiCompanie && (
            <p style={{ color: "red" }}>{errors.enteredDetaliiCompanie}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Project brief</label>
          <textarea
            type="text"
            value={enteredRezumatProiect}
            onChange={rezumatProiectChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredRezumatProiect ? styles.error : ""
            }`}
          />
          {errors.enteredRezumatProiect && (
            <p style={{ color: "red" }}>{errors.enteredRezumatProiect}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Detailed project description</label>
          <textarea
            type="text"
            value={enteredDescriereProiectDetaliat}
            onChange={descriereProiectDetaliatChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredDescriereProiectDetaliat ? styles.error : ""
            }`}
          />
          {errors.enteredDescriereProiectDetaliat && (
            <p style={{ color: "red" }}>
              {errors.enteredDescriereProiectDetaliat}
            </p>
          )}
        </div>
        <div className={styles.control}>
          <label>Type of technologies prefered</label>
          <textarea
            type="text"
            value={enteredTipuriTehnologii}
            onChange={tipuriTehnologiiChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredTipuriTehnologii ? styles.error : ""
            }`}
          />
          {errors.enteredTipuriTehnologii && (
            <p style={{ color: "red" }}>{errors.enteredTipuriTehnologii}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Project's deadline</label>
          <textarea
            type="text"
            value={enteredTermenLimitaProiect}
            onChange={termenLimitaProiectChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredTermenLimitaProiect ? styles.error : ""
            }`}
          />
          {errors.enteredTermenLimitaProiect && (
            <p style={{ color: "red" }}>{errors.enteredTermenLimitaProiect}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Project communication</label>
          <textarea
            type="text"
            value={enteredComunicareProiect}
            onChange={comunicareProiectChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredComunicareProiect ? styles.error : ""
            }`}
          />
          {errors.enteredComunicareProiect && (
            <p style={{ color: "red" }}>{errors.enteredComunicareProiect}</p>
          )}
        </div>
        <div className={styles.control}>
          <label>Team's experience</label>
          <textarea
            type="text"
            value={enteredExperientaEchipa}
            onChange={experientaEchipaChangeHandler}
            className={`${styles.textarea} ${
              errors.enteredExperientaEchipa ? styles.error : ""
            }`}
          />
          {errors.enteredExperientaEchipa && (
            <p style={{ color: "red" }}>{errors.enteredExperientaEchipa}</p>
          )}
        </div>
        <div  className={`${styles.spinner} ${
              errors.selectedCategory ? styles.error : ""
            }`} style={{ display: 'inline-block', borderRadius:'10px'}}>
          <Spinner
            sentCategoriesToSpinner={props.sendCategories}
            saveSelectedCategory={selectedCategotyHandler}
          />
        </div>

        {errors.selectedCategory && (
          <p style={{ color: "red" }}>{errors.selectedCategory}</p>
        )}
        <div className={styles.addImage}>
          <input
            type="file"
            onChange={imagineFundalChangeHandler}
            name="imagineFundal"
            className={`${styles.buttonSelectFile} ${
              errors.selectedImage ? styles.error : ""
            }`}
          />
          {errors.selectedImage && (
            <p style={{ color: "red" }}>{errors.selectedImage}</p>
          )}
          {/* <button onClick={uploadHandler}>Upload Image</button> */}
        </div>

        <button className={styles.btn} type="submit" onClick={addProject}>
          Add Project
        </button>
      </form>
    </div>
  );
}

export default AddNewProjects;
