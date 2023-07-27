import React from "react";
import styles from "./MyProjectCard.module.css";
import { Link, useParams } from "react-router-dom";

import { Buffer } from "buffer";

function MyProjectCard(props) {
  const buff = Buffer.from(props.image).toString("base64");
  console.log(buff);
  const mimeType = "image/png";

  var base64String;
  let blob = new Blob([props.image.data], { type: "image/jpeg" });
  console.log(blob);
  var reader = new FileReader();
  reader.readAsDataURL(blob);
  console.log(reader);
  reader.onloadend = function () {
    base64String = reader.result;
    // console.log('Base64 String - ', base64String);
  };

  return (
    <Link to={`/MyProjects/${props.id}`}>
      <div className={styles.ProjectsCardBox}>
        <img
          className={styles.editImage}
          src={`data:${mimeType};base64,${buff}`}
          alt={"Poza nu s-a incarcat!"}
        />
        <h2 className={styles.titleProject}>{props.numeProiect}</h2>
      </div>
    </Link>
  );
}

export default MyProjectCard;
