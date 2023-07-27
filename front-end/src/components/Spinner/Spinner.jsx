import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Spinner.module.css";



function Spinner(props) {

    const [selectedWord, setSelectedWord] = useState("");

  const handleInputChange = (event) => {
    setSelectedWord(event.target.value);
  };

  useEffect(()=>{
    props.saveSelectedCategory(selectedWord);
  },[selectedWord]);

const words=Array.isArray(props.sentCategoriesToSpinner) ? props.sentCategoriesToSpinner : [];
  return (
    <div className={styles.wordSelectorContainer}>
      <select
        className={styles.wordSelectorDropdown}
        value={selectedWord}
        onChange={handleInputChange}
      >
        <option>Choose the category</option>
        {words.map((word) => (
          <option key={word.title} value={word.title}>
            {word.title}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default Spinner;
