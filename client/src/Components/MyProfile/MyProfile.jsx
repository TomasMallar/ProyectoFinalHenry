import React, { useEffect, useState } from 'react'
import style from "./MyProfile.module.css"
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    surname: '',
    mail: '',
    phone: '',
    date_of_birth: '',
  });

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    setUser(userData);
  }, []);

  const { id, name, surname, mail, phone, date_of_birth } = user;

  useEffect(() => {
    const updatedUserData = { ...user, name, surname };
    sessionStorage.setItem('user', JSON.stringify(updatedUserData));
  }, [name, surname]);

  const initials = (`${name[0]}${surname[0]}`).toUpperCase();

  return (
    <div className={style.container}>
      <div className={style.containerInfo}>
        <div className={style.initials}>{initials}</div>
        <h2 className={style.nameSurname}>{name} {surname}</h2>
        
        <div className={style.containerInfo2}>
          <p className={style.titleInfo2}>Name</p>
          <p className={style.mailPhoneDate}>{name}</p>
          <Link to="/editname" className={style.button}>Editar</Link>

          <p className={style.titleInfo2}>Surname</p>
          <p className={style.mailPhoneDate}>{surname}</p>
          <Link to="/editsurname" className={style.button}>Editar</Link>

          <p className={style.titleInfo2}>MAIL</p>
          <p className={style.mailPhoneDate}>{mail}</p>
          <Link to="/editmail" className={style.button}>Editar</Link>

          <p className={style.titleInfo2}>PHONE</p>
          <p className={style.mailPhoneDate}>{phone}</p>
          <Link to="/editphone" className={style.button}>Editar</Link>

          <p className={style.titleInfo2}>DATE OF BIRTHDAY</p>
          <p className={style.mailPhoneDate}>{date_of_birth}</p>
          <Link to="/editdate" className={style.button}>Editar</Link>

          <p className={style.titleInfo2}>PASSWORD</p>
          <p className={style.mailPhoneDate}>*******</p>
          <Link to="/editpassword" className={style.button}>Editar</Link>
        </div>
      </div>
    </div>
  )
}

export default MyProfile