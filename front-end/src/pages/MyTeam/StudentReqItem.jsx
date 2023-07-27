import React from 'react'
import styles from './StudentReqItem.module.css'
import axios from 'axios';

function StudentReqItem(props) {

  const addMemberInTeam=()=>{
    axios
        .patch(`http://localhost:8080/api/membriiEchipe`,{
          id:props.idKey,
          status:"Inscris",
          IdUtil:props.UserId
        })
        .then(console.log("Succssed add in team")).catch((err)=>console.log(err));
  }


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
  console.log("Ce trimite props!");
  console.log(props);
  return (
    <div>
      <div className={styles.tableRow}>
        <div className={styles.tableCell}>{props.LastName}</div>
        <div className={styles.tableCell}>{props.FirstName}</div>
        <div className={styles.tableCell}>{props.email}</div>
        <div className={styles.tableCell}><button className={styles.btn} onClick={addMemberInTeam}>Accept</button></div>
        <div className={styles.tableCell}><button className={styles.btn} onClick={rejectMember}>Reject</button></div>

      </div>
       
    </div>
  )
}

export default StudentReqItem
