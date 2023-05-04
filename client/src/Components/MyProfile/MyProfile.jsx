import React, { useEffect, useState } from 'react'
import style from "./MyProfile.module.css"
import { Link } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Fade } from 'react-reveal'

const MyProfile = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    surname: '',
    mail: '',
    phone: '',
    date_of_birth: '',
    image: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('1', localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const { id, name, surname, mail, phone, date_of_birth, image } = user;

  useEffect(() => {
    const updatedUserData = { ...user, name, surname };
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    console.log('2', updatedUserData);
  }, [name, surname]);

  const initials = (`${name[0]}${surname[0]}`).toUpperCase();

  return (
    <div className="flex items-start justify-center min-h-full font-serif min-w-screen bg-chocolate-blanco">
      <Fade cascade>

        <div className="flex flex-col w-1/2 p-5 my-5 h-1/2 bg-chocolate-mantecol rounded-2xl">

          <div className="flex items-center justify-evenly ">
            <div>
              <img src={image} alt={initials} className="flex items-center justify-center mt-5 mb-5 text-3xl font-bold rounded-full bg-chocolate-bombom w-28 h-28" />
              <Link to="/editimage" className="px-4 py-2 mb-5 text-center bg-chocolate-bombom rounded-3xl w-52 h-52 text-chocolate-blanco hover:bg-chocolate-oscuro">
                Editar
              </Link>
            </div>

            <h2 className="text-3xl font-bold">
              {name} {surname}
            </h2>
          </div>

          <div className="flex items-center justify-around ">
            <div className='w-1/2 '>
              <p className="my-5 text-xl font-bold">
                Nombre
              </p>
              <p className="my-5 text-lg">
                {name}
              </p>
              <Link to="/editname" className="px-4 py-2 mb-5 text-center bg-chocolate-bombom rounded-3xl w-52 h-52 text-chocolate-blanco hover:bg-chocolate-oscuro">
                Editar
              </Link>
            </div>

            <div className='w-1/2 '>
              <p className="my-5 text-xl font-bold">
                Apellido
              </p>
              <p className="my-5 text-lg">
                {surname}
              </p>
              <Link to="/editsurname" className="px-4 py-2 mb-5 text-center bg-chocolate-bombom rounded-3xl w-52 h-52 text-chocolate-blanco hover:bg-chocolate-oscuro">
                Editar
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-around ">
            <div className='w-1/2 '>
              <p className="my-5 text-xl font-bold">
                Email
              </p>
              <p className="my-5 text-lg">
                {mail}
              </p>
              <Link to="/editmail" className="px-4 py-2 mb-5 text-center bg-chocolate-bombom rounded-3xl w-52 h-52 text-chocolate-blanco hover:bg-chocolate-oscuro">
                Editar
              </Link>
            </div>

            <div className='w-1/2 '>
              <p className="my-5 text-xl font-bold">
                Telefono
              </p>
              <p className="my-5 text-lg">
                {phone}
              </p>
              <Link to="/editphone" className="px-4 py-2 mb-5 text-center bg-chocolate-bombom rounded-3xl w-52 h-52 text-chocolate-blanco hover:bg-chocolate-oscuro">
                Editar
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-evenly">
            <div className='w-1/2 '>
              <p className="my-5 text-xl font-bold">
                Fecha de cumpleaños
              </p>
              <p className="my-5 text-lg">
                {date_of_birth}
              </p>
              <Link to="/editdate" className="px-4 py-2 mb-5 text-center bg-chocolate-bombom rounded-3xl w-52 h-52 text-chocolate-blanco hover:bg-chocolate-oscuro">
                Editar
              </Link>
            </div>

            <div className='w-1/2 '>
              <p className="my-5 text-xl font-bold">
                Contraseña
              </p>
              <p className="my-5 text-lg">
                *******
              </p>
              <Link to="/editpassword" className="px-4 py-2 mb-5 text-center bg-chocolate-bombom rounded-3xl w-52 h-52 text-chocolate-blanco hover:bg-chocolate-oscuro">
                Editar
              </Link>
            </div>
          </div>

        </div>
      </Fade>
    </div>
  )
}

export default MyProfile;