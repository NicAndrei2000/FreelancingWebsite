import React, { useEffect, useState } from "react";
import styles from "./InstitutionsItem.module.css";
import deleteIcon from "./../../assets/icons/trash.svg";

function InstitutionsItem(props) {
  const [typeUser, setTypeUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userParse = JSON.parse(user);
    setTypeUser(userParse.tipUtilizator);
  }, []);
  const deleteInstitutionItemHandler = () => {
    const Institution = {
      id: props.id,
      IName: props.institutionName,
      IEmail: props.institutionEmail,
    };
    console.log(Institution);
    props.onDeleteInstitutionItem(Institution);
  };
  return (
    <>
      <div className={styles.tableRow}>
        <div className={styles.tableCell}>{props.institutionName}</div>
        {typeUser !== null && typeUser === "Admin" ? (
          <div className={styles.tableCell}>{props.identifNumber}</div>
        ) : (
          typeUser !== null && <div className={styles.tableCell}>Access restricted!</div>
        )}
        {typeUser !== null && typeUser === "Admin" ? (
          <div className={styles.tableCell}>{props.accessCode}</div>
        ) : (
          typeUser !== null && (
            <div className={styles.tableCell}>Access restricted!</div>
          )
        )}
        <div className={styles.tableCell}>{props.contact}</div>
        <div className={styles.tableCell}>{props.institutionEmail}</div>
        <div className={styles.tableCell}>
        {typeUser !== null && typeUser === "Admin" ? (
          <img
          src={deleteIcon}
          alt="Delete icon"
          onClick={deleteInstitutionItemHandler}
          className={styles.actionBtn}
        />
        ) : null}
          
        </div>
      </div>
    </>
  );
}

export default InstitutionsItem;
