import React, { useState,useEffect } from 'react'
import styles from "./CompaniesList.module.css"
import CompaniesItem from './CompaniesItem'
import axios from 'axios';

function CompaniesList(props) {

  const [companies,setCompanies]=useState(null);
    let expensesContent = <p>No companies found.</p>;

    // if(props.items.length ===0){
    //     return <h2>Found no expenses</h2>
    //   }
    
    const deleteCompanyItemHandler=(company)=>{
      props.onDeleteCompanyI(company);
      if(companies!=null){
        const updateCompanies=companies.filter(comp=>comp.id !== company.id);
            setCompanies(updateCompanies);
            }
      axios
      .delete(`http://localhost:8080/api/clienti/${company.id}`)
      .then((res) => {
        console.log("Delete company success!");
      })
      .catch((err) => {
        console.error("Error deletecompany:", err);
      });

    }
    useEffect(()=>{
      axios.get("http://localhost:8080/api/clienti").then((res)=>
      setCompanies(res.data)).catch((err)=>{
        console.error("Error fetching projects:", err);
      })
    },[]);
    
  return (
    <>
    <div className={styles.table}>
        <div className={styles.tableName}>
          <div className={styles.tableCell}>Company Name</div>
          <div className={styles.tableCell}>Identification number</div>
          <div className={styles.tableCell}>Access code</div>
          <div className={styles.tableCell}>Contact</div>
          <div className={styles.tableCell}>Email</div>
          <div className={styles.tableCell}>Actions</div>
        </div>

  
      {companies!==null?(
      expensesContent=companies.map((company)=>(
        <CompaniesItem
        key={company.id}
        id={company.id} // !!!! am schimbat key cu id
        companyName={company.nume}
        companyEmail={company.email}
        companyIdenNb={company.numarIdentificator}
        companyAccessCode={company.codAcces}
        companyContact={company.contact}
        onDeleteCompanyItem={deleteCompanyItemHandler}
        />
      ))):(
        <h2 className={styles.titleForNoCompanies}>Found no companies!</h2>
      )}
      </div>
  
    </>
  );
}

export default CompaniesList

