import React from 'react'
import styles from './RequestItem.module.css'
import axios from 'axios';

function RequestItem(props) {

  const deleteAllHandler=()=>{
    const team={
      id:props.id,
      idKey:props.idKey,
      RName:props.teamName,
      RUniversity:props.university,
      RSpecialization:props.specialization,
      RContact:props.contact
    }
    

    props.onDeleteRequestItems(team);

  }
  const deleteOneHandler=()=>{
    props.onDeleteOneRequestItem(props.idKey);
    // console.log(props.idKey);
  }
  return (
    <>
      <div className={styles.tableRow}>
        <div className={styles.tableCell}>{props.teamName}</div>
        <div className={styles.tableCell}>{props.university}</div>
        <div className={styles.tableCell}>{props.specialization}</div>
        <div className={styles.tableCell}>{props.contact}</div>
        <div className={styles.tableCell}>{props.summary}</div>
        <div className={styles.tableCell}><button className={styles.btn} onClick={deleteAllHandler}>Accept</button></div>
        <div className={styles.tableCell}><button className={styles.btn} onClick={deleteOneHandler}>Delete</button></div>

      </div>
    </>
  )
}

export default RequestItem
