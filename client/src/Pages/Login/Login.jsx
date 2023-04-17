import Button from '../../Components/Button/Button.jsx'
import style from './Login.module.css'
import { Link } from "react-router-dom";


export default function Login() {

    return (

        <div className={style.container}>


            <div className={style.formContainer}>
                <h2>Ingresa!</h2>
                <div className={style.inputContainer}>
                    <label htmlFor="username">Usuario</label>
                    <input type="text" name="username" id="" placeholder="username" className={style.input} />
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="password">Contraseña</label>
                    <input type="text" name="password" id="" placeholder="password" className={style.input} />
                </div>
                <button>Ingresar</button>

                <p> ¿Aún no tienes una cuenta? <Link to="/newUser">Crear Cuenta</Link> </p>
                <p> Volver al <Link to="/Home">Home</Link> </p>
            </div>

            <div className={style.message}>
                <h1>¡Bienvenid@ a The Chocolate hub! <br /> Inicia sesión para disfrutar de los mejores sabores y descubrir nuestras novedades. ¡Déjate tentar por el dulce placer del chocolate!</h1>
            </div>
        </div>
    )
}