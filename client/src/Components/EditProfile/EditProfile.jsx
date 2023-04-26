import React from 'react'
import style from "./EditProfile.module.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PutEditProfile } from '../../Redux/Actions/Actions'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

const EditProfile = () => {
  const [editProfile, setEditProfile] = useState({});
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch()
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const {name, surname, mail, phone, date_of_birth} = JSON.parse(sessionStorage.getItem("user"));
  const id = sessionStorage.getItem('id');

  const handleInputChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;

    setEditProfile({
      ...editProfile,
      [property]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!Object.values(editProfile).length) {
      setErrors('Debe editar al menos un campo para poder enviar')
      setIsProfileUpdated(false);
    } else {
      dispatch(PutEditProfile(id, editProfile))
      alert('Perfil editado');
      setIsProfileUpdated(true);
      setErrors('')
      setEditProfile({})
    }
  }

  return isProfileUpdated ?
      <Redirect to="/home" /> 
      : 
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.container}>
          <div className={style.campos}>
            <h3>Current name</h3>
            <p>{name}</p>
            <label htmlFor="name">New name</label>
            <input name='name' value={editProfile.name} onChange={handleInputChange} type="text" />
          </div>

          <div className={style.campos}>
            <h3>Current surname</h3>
            <p>{surname}</p>
            <label htmlFor="surname">New surname</label>
            <input name='surname' value={editProfile.surname} onChange={handleInputChange} type="text" />
          </div>
          
          <div className={style.campos}>
            <h3>Current mail</h3>
            <p>{mail}</p>
            <label htmlFor="mail">New mail</label>
            <input name='mail' value={editProfile.mail} onChange={handleInputChange} type="text" />
          </div>
          
          <div className={style.campos}>
            <h3>Current phone</h3>
            <p>{phone}</p>
            <label htmlFor="phone">New phone</label>
            <input name='phone' value={editProfile.phone} onChange={handleInputChange} type="number" />
          </div>
          
          <div className={style.campos}>
            <h3>Current date of birthday</h3>
            <p>{date_of_birth}</p>
            <label htmlFor="date">New date of birthday</label>
            <input name='date' value={editProfile.date_of_birth} onChange={handleInputChange} type="date" />
          </div>
        </div>
        <p className={style.errors}>{errors}</p>
        <button type='submit' className={style.button}>Guardar</button>
        <Link to='/myprofile' className={style.buttonCancelar}>Cancelar</Link>
      </form>
    </div>
  }
  

export default EditProfile;