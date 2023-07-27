import React from 'react'
import styles from './StudentReqList.module.css'
import StudentReqItem from './StudentReqItem';
function StudentReqList(props) {

  let requestContent="Found no member!";
  return (
    <div className={styles.table}>
    <div className={styles.tableName}>
      <div className={styles.tableCell}>Last name</div>
      <div className={styles.tableCell}>First name</div>
      <div className={styles.tableCell}>Email</div>
      <div className={styles.tableCell}></div>
    </div>

    {props.items.length !==0 ? (
      (requestContent = props.items.map((member) => (
        <StudentReqItem
          key={member.id}
          idKey={member.id}
          LastName={member.nume}
          FirstName={member.prenume}
          IdTeam={member.EchipaId}
          UserId={member.ME_UtilizatorId}
          email={member.email}
        />
      )))
    ) : (
      <h2 className={styles.titleForNoInstitution}>Found no member!</h2>
    )}
  </div>
  )
}

export default StudentReqList
