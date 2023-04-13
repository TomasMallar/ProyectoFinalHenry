import style from './NewUser.module.css'
import Button from '../../Components/Button'
import { Link } from 'react-router-dom'
export default function User(){
    
    return (

        <div className={style.container}>
            
            <div className={style.formContainer}>
            <div className={style.volverButton}>
           <Link to="/login"><Button text="X"/></Link>
            </div>
            <h2>Crea tu Cuenta! </h2>
                <div className={style.inputContainer}>

                    <label htmlFor="email">Mail: </label>
                    <input type="text" name="email" placeholder="mail"/>
                </div>

                <div className={style.inputContainer}>
                    <label htmlFor="Username">Usuario: </label>
                    <input type="text" name="Username" placeholder='usuario' />
                </div>

                <div className={style.inputContainer}>
                    <label htmlFor="password">Contraseña: </label>
                    <input type="text" name="password" placeholder='contraseña' />
                </div>

                <div className={style.inputContainer}>
                    <label htmlFor="age">Edad: </label>
                    <input type="text"  name="age" placeholder='Edad'/>
                </div>
                 <Button text="Crear Cuenta" />
            </div>
            </div>
    )
}