import { useEffect, useRef, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { gapi } from "gapi-script"
import axios from 'axios';
import LoginButton from '../../Components/GoogleLogin/googleLogin.jsx';
import jwtDecode from 'jwt-decode';
import Fade from "react-reveal"

import style from './Login.module.css'

export default function Login() {

    const userRef = useRef()
    // const errorRef = useRef()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    // const [errorMsg, setErrorMsg] = useState("")
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        function start() {
            gapi.client.init({
                client_Id: "552260192142-vtjdl7oc8tdsflnrq9ibuc07dd6aun0l.apps.googleusercontent.com",
                scope: "",
            })

        };
        gapi.load('client:auth2', start)
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { mail: user, password };
        try {
            const response = await axios.post("http://localhost:3001/users/login", data);
            console.log(response.data);
            if (response.data.user) {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("Name", response.data.user.name);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                setUser("")
                setPassword("")
                setSuccess(true)
                const decodedToken = jwtDecode(response.data.token);
                const userRole = decodedToken.rol;
                const id = decodedToken.id
                sessionStorage.setItem('id', id)
                // Guardar el rol en sessionStorage
                sessionStorage.setItem("userRole", userRole);
                console.log("ESTE ES EL ROL:", userRole);
                window.location.reload();
            }
        } catch (error) {
            alert(error.response.data.message)
            console.error('There was a problem with the axios request:', error);
        }


    }

    const handleUsername = (e) => {
        e.preventDefault();
        setUser(e.target.value)
    }
    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }
    return (
        <div className="bg-[url('https://cdn.pixabay.com/photo/2017/08/01/02/10/dark-2562840_1280.jpg')] w-full h-screen pb-24 bg-chocolate-blanco bg-cover text-chocolate-oscuro">
            <Fade left cascade>

                {success ? (
                    <Redirect to="/home" />
                ) : (
                    <div className="flex items-center justify-start w-full font-serif">

                        <div className="flex flex-col items-center justify-center h-screen p-8 w-[400px] bg-chocolate-blanco">

                            <h2 className='pb-5 text-2xl '>
                                Ingresa!
                            </h2>

                            <form onSubmit={handleSubmit} className='my-6'>
                                <label htmlFor="username">Usuario</label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete='on'
                                    onChange={handleUsername}
                                    value={user}
                                    placeholder="username"
                                    className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro"
                                />
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={handlePassword}
                                    value={password}
                                    placeholder="password"
                                    className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro"
                                />

                                <button className="p-1 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol ">
                                    Ingresar
                                </button>
                            </form>

                            <p className='mb-2 text-chocolate-oscuro'>
                                ¿Aún no tienes una cuenta? <Link to="/newUser" >
                                    <span className='font-bold uppercase text-chocolate-bombom hover:decoration-chocolate-bombom hover:underline decoration-solid'>
                                        Crear Cuenta
                                    </span>
                                </Link>
                            </p>
                            <p className='mb-2 text-chocolate-oscuro'>
                                Volver al <Link to="/home">
                                    <span className='font-bold uppercase text-chocolate-bombom hover:decoration-chocolate-bombom hover:underline decoration-solid'>
                                        Home
                                    </span>
                                </Link>
                            </p>

                            <LoginButton />

                        </div>

                        <div className=" ml-80 w-[600px]">
                            <h1 className='font-serif text-4xl text-start text-chocolate-blanco'>¡Bienvenid@ a The Chocolate hub! <br /> Inicia sesión para disfrutar de los mejores sabores y descubrir nuestras novedades. ¡Déjate tentar por el dulce placer del chocolate!</h1>
                        </div>
                    </div>
                )}
            </Fade>
        </div>
    )
}