import React from "react";
import styles from "./CategoryCard.module.css";
import programmingImage from "./../../assets/images/Programming.jpg";
import designImage from "./../../assets/images/GraphicsDesign3.jpg";
import writingImage from "./../../assets/images/WritingTranslation.jpg";
import creativewritingImage from "./../../assets/images/creativeWriting.jpg";
import videoAnimImage from "./../../assets/images/VideoAnimation2.jpg";
import musicImage from "./../../assets/images/MusicAudio.jpg";

import { Link } from "react-router-dom";

function CategoryCard(props) {
  let selectedImage;
  let selectedParag;
  if (props.title === "Programming & Tech") selectedImage = programmingImage;
  else if (props.title === "Graphics & Design") selectedImage = designImage;
  else if (props.title === "Writing & Translation")
    selectedImage = writingImage;
  else if (props.title === "Video & Animation") selectedImage = musicImage;
  else if (props.title === "Music & Audio") selectedImage = videoAnimImage;
  else if (props.title === "Creative Writing")
    selectedImage = creativewritingImage;

  if (props.title === "Programming & Tech")
    selectedParag =
      "The Programming & Tech provides a platform for clients to find skilled freelancers who offer a wide range of services related to computer programming and technology. From web development to mobile app development and software development, clients can connect with talented professionals to meet their programming and tech needs.In addition to web and software development, the category offers services related to database management, system administration, network setup and troubleshooting, cybersecurity, and more.";
  else if (props.title === "Graphics & Design")
    selectedParag =
      "The Graphics & Design is a vibrant and diverse community of talented freelancers who specialize in visual communication and creative design. This category encompasses a wide range of services tailored to meet the design needs of businesses and individuals.One of the key highlights of the Graphics & Design category is logo design. Freelancers skilled in branding and identity creation offer their expertise in designing unique and memorable logos for businesses.";
  else if (props.title === "Video & Animation")
    selectedParag =
      "The Video & Animation category is a dynamic and creative hub where clients can discover talented freelancers who specialize in creating captivating videos and animations. This category caters to a wide range of video production and animation needs for businesses and individuals.One of the main highlights of the Video & Animation category is video editing and post-production. Freelancers skilled in video editing software offer their expertise to enhance and refine raw footage, creating visually appealing videos.";
  else if (props.title === "Writing & Translation")
    selectedParag =
      "The Writing & Translation offers a wide range of services catered to clients' writing and translation needs. From creative writing to professional translation, clients can find skilled freelancers who provide high-quality and tailored solutions. With expertise in various writing styles and languages, these professionals deliver engaging content and accurate translations that meet clients' specific requirements.The Writing & Translation category connects clients with talented freelancers who can effectively communicate their message and bridge language barriers.";
  else if (props.title === "Music & Audio")
    selectedParag =
      "The Music & Audio category offers a diverse range of services for clients seeking professional assistance with their audio needs. From music composition and production to voice-overs and sound effects, freelancers in this category provide creative and high-quality solutions. Whether clients need original music for their projects or expertly recorded voice-overs, they can find talented professionals who specialize in delivering exceptional audio content. Freelancers help clients enhance their projects with captivating sound and music that resonates with their target audience.";
  else if (props.title === "Creative Writing")
    selectedParag =
      "The Creative Writing category offers a wide array of services for clients seeking creative and engaging written content. From captivating storytelling to compelling copywriting, freelancers in this category excel at crafting unique and impactful written pieces. Whether clients need blog articles, product descriptions, or creative narratives, they can find skilled professionals who specialize in delivering exceptional written content. With their expertise in language and storytelling, freelancers help clients effectively communicate their ideas and captivate their readers.";

  return (
    <Link to={`/ProjectsCategory/${props.title}`}>
      <div className={styles.categoryCard}>
        <img
          className={styles.categoryCardImage}
          src={selectedImage}
          // alt={title}
        />
        <div className={styles.categoryInfo}>
          <h2 className={styles.categoryCardTitle}>
            {`${props.title.charAt(0).toUpperCase()}${props.title.slice(1)}`}
          </h2>
          <p className={styles.description}>{selectedParag}</p>
          {/*
          if (props.title =="Programming & Tech")
            src={iamge1}
          else
            if(props.title =="Design")
              src={image2}
            else
              if(props.title=="Writting")
                src={iamge3} 
              else src={image 4}
           */}
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
