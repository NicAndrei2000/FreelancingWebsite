import React from "react";
import styles from "./Home.module.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import VideoJS from "../../components/VideoJS/VideoJS";

function Home() {
  const slides = [
    {
      url: "/Images/Img1.jpg",
      title: "Exemplu1",
    },
    {
      url: "/Images/Img2.jpg",
      title: "Exemplu2",
    },
    {
      url: "/Images/Img3.jpg",
      title: "Exemplu3",
    },
  ];
  return (
    <div className={styles.page}>
      <ImageSlider slides={slides} />
      <div className={styles.contentPage}>
        <h1 className={styles.title}>What is freelancing?</h1>
        <p className={styles.parag}>
          Freelancing refers to a type of work arrangement where individuals,
          known as freelancers, offer their services to clients or businesses on
          a project basis. Freelancers are self-employed and are not bound to
          long-term employment contracts with a single employer. Instead, they
          work independently and often have the freedom to choose their clients,
          projects, and working hours. Freelancers typically provide specialized
          skills and services in various fields such as writing, design,
          programming, marketing, consulting, and more. They can work remotely
          from their preferred location, offering their expertise to clients
          globally through online platforms, job boards, personal websites, or
          professional networks.
        </p>
        {/* <p className={styles.parag}>Freelancers typically provide specialized skills and services in various fields such as writing, design, programming, marketing, consulting, and more. They can work remotely from their preferred location, offering their expertise to clients globally through online platforms, job boards, personal websites, or professional networks.
</p> */}
        <p className={styles.parag}>
          Freelancing offers several advantages, such as flexibility in choosing
          projects and clients, the ability to work from anywhere, and the
          potential for higher earning potential based on skills and demand.
          However, it also requires self-discipline, effective time management,
          and the ability to market oneself and manage client relationships.
          Overall, freelancing provides an alternative work arrangement for
          individuals who prefer more autonomy, variety in projects, and the
          opportunity to leverage their skills and expertise in a self-directed
          manner.
        </p>
        {/* <p className={styles.parag}>Overall, freelancing provides an alternative work arrangement for individuals who prefer more autonomy, variety in projects, and the opportunity to leverage their skills and expertise in a self-directed manner.
</p> */}
        <h1 className={styles.title}>
          Why is it important to introduce the concept of frelancing to
          students?{" "}
        </h1>
        <p className={styles.parag}>
          Introducing the concept of freelancing to students is of great
          importance due to several key reasons. By exposing students to
          freelancing, they gain valuable insights into alternative career paths
          that extend beyond traditional employment. This exposure broadens
          their horizons, empowering them to explore self-employment and
          entrepreneurship as viable options for their future. Freelancing also
          offers significant advantages in terms of flexibility and work-life
          balance. Students who become aware of freelancing understand that it
          provides the potential for a more balanced lifestyle, as they have
          greater control over their working hours and the freedom to adapt
          their work to accommodate personal commitments and priorities.
        </p>
        <p className={styles.parag}>
          Furthermore, freelancing promotes skill development. Freelancers often
          need to cultivate a diverse skill set to meet the varying demands of
          their clients. Introducing students to freelancing exposes them to the
          importance of continuously expanding their skill set and adapting to
          the evolving needs of the market.
        </p>
        <h1 className={styles.title}>
          What are the advantages of freelancing?
        </h1>
        <p className={styles.parag}>
          <li>
            Flexibility: Freelancing provides the freedom to set your own
            schedule and work from anywhere. You have the flexibility to choose
            when and where you work, allowing for a better work-life balance and
            the ability to pursue personal interests and commitments.
          </li>
          <li>
            Independence: As a freelancer, you are your own boss. You have the
            autonomy to make decisions, choose your clients and projects, and
            set your own rates. This level of independence allows you to shape
            your career according to your preferences and goals.
          </li>
          <li>
            Variety: Freelancing offers the opportunity to work on diverse
            projects and collaborate with different clients across various
            industries. This variety keeps the work engaging and allows you to
            continuously learn and grow professionally.
          </li>
          <li>
            Career Growth: Freelancing allows you to take ownership of your
            career growth. You can specialize in specific areas, pursue niche
            markets, and continually upgrade your skills to stay competitive.
            You have the freedom to pivot and explore new opportunities as your
            interests evolve.
          </li>
          <li>
            Personal Development: Freelancing requires you to take on multiple
            roles, such as project manager, marketer, and finance manager. This
            multi-faceted nature of freelancing helps develop a wide range of
            skills, including time management, communication, negotiation, and
            problem-solving, which are valuable in both personal and
            professional contexts.
          </li>
        </p>
      </div>

      {/* <img src="/Images/Img1.jpg" alt="" /> */}
      <div className={styles.videoBox}>
        <VideoJS />
      </div>
    </div>
  );
}

export default Home;
