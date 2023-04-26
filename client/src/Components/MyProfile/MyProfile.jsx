import React from 'react'
import style from "./MyProfile.module.css"
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const {id, name, surname, mail, phone, date_of_birth} = JSON.parse(sessionStorage.getItem("user"));

  const initials = (`${name[0]}${surname[0]}`).toUpperCase();

  return (
    <div className={style.container}>
      <div className={style.containerInfo}>
        <div className={style.initials}>{initials}</div>
        <h2 className={style.nameSurname}>{name} {surname}</h2>

        <div className={style.containerInfo2}>
          <p className={style.titleInfo2}>MAIL</p>
          <p className={style.mailPhoneDate}>{mail}</p>
          <p className={style.titleInfo2}>PHONE</p>
          <p className={style.mailPhoneDate}>{phone}</p>
          <p className={style.titleInfo2}>DATE OF BIRTHDAY</p>
          <p className={style.mailPhoneDate}>{date_of_birth}</p>
        </div>
      
        <Link to="/editprofile" className={style.button}>Editar</Link>
      </div>
    </div>
  )
}

export default MyProfile