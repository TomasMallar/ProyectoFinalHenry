import { useEffect, useRef, useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import {gapi} from "gapi-script"

import LoginButton from '../../Components/Login/login.jsx';
import LogoutButton from '../../Components/Logout/Logout.jsx';

import style from './Login.module.css'

export default function Login() {

    const userRef = useRef()
    const errorRef = useRef()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [success, setSuccess] = useState(false)
    

    useEffect(()=>{
        function start() {
            gapi.client.init({
                client_Id: "552260192142-vtjdl7oc8tdsflnrq9ibuc07dd6aun0l.apps.googleusercontent.com",
                scope: "",
            })
            
        };
        gapi.load('client:auth2', start)
    })

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(user, password, "login inputs");
        setUser("")
        setPassword("")
        setSuccess(true)
    }

    const handleUsername = (e) =>{
        e.preventDefault();
        setUser(e.target.value)
    }
    const handlePassword = (e) =>{
        e.preventDefault();
        setPassword(e.target.value)
    }
    return (
        

        <>
           { success? (
                <Redirect to="/home" />
            ):(
        
        <div className={style.container}>


            <div className={style.formContainer}>
                <h2>Ingresa!</h2>
                <form className={style.inputContainer} onSubmit={handleSubmit}>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={handleUsername}
                        value={user}
                        placeholder="username"
                        className={style.input}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        onChange={handlePassword}
                        value={password}
                        placeholder="password"
                        className={style.input}
                    />
                <button>Ingresar</button>
                </form>

                <p> ¿Aún no tienes una cuenta? <Link to="/newUser">Crear Cuenta</Link> </p>
                <p> Volver al <Link to="/home">Home</Link> </p>
                <LoginButton />
                <LogoutButton />
            </div>

            <div className={style.message}>
                <h1>¡Bienvenid@ a The Chocolate hub! <br /> Inicia sesión para disfrutar de los mejores sabores y descubrir nuestras novedades. ¡Déjate tentar por el dulce placer del chocolate!</h1>
            </div>
        </div>
    )}</>
    )
}