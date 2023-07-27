import React, { useEffect, useState } from "react";
import styles from "./MyTeam.module.css";
import axios from "axios";
import StudentReqList from "./StudentReqList";
import StudentRegisteredInTeam from "./StudentRegisteredInTeam";

function MyTeam(props) {
  const [userTeam, setUserTeam] = useState(null);

  const [waitingMembers, setWaitingMembers] = useState(null);
  const [registeredMembers, setRegisteredMembers] = useState(null);

  useEffect(() => {
    if (props.userType === "Student") {
      axios
        .get(`http://localhost:8080/api/membriiEchipe/${props.userId}`)
        .then((res) => {
          if(res.data==="NuAreEchipa"){
            setUserTeam(null);
          }
          else{
            setUserTeam(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:8080/api/echipe/${props.userId}`)
        .then((res) => {
          console.log("Aici verificare!2");
          const { echipa, membriiAsteptare, membriiInscris } = res.data;
          setWaitingMembers(membriiAsteptare);
          setRegisteredMembers(membriiInscris);
          setUserTeam(echipa);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  console.log("Verificare2 props!");
  console.log(userTeam);

  return (
    <>
      {userTeam !== null? (
        <>
          <div className={styles.page}>
            <div className={styles.contentPage}>
              <h1>Team name</h1>
              <p className={styles.parag}>{userTeam.nume_echipa}</p>
              <h1>University</h1>
              <p className={styles.parag}>{userTeam.facultate_apartinatoare}</p>
              <h1>Specialization team</h1>
              <p className={styles.parag}>{userTeam.specializare_echipa}</p>
              <h1>Summary team</h1>
              <p className={styles.parag}>{userTeam.descriere}</p>
              <h1>Contact</h1>
              <p className={styles.parag}>{userTeam.contact}</p>
            </div>
          </div>
          {props.userType === "Profesor" && (
          <>
            <h1>List of members wishing to join the team</h1>
            <StudentReqList items={waitingMembers} />
            <h1>List of team members</h1>
            <StudentRegisteredInTeam items={registeredMembers} />
          </>
        )}
        </>
      ) : (
        <div className={styles.page2}>
          <h1 className={styles.titleNoTeam}>
            Unfortunately, you haven't a team!
          </h1>
        </div>
      )}
    </>
  );

  // else{
  //   return(
  //     <>
  //     <h1>Unfortunately you haven't created a team</h1>
  //     </>
  //   )
  // }
}

export default MyTeam;
