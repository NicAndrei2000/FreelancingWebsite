import React from "react";
import styles from "./AddProjects.module.css";
import AddNewProjects from "../../components/AddNewProjects/AddNewProjects";

function AddProjects() {

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

  return (
    <div className={styles.page}>
      <AddNewProjects sendCategories={categories}/>
    </div>
  );
}

export default AddProjects;
