import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from "./MenuProfile.module.css"

const MenuProfile = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    //Sea a lo contrario del valor de isNavActive
    setIsNavActive(!isNavActive);
  };

  return (
  <div className={styles.container}>
    {isNavActive ? 
      <button onClick={toggleNav} className={`text-2xl list-none text-red-oscuro no-underline pl-3.5  font-serif`}>X</button> 
      :<button onClick={toggleNav} className={`text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif`} >NAME</button>
      }
    <div className={`${styles.containerNav} ${isNavActive ? styles.active : ""}`}>
      <div className={`${styles.buttonsNav} ${isNavActive ? styles.active : ""}`}>
        <Link to="/myshopping">My Shopping</Link>
        <Link to="/myprofile">My Profile</Link>
      </div>
    </div>
  </div>
      
    
  )
}

export default MenuProfile