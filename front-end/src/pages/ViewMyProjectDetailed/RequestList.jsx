import React, { useEffect, useState } from "react";
import RequestItem from "./RequestItem";
import styles from "./RequestList.module.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RequestList(props) {
  // const [selectedTeam,setSelectedTeam]=useState(null);

  const [input, setInput] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const userType = props.userType;

  let requestContent = "Doesn t exist!";
  console.log("Aici este");
  // console.log(props.items);
  console.log(props.projInfo);

  const sendRequest = () => {
    if (input.length)
      axios
        .patch("http://localhost:8080/api/proiecte/raspuns", {
          id: props.projInfo.id,
          rezultatGit: input,
        })
        .then((response) => {
          console.log(response.data);
          toast("The solution was successfully sent!")
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const deleteRequestItemsHandler = (team) => {
    // localStorage.setItem("teamId", team.idKey);
    axios
      .patch(`http://localhost:8080/api/cereri`, {
        idEchipa: team.idKey,
        idProiect: props.projInfo.id,
        status: "Acceptat",
      })
      .then(() => {
        axios
          .get("http://localhost:8080/api/cereri")
          .then((res) => props.onDeleteRequestItems2(team, res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const deleteOneRequestItemHandler = (idRequest) => {
    props.onDeleteOneRequestItem2(idRequest);
  };
  const updateNrProiect = () => {
    setIsButtonClicked(true);
    const teamId = localStorage.getItem("teamId");
    axios
      .patch("http://localhost:8080/api/proiecte/updateApreciat", {
        id: props.projInfo.id,
        apreciat: "Apreciat",
      })
      .then((response) => {
        console.log(response.data);
        // alert("S-a postat");
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(
        `http://localhost:8080/api/cereri/CerereDupaProiectId/${props.projInfo.id}`
      )
      .then((response) => {
        const _id = response.data.SelectedTeam;

        axios
          .patch(`http://localhost:8080/api/echipe/updateEchipa/${_id}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {props.projInfo.esteAles === "DA" ? (
        userType === "Profesor" ? (
          <div className={styles.box}>
            <p className={styles.parag}>
            Below you will need to enter your project solution.
            </p>
            <input
              type="text"
              className={styles.inputResult}
              placeholder="Enter the file url"
              value={input}
              onChange={(ev) => {
                setInput(ev.target.value);
              }}
            />
            <button
              className={styles.btn}
              onClick={() => {
                sendRequest();
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div className={styles.box}>
            {
              userType==="Student" ?(<p className={styles.parag}>
                Below will appear the result sent by your team to the client!
                </p>):(<p className={styles.parag}>
            Below will appear the result of the chosen team!
            </p>)
            }
            {/* <p className={styles.parag}>
            Below will appear the result of the chosen team!
            </p> */}
            <input
              type="text"
              className={styles.inputResult}
              value={props.projInfo.rezultatGit}
              readOnly
            />
            {props.projInfo.apreciat === "Nimic" &&
            props.projInfo.rezultatGit !== "No result yet!" ? (
              <button className={styles.btn} onClick={updateNrProiect}>
                Like
              </button>
            ) : null}
          </div>
        )
      ) : (
        // <p>Echipa cu numele {props.selTeam.RName}, specializarea {props.selTeam.RSpecialization}, universitatea {props.selTeam.RUniversity}, contact {props.selTeam.RContact}</p>
        <div className={styles.table}>
          <div className={styles.tableName}>
            <div className={styles.tableCell}>Team name</div>
            <div className={styles.tableCell}>University</div>
            <div className={styles.tableCell}>Specialization</div>
            <div className={styles.tableCell}>Contact</div>
            <div className={styles.tableCell}>Summary</div>
          </div>

          {props.items.length !== 0 ? (
            (requestContent = props.items.map((request) => (
              <RequestItem
                key={request.id}
                idKey={request.id}
                teamName={request.nume_echipa}
                university={request.facultate_apartinatoare}
                specialization={request.specializare_echipa}
                summary={request.descriere}
                contact={request.contact}
                onDeleteRequestItems={deleteRequestItemsHandler}
                onDeleteOneRequestItem={deleteOneRequestItemHandler}
              />
            )))
          ) : (
            <h2 className={styles.titleForNoInstitution}>Found no requests!</h2>
          )}
        </div>
      )}
      <ToastContainer/>
    </>
  );
}

export default RequestList;
