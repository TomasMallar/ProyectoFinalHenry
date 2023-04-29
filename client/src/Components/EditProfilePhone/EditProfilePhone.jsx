import React, { useEffect } from 'react';
import style from './EditProfile.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PutEditProfile } from '../../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const validate = (data) => {
  const errors = {}; 
  const regexPhone = /^\d{10}$/ // verifica numeros argentinos 

  if (!regexPhone.test(data.phone)) {
    errors.phone = "Ingrese un celular válido con el formato codigo de area seguido de su número "
    }

  return errors;
}

const EditProfilePhone = () => {
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const {phone} = JSON.parse(
    sessionStorage.getItem('user')
  );

  const id = sessionStorage.getItem('id');

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
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const updatedUserData = { ...userData, ...editProfile };
    sessionStorage.setItem('user', JSON.stringify(updatedUserData));
  }, [editProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(editProfile).length === 0) {
      alert('Por favor, complete los campos');
      return;
    }

    if(!errors.phone){
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
                  <label htmlFor='phone'>New phone</label>
                  <input
                    name='phone'
                    value={editProfile.surname}
                    onChange={handleInputChange}
                    type='number'
                  />
          </div>
        <p className={style.errors}>{errors.phone}</p>
        <button type='submit' className={style.button} >
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

export default EditProfilePhone
