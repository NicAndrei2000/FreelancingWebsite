import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./ProjectsCategory.module.css";
import CategoryCard from "../../components/ProjectsCategory/CategoryCard";

function ProjectsCategory({onProjectsChange }) {
  
  const categories = [
    {
      id: "c1",
      title: "Programming & Tech",
      img: "img1",
    },
    {
      id: "c2",
      title: "Graphics & Design",
      img: "img1",
    },
    {
      id: "c3",
      title: "Video & Animation",
      img: "img1",
    },
    {
      id: "c4",
      title: "Music & Audio",
      img: "img1",
    },
    {
      id: "c5",
      title: "Creative Writing",
      img: "img1",
    },
    {
      id: "c6",
      title: "Writing & Translation",
      img: "img1",
    },
  ];

  // useEffect(()=>{
  //   axios.get("http://localhost:8080/api/proiecte").then((res)=>
  //   onProjectsChange(res.data)).catch((err)=>{
  //     console.error("Error fetching projects:", err);
  //   })
  // },[]);


  return (
    <div className={styles.ProjectsCategoryBox}>
      {categories?.map((category) => {
        return <CategoryCard key={category.id} title={category.title} />;
      })}
    </div>
  );
}

export default ProjectsCategory;
