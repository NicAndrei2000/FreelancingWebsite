//rfce
import React from 'react';
import styles from "./Companies.module.css";
import {useState,useEffect} from 'react';
// import Home from "./pages/Home/Home"
import CompaniesList from '../../components/Companies/CompaniesList';
import AddCompany from '../../components/Companies/AddCompany';

function Companies() {


  // const [companies,setCompanies]=useState(null);

  const [user,setUser]=useState(null);
  
  useEffect(()=>{
    const storedUser=localStorage.getItem('user');
    setUser(JSON.parse(storedUser));
  },[]);


  const deleteCompanyHandler=(company)=>{
    console.log(company);
//     if(companies!=null){
// const updateCompanies=companies.filter(comp=>comp.id !== company.id);
//     setCompanies(updateCompanies);
//     }
    
  }

  return (
    <div className={styles.page}>
        <h1 className={styles.pageTitle}>Companies Page</h1>
      {/* OnSaveCompanyData={saveCompanyDataHandler} */}
      {
        user!==null?( user.tipUtilizator ==="Admin"?<AddCompany />
        :null):null
      }
    
    <CompaniesList  onDeleteCompanyI={deleteCompanyHandler} />
    </div>
  );
}

export default Companies
