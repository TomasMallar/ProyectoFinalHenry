import React, { useEffect } from 'react';
import style from './EditProfile.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PutEditProfile } from '../../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const validate = (data) => {
  const errors = {};

  if (!data.password) {
    errors.password = 'El campo de contraseña es obligatorio';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'El campo de confirmación de contraseña es obligatorio';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
}

const EditProfilePassword = () => {
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const id = localStorage.getItem('id');

  const handleInputChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
  
    if (property === 'password') {
      setErrors(
        validate({
          ...editProfile,
          [property]: value,
          confirmPassword,
        })
      );
      setEditProfile({
        ...editProfile,
        [property]: value,
      });
    } else if (property === 'confirmPassword') {
      setErrors(
        validate({
          ...editProfile,
          password: editProfile.password,
          [property]: value,
        })
      );
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(editProfile).length === 0) {
      alert('Por favor, complete los campos');
      return;
    }
    
    if(!errors.password){
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
          <label htmlFor='password'>New password</label>
          <input
            name='password'
            value={editProfile.password}
            onChange={handleInputChange}
            type='password'
          />
        </div>

        <div className={style.campos}>
          <label htmlFor='confirmPassword'>Confirm new password</label>
          <input
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleInputChange}
            type='password'
          />
        </div>

        <p className={style.errors}>{errors.password}</p>
        <p className={style.errors}>{errors.confirmPassword}</p>
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

export default EditProfilePassword