import React, { useEffect, useState } from "react";
import styles from "./ViewProjects.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewProjects() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState(null);
  const [hasTeam, sethasTeam] = useState(null);
  const [user,setUser]=useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/proiecte/${projectId}`)
      .then((res) => setProjectInfo(res.data));
    const user = localStorage.getItem("user");
    const userParse = JSON.parse(user);
    setUser(userParse);

    axios
      .get(`http://localhost:8080/api/echipe/findEchipaByUtilizator/${userParse.id}`)
      .then((res) => sethasTeam(res.data)).catch((error) => console.log("Eroare la gasirea echipei!", error));
    
  }, []);

  console.log("Mititei");
  console.log(hasTeam);

  if (!projectInfo) {
    return <div>Loading project information...</div>;
  }
  console.log(projectId);
  // console.log(hasTeam.id);

  const sendRequestHandler = () => {
    axios
      .post("http://localhost:8080/api/cereri", {
        ProiecteId: projectId,
        EchipeId: hasTeam.id,
        status: "trimis",
        SelectedTeam:null,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error cerere!", err);
      });
  };
  return (
    <div className={styles.page}>
      <div className={styles.contentPage}>
        <h1>Project name</h1>
        <p className={styles.parag}>{projectInfo.numeProiect}</p>
        <h1>About company</h1>
        <p className={styles.parag}>{projectInfo.detaliiCompanie}</p>
        <h1>Project brief</h1>
        <p className={styles.parag}>{projectInfo.rezumatProiect}</p>
        <h1>Detailed project description</h1>
        <p className={styles.parag}>{projectInfo.descriereProiectDetaliat}</p>
        <h1>Type of technologies prefered</h1>
        <p className={styles.parag}>{projectInfo.tipuriTehnologii}</p>
        <h1>Project's deadline</h1>
        <p className={styles.parag}>{projectInfo.termenLimitaProiect}</p>
        <h1>Project communication</h1>
        <p className={styles.parag}>{projectInfo.comunicareProiect}</p>
        <h1>Team's experience</h1>
        <p className={styles.parag}>{projectInfo.experientaEchipa}</p>
      </div>
      {user!==null?(hasTeam != "NuExista" || user.tipUtilizator==="Admin" ? (
        <button className={styles.btn} onClick={sendRequestHandler}>
          Apply
        </button>
      ) : null):null
    }
    </div>
  );
}

export default ViewProjects;
