import React from 'react'
import styles from './addTeam.module.css'
import AddNewTeam from '../../components/AddNewTeam/AddNewTeam'

function addTeam() {
  return (
    <div className={styles.page}>
      <AddNewTeam/>
    </div>
  )
}

export default addTeam
