import React, { useState } from "react";
import styles from "./ProjectCard.module.css";
import { Link, useParams } from "react-router-dom";
import {Buffer} from 'buffer';
// import {Blob} from "buffer";

function ProjectCard(props) {
  const { categoryName } = useParams();
  // const [base64String, setBase64String]=useState('');

  // function arrayBufferToBase64(buffer) {
  //   let binary = '';
  //   let bytes = new Uint8Array(buffer);
  //   let len = bytes.byteLength;
  //   for (let i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return Buffer.from(binary).toString('base64');
  // }
  // var rezultat=arrayBufferToBase64(props.image);
  // console.log("Aici2"+rezultat);
  //console.log("Ceva"+src);

  // console.log("Verificare"+props.image);
  // console.log(props.numeProiect);
// console.log(props.image);

  const buff=Buffer.from(props.image).toString('base64');
  const mimeType='image/png';

  var base64String 
  let blob=new Blob([props.image.data],{type:"image/jpeg"})
  var reader = new FileReader();
    reader.readAsDataURL(blob);
    console.log(reader);
    reader.onloadend = function () {
    base64String = reader.result;
    }

  // const handleImageLoad = () => {
  //   let blob = new Blob([props.image.data], { type: 'image/jpeg' });
  //   console.log(blob);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   reader.onloadend = () => {
  //     setBase64String(reader.result);
  //     console.log("DA");
  //   };
  // };


  return (
    <Link to={`/ProjectsCategory/${categoryName}/${props.id}`}>
      <div className={styles.ProjectsCardBox}>
        <img className={styles.editImage} src={`data:${mimeType};base64,${buff}`} alt={"Poza nu s-a incarcat!"}  />
        <h2 className={styles.titleProject}>{props.numeProiect}</h2>
      </div>
    </Link>
  );
}

export default ProjectCard;
