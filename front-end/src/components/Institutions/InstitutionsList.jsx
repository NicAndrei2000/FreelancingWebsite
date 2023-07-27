import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./InstitutionsList.module.css";
import InstitutionsItem from "./InstitutionsItem";

function InstitutionsList() {
  const [institutions, setInstitutions] = useState(null);
  let institutionsContent = <p>No institutions found.</p>;

  const deleteInstitutionItemHandler = (institution) => {
    const updateInstitution = institutions.filter(
      (inst) => inst.id !== institution.id
    );
    setInstitutions(updateInstitution);
    axios
      .delete(`http://localhost:8080/api/facultati/${institution.id}`)
      .then((res) => {
        console.log("Delete institution success!");
      })
      .catch((err) => {
        console.error("Error deleteInstitution:", err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/facultati")
      .then((res) => setInstitutions(res.data))
      .catch((err) => {
        console.error("Error getInstitution:", err);
      });
  }, []);

  return (
    <>
      <div className={styles.table}>
        <div className={styles.tableName}>
          <div className={styles.tableCell}>Institution Name</div>
          <div className={styles.tableCell}>Identification number</div>
          <div className={styles.tableCell}>Access code</div>
          <div className={styles.tableCell}>Contact</div>
          <div className={styles.tableCell}>Email</div>
          <div className={styles.tableCell}>Actions</div>
        </div>

        {institutions !== null ? (
          (institutionsContent = institutions.map((institution) => (
            <InstitutionsItem
              key={institution.id}
              id={institution.id}
              institutionName={institution.nume}
              institutionEmail={institution.email}
              identifNumber={institution.numarIdentificator}
              accessCode={institution.codAcces}
              contact={institution.contact}
              onDeleteInstitutionItem={deleteInstitutionItemHandler}
            />
          )))
        ) : (
          <h2 className={styles.titleForNoInstitution}>
            Found no institutions!
          </h2>
        )}
      </div>
    </>
  );
}

export default InstitutionsList;
