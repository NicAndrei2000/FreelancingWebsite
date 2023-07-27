import React, { useEffect, useState } from "react";
import styles from "./TeamItem.module.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function TeamItem(props) {
  const [hasTeam, setHasTeam] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/membriiEchipe")
      .then((res) => {
        if (res.data != null) {
          const membru = res.data.filter(
            (m) => m.status === "Inscris" && m.ME_UtilizatorId === props.user.id
          );
          if (membru.length !== 0) {
            setHasTeam(true);
          }
        }
      })
      .catch((err) => {
        console.log("Error cerere!", err);
      });
  }, []);
  const registerInTeam = () => {
    axios
      .post("http://localhost:8080/api/membriiEchipe", {
        ME_UtilizatorId: props.user.id,
        EchipaId: props.idKey,
      })
      .then((res) => {
        if (res.data !== "ExistaDeja") {
          toast("Congratulations! You have applied for the team: " + props.teamName);
        } else {
          toast("I'm sorry, but you've already joined the team: " + props.teamName);
        }
      })
      .catch((err) => {
        console.log("Error cerere!", err);
      });
  };

  console.log("Are echipa??");
  console.log(hasTeam);
  return (
    <>
      <div className={styles.tableRow}>
        <div className={styles.tableCell}>{props.teamName}</div>
        <div className={styles.tableCell}>{props.university}</div>
        <div className={styles.tableCell}>{props.specialization}</div>
        <div className={styles.tableCell}>{props.summary}</div>
        <div className={styles.tableCell}>{props.contact}</div>
        <div className={styles.tableCell}>
          {hasTeam !== true ? (
            <button className={styles.btn} onClick={registerInTeam}>
              Join
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default TeamItem;
