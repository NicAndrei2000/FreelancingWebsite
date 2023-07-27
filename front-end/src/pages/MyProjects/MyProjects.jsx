import React, { useEffect, useState } from "react";
import styles from "./MyProjects.module.css";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MyProjectCard from "../../components/MyProjects/MyProjectCard";
function MyProjects({ LoggedUserID, usertype }) {
  const [project2, setProject2] = useState(null);

  console.log("LoggedUserID");
  console.log(usertype);

  useEffect(() => {
    if (usertype == "Admin" || usertype == "Client") {
      axios
        .get("http://localhost:8080/api/proiecte")
        .then((res) => setProject2(res.data))
        .catch((err) => {
          console.error("Error fetching projects:", err);
        });
    } else if (usertype == "Student" || usertype == "Profesor") {
      axios
        .get(" http://localhost:8080/api/proiecte/echipa/" + LoggedUserID)
        .then((res) => {
          const generated = res.data?.map((project) => {
            return {
              id: project.Proiecte.id,
              numeProiect: project.Proiecte.numeProiect,
              imagineFundal: project.Proiecte.imagineFundal,
            };
          });

          setProject2(generated);
        })
        .catch((err) => {
          console.error("Error fetching projects:", err);
        });
    }
    // http://localhost:8080/api/proiecte/echipa/1
  }, []);


  return (
    <div className={styles.myProjectsBox}>
      {project2?.map((project) => {
        if (
          project.UtilizatoriId == LoggedUserID ||
          usertype == "Student" ||
          usertype == "Profesor"
        ) {
          return (
            <MyProjectCard
              key={project.id}
              id={project.id}
              numeProiect={project.numeProiect}
              image={project.imagineFundal}
            />
          );
        }
      })}
    </div>
  );
}

export default MyProjects;
