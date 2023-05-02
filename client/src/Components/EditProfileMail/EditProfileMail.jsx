import React, { useEffect } from 'react';
import style from './EditProfile.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PutEditProfile } from '../../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const validate = (data) => {
  const errors = {}; 
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  if (!data.mail) {
    errors.mail = 'Para enviar el dato debe estar completo'
  } else if(!regexMail.test(data.mail)) {
    errors.mail = 'El mail debe ser valido'
  } 

  return errors;
}

const EditProfileMail = () => {
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const {mail} = JSON.parse(
    localStorage.getItem('user')
  );

  const id = localStorage.getItem('id');

  const handleInputChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;

    setErrors(
      validate({
        ...editProfile,
        [property] : value,
      })
    )

    setEditProfile({
      ...editProfile,
      [property]: value,
    });
  };
 
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const updatedUserData = { ...userData, ...editProfile };
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  }, [editProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(editProfile).length === 0) {
      alert('Por favor, complete los campos');
      return;
    }
    
    if(!errors.mail){
      dispatch(PutEditProfile(id, editProfile));
      alert('Perfil editado');
      setIsProfileUpdated(true);
      setErrors('');
      setEditProfile({});
    } else {
      alert("Something went wrong. Please try again");
      setIsProfileUpdated(false);
    }
  };


  return isProfileUpdated ? (
    <Redirect to='/myprofile' />
  ) : (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.container}>
          <div className={style.campos}>
                  <label htmlFor='mail'>New mail</label>
                  <input
                    name='mail'
                    value={editProfile.mail}
                    onChange={handleInputChange}
                    type='text'
                  />
          </div>
        <p className={style.errors}>{errors.mail}</p>
        <button type='submit' className={style.button}>
          Guardar
        </button>
        <Link to='/myprofile' className={style.buttonCancelar}>
          Cancelar
        </Link>
        </div>
      </form>
    </div>
  );
}

export default EditProfileMail