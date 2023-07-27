import React, { useEffect, useState } from "react";
import styles from "./CompaniesItem.module.css";
import deleteIcon from "./../../assets/icons/trash.svg";

function CompaniesItem(props) {
  const [typeUser, setTypeUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userParse = JSON.parse(user);
    setTypeUser(userParse.tipUtilizator);
  }, []);
  const deleteCompanyItemHandler = () => {
    const Company = {
      id: props.id,
      cName: props.companyName,
      cEmail: props.companyEmail,
    };
    props.onDeleteCompanyItem(Company);
  };

  return (
    <>
      <div className={styles.tableRow}>
        <div className={styles.tableCell}>{props.companyName}</div>
        {typeUser !== null && typeUser === "Admin" ? (
          <div className={styles.tableCell}>{props.companyIdenNb}</div>
        ) : (
          typeUser !== null && (
            <div className={styles.tableCell}>Access restricted!</div>
          )
        )}
        {typeUser !== null && typeUser === "Admin" ? (
          <div className={styles.tableCell}>{props.companyAccessCode}</div>
        ) : (
          typeUser !== null && (
            <div className={styles.tableCell}>Access restricted!</div>
          )
        )}
        <div className={styles.tableCell}>{props.companyContact}</div>
        <div className={styles.tableCell}>{props.companyEmail}</div>
        <div className={styles.tableCell}>
        {typeUser !== null && typeUser === "Admin" ? (
          <img
          src={deleteIcon}
          alt="Delete icon"
          onClick={deleteCompanyItemHandler}
          className={styles.actionBtn}
        />
        ) : null}
          
        </div>
      </div>
    </>
    //       <td><h2>{props.companyName}</h2></td>
    //       <td>{props.companyIdenNb}</td>
    //       <td>{props.companyAccessCode}</td>
    //       <td>{props.companyContact}</td>
    //       <td>{props.companyEmail}</td>
    //       <td><button type='button' onClick={deleteCompanyItemHandler}>Delete</button></td>
    //     </tr>
    //   </tbody>
    // </table>
  );
}

{
  /* <li className={styles.liModify}>
      <div className={styles.companyItem}>
        <div className="companyItem_name">
            <h2>{props.companyName}</h2>
        </div>
        <div className="companyItem_IdentNb">{props.companyIdenNb}</div>
        <div className="companyItem_AccessCode">{props.companyAccessCode}</div>
        <div className="companyItem_Contact">{props.companyContact}</div>
        <div className="companyItem_email">{props.companyEmail}</div>
        <div className="companyItem_button"><button type='button' onClick={deleteCompanyItemHandler}>Delete</button></div>
        </div>
    </li> */
}

export default CompaniesItem;
