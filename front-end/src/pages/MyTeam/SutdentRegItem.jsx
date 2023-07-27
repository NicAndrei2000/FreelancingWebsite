import React from 'react'
import styles from './StudentRegItem.module.css'
import axios from 'axios';

function SutdentRegItem(props) {

    const rejectMember=()=>{
        axios
          .delete(`http://localhost:8080/api/membriiEchipe/${props.idKey}`)
          .then(() => {
            console.log("Success delete!");
          })
          .catch((error) => {
            console.error("Error deleting member:", error);
          });
      }
  return (
    <div>
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>{props.LastName}</div>
      <div className={styles.tableCell}>{props.FirstName}</div>
      <div className={styles.tableCell}>{props.email}</div>
      <div className={styles.tableCell}><button className={styles.btn} onClick={rejectMember}>Delete</button></div>
    </div>
     
  </div>
  )
}

export default SutdentRegItem
