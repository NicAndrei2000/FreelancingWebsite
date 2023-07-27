import React, { useEffect, useState } from "react";
import styles from "./JoinTeam.module.css";
import axios from "axios";
import TeamItem from "../../components/TeamsList/TeamItem";
import { ToastContainer, toast } from 'react-toastify';

function JoinTeam() {
  const [teams, setTeams] = useState(null);
  const [user, setUser] = useState(null);

  let requestContent;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/echipe")
      .then((res) => setTeams(res.data))
      .catch((err) => {
        console.error("Error getTeams:", err);
      });

    const userLS = localStorage.getItem("user");
    const userParse = JSON.parse(userLS);
    setUser(userParse);
  }, []);
  return (
    <div className={styles.table}>
      <div className={styles.tableName}>
        <div className={styles.tableCell}>Team name</div>
        <div className={styles.tableCell}>University</div>
        <div className={styles.tableCell}>Specialization</div>
        <div className={styles.tableCell}>Summary</div>
        <div className={styles.tableCell}>Contact</div>
        <div className={styles.tableCell}></div>
      </div>
      {teams !== null ? (
        (requestContent = teams.map((team) => (
          <TeamItem
            key={team.id}
            idKey={team.id}
            teamName={team.nume_echipa}
            university={team.facultate_apartinatoare}
            specialization={team.specializare_echipa}
            summary={team.descriere}
            contact={team.contact}
            user={user}
          />
        )))
      ) : (
        <h2 className={styles.titleForNoInstitution}>Found no requests!</h2>
      )}
      <ToastContainer />
    </div>
  );
}

export default JoinTeam;
