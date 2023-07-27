import React, { useEffect, useState } from "react";
import styles from "./Institutions.module.css";
import AddInstitution from "../../components/Institutions/AddInstitution";
import InstitutionsList from "../../components/Institutions/InstitutionsList";



function Institutions() {


  // const [institutions, setInstitutions] = useState(null);
  const [user,setUser]=useState(null);
  
  useEffect(()=>{
    const storedUser=localStorage.getItem('user');
    setUser(JSON.parse(storedUser));
  },[]);

  // console.log("DWDW");
  // console.log(user);

  // const saveInstitutionDataHandler = (enteredInstitutionData) => {
  //   const InstitutionData = {
  //     ...enteredInstitutionData,
  //     id: Math.random().toString(),
  //   };

  //   setInstitutions((prevInstitutions) => {
  //     return [InstitutionData, ...prevInstitutions];
  //   });
  // };

  const deleteInstitutionHandler = (institution) => {
    // const updateInstitution = institutions.filter(
    //   (inst) => inst.id !== institution.id
    // );
    // setInstitutions(updateInstitution);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Institutions Page</h1>
      {
        user!==null?( user.tipUtilizator ==="Admin"?<AddInstitution/>
        :null):null
       
      }
      <InstitutionsList
        onDeleteInstitutionI={deleteInstitutionHandler}
      />
    </div>
  );
}

export default Institutions;
