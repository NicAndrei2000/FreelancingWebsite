import React, { useEffect, useState } from "react";
import styles from "./ViewMyProjectDetailed.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import RequestList from "./RequestList";

function ViewMyProjectDetailed(props) {
  const { projectId } = useParams();

  const userType = props.userType;
  const [projectInfo, setProjectInfo] = useState(null);
  const [teamsInSelectedRequest, setTeamsInSelectedRequest] = useState(null);
  const [filterReq, setFilterReq] = useState(null);
  // const [selectedTeam,setSelectedTeam]=useState(null);

  useEffect(() => {
    if (!projectInfo)
      axios
        .get(`http://localhost:8080/api/proiecte/${projectId}`)
        .then((res) => setProjectInfo(res.data));

    axios.get("http://localhost:8080/api/echipe").then((res) => {
      if (res.data) {
        let teams=res.data;
        axios.get("http://localhost:8080/api/cereri").then((res) => {
          if(res.data){
            const filteredRequest = res.data.filter(
              (request) =>
                request.ProiecteId == projectId && request.status === "trimis"
            );
            setFilterReq(filteredRequest);
            const teamIds = filteredRequest.map((request) => request.EchipeId);
  
            setTeamsInSelectedRequest(
              teams.filter((team) => teamIds.includes(team.id))
            );
          }
          else{
            console.log("Nu e bine la cereri!");
          }
        });
      } else {
        console.log("Nu este bine!");
      }
    });
  }, []);

  if (!projectInfo) {
    return <div>Loading project information...</div>;
  }

  console.log("Teamm");
  console.log(teamsInSelectedRequest);

  const deleteAllRequestsHandler = (teamReq, updateFilterReq) => {
    // console.log("Sa fie bine");
    // console.log(updateFilterReq);
    const idsToDelete = [];
    for (let i = 0; i < updateFilterReq.length; i++) {
      const request = updateFilterReq[i];
      if (request.status === "trimis" && request.ProiecteId == projectId) {
        console.log("Blalala");

        idsToDelete.push(request.id);
      }
    }
    console.log("Vezi totul!!");
    console.log(idsToDelete);
    setTeamsInSelectedRequest([]);

    if (idsToDelete.length !== 0) {
      axios.delete(`http://localhost:8080/api/cereri/`, {
        data: { ids: idsToDelete },
      });
    }

    axios
      .patch("http://localhost:8080/api/proiecte", {
        id: projectId,
        esteAles: "DA",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // setSelectedTeam(teamReq);
  };
  const deleteOneRequestHandler = (idRequest) => {
    const updateFilterReq = teamsInSelectedRequest.filter(
      (req) => req.id != idRequest
    );
    console.log(updateFilterReq);
    const idReq = filterReq.filter((req) => req.EchipeId == idRequest);
    const deleteId = idReq[0].id;
    axios
      .delete(`http://localhost:8080/api/cereri/${deleteId}`)
      .then(() => {
        setTeamsInSelectedRequest(updateFilterReq);
      })
      .catch((error) => {
        console.error("Error deleting cereri:", error);
      });
  };

 
  return (
    <>
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
      </div>
      {
        teamsInSelectedRequest ? (
          <RequestList
            items={teamsInSelectedRequest}
            projInfo={projectInfo}
            onDeleteRequestItems2={deleteAllRequestsHandler}
            onDeleteOneRequestItem2={deleteOneRequestHandler}
            userType={userType}
          />
        ) : (
          <p>Ceva2</p>
        )
        // selectedTeam ? (
        //   <p>Echipa cu numele {selectedTeam.RName}, specializarea {selectedTeam.RSpecialization}, universitatea {selectedTeam.RUniversity}, contact {selectedTeam.RContact}</p>
        // ) : (
        //   <p>Loading</p>
        // )
        // <p>Echipa cu numele ${selectedTeam.RName}, specializarea ${selectedTeam.RSpecialization}, universitatea ${selectedTeam.RUniversity}, contact ${selectedTeam.RContact}</p>
      }
    </>
  );
}

export default ViewMyProjectDetailed;
