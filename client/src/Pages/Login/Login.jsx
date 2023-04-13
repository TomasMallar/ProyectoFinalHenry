import Button from '../../Components/Button/Button.jsx'
import style from './Login.module.css'
import { Link } from "react-router-dom";


export default function Login (){

    return (

        <div className={style.container}>
            <div className={style.formContainer}>
            <h2>Ingresa!</h2>
            <div className={style.inputContainer}>
            <label htmlFor="username">Usuario</label>
            <input type="text" name="username" id="" placeholder="username" />
            </div>
            <div className={style.inputContainer}>
            <label htmlFor="password">Contraseña</label>
            <input type="text" name="password" id="" placeholder="password" />
            </div>
            <Button text='Ingresar'/>

            <p> ¿Aún no tienes una cuenta? <Link to="/newUser">Crear Cuenta</Link> </p>
            
            </div>

        </div>
    )
}