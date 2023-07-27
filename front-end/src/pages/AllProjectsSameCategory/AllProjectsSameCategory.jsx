import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "../../components/AllProjectsSameCategory/ProjectCard";
import styles from "./AllProjectsSameCategory.module.css";
import axios from "axios";
import { defaultImg } from "../../data/projectsDefaultImage";

function AllProjectsSameCategory() {
  const { categoryName } = useParams();
  const [categoryProjects, setCategoryProjects] = useState(null);
  // const [projects,setProjects]=useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/proiecte")
      .then((res) =>{
        const filteredProjects = res.data.filter(
          (project) =>
            project.categorieProiect === categoryName && project.esteAles === "NU"
        );
        setCategoryProjects(filteredProjects);
      } )
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
      // setProjects(proj);
    
     
    
  }, []);

  return (
    <div className={styles.AllProjectsSameCategoryBox}>
      {categoryProjects?.map((categoryProject) => {
        return (
          <ProjectCard
            key={categoryProject.id}
            id={categoryProject.id}
            numeProiect={categoryProject.numeProiect}
            tipuriTehnologii={categoryProject.tipuriTehnologii}
            categorieProiect={categoryProject.categorieProiect}
            comunicareProiect={categoryProject.comunicareProiect}
            descriereProiectDetaliat={categoryProject.descriereProiectDetaliat}
            detaliiCompanie={categoryProject.detaliiCompanie}
            experientaEchipa={categoryProject.experientaEchipa}
            termenLimitaProiect={categoryProject.termenLimitaProiect}
            rezumatProiect={categoryProject.rezumatProiect}
            image={categoryProject.imagineFundal}
          />
        );
      })}
    </div>
  );
}

export default AllProjectsSameCategory;
