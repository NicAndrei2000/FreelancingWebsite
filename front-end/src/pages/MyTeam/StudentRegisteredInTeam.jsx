import React from 'react'
import styles from './StudentRegisteredInTeam.module.css'
import SutdentRegItem from './SutdentRegItem';

function StudentRegisteredInTeam(props) {
    let requestContent;

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
        <SutdentRegItem
          key={member.id}
          idKey={member.id}
          LastName={member.nume}
          FirstName={member.prenume}
          email={member.email}
        />
      )))
    ) : (
      <h2 className={styles.titleForNoInstitution}>There is no member in this team!</h2>
    )}
  </div>
  )
}

export default StudentRegisteredInTeam
