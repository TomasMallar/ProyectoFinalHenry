import React, { useEffect } from 'react';
import style from './EditProfile.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PutEditProfile } from '../../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Fade } from 'react-reveal';

const validate = (data) => {
  const errors = {};
  const regexPhone = /^\d{10}$/; // verifica numeros argentinos

  if (!regexPhone.test(data.phone)) {
    errors.phone =
      'Ingrese un celular válido con el formato codigo de area seguido de su número ';
  }

  return errors;
};

const EditProfilePhone = () => {
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState({});
  const [errors, setErrors] = useState({});
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const { phone } = JSON.parse(localStorage.getItem('user'));

  const id = localStorage.getItem('id');

  const handleInputChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;

    setErrors(
      validate({
        ...editProfile,
        [property]: value,
      })
    );

    setEditProfile({
      ...editProfile,
      [property]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(editProfile).length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor, complete los campos',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!errors.phone) {
      dispatch(PutEditProfile(id, editProfile));

      const userData = JSON.parse(localStorage.getItem('user'));
      const updatedUserData = { ...userData, ...editProfile };
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      Swal.fire({
        icon: 'success',
        title: 'Perfil editado',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setIsProfileUpdated(true);
        setErrors('');
        setEditProfile({});
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal, por favor intenta nuevamente',
        showConfirmButton: false,
        timer: 2000,
      });
      setIsProfileUpdated(false);
    }
  };

  return isProfileUpdated ? (
    <Redirect to='/myprofile' />
  ) : (
    <Fade>
      <div className="flex flex-col items-center pt-12 h-[70vh] bg-chocolate-blanco font-serif">
        <h3 className="mt-5 text-4xl font-bold">
          Edita aquí tu celular por favor:
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center pt-12 ">
            <div className="flex flex-col justify-center items-center m-2.5 rounded-3xl border w-[500px] h-36">
              <label htmlFor='phone'>
                Nuevo celular
              </label>
              <input
                name='phone'
                value={editProfile.surname}
                onChange={handleInputChange}
                type='number'
                className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro"
              />
            </div>
            <Fade bottom opposite cascade >
              <span className="p-0 m-0 text-base text-chocolate-oscuro">{errors.phone}</span>
            </Fade>
            <div>
              <button type='submit' className="p-1.5 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-bombom">
                Guardar
              </button>
              <Link to='/myprofile' className="p-2 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-bombom">
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default EditProfilePhone;
