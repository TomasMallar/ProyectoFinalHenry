import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./MenuProfile.module.css"
import Flip from 'react-reveal/Flip';

const MenuProfile = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    //Sea a lo contrario del valor de isNavActive
    setIsNavActive(!isNavActive);
  };

  const { name } = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Flip left cascade>
        {isNavActive ?
          <button onClick={toggleNav} className={`text-2xl list-none text-red-oscuro no-underline pl-3.5  font-serif`}>{name}</button>
          : <button onClick={toggleNav} className={`text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif`} >{name}</button>
        }
        <div className={`${styles.containerNav} ${isNavActive ? styles.active : ""}`}>
          <div className={`${styles.buttonsNav} ${isNavActive ? styles.active : ""}`}>
            <Link to="/myshopping">My Shopping</Link>
            <Link to="/myprofile">My Profile</Link>
          </div>
        </div>
      </Flip>
    </div >


  )
}

export default MenuProfile