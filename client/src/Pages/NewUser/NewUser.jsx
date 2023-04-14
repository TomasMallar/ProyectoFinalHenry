import style from './NewUser.module.css'
import Button from "../../Components/Button/Button"
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Validations from "./validations"
//import { addUser } from '../../Redux/Actions/Actions'
//import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function User() {
   // const dispatch = useDispatch()
    const history = useHistory()
    //guarda el imput seleccionado en Tipos de Chocolates preferidos
    const inputSelectFlavorsRef = useRef(null)

    const flavors = ["Chocolate Amargo", "Chocolate con Leche", "Chocolate Blanco", "Rellenos", "Tabletas", "Con Licor", "Con Frutos Secos"]
    // E. local newUser --> guarda info que inserte el user para luego enviar al post
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        date_of_birth: "",
        mail: "",
        phone: "",
        password: "",
        favorites_tastes: [],
    })
    // E.Local guarda las preferencias de chocolate del usuario del usuario
    const [selectedFlavors, setSelectedFlavors] = useState([])


    //E. Local para validar errores 
    const [errors, setErrors] = useState({})

    useEffect(() => {

        setNewUser({ ...newUser, favorites_tastes: selectedFlavors })

    }, [selectedFlavors]
    )

    const handleInputChange = (event) => {
        setErrors(Validations({ ...newUser, [event.target.name]: event.target.value }))
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
    }

    console.log(errors, "errores")

    const handleOnClickAdd = (event) => {
        event.preventDefault()
        const selectedFlavor = inputSelectFlavorsRef.current.value

        if (!flavors.includes(selectedFlavor)) { return alert("Elige un sabor válido!" + " " + '\ud83e\udd28') }
        if (selectedFlavor && !selectedFlavors.includes(selectedFlavor)) {
            setSelectedFlavors([...selectedFlavors, selectedFlavor])
        }
        setErrors(Validations({ ...newUser, favorites_tastes: selectedFlavor }))
        inputSelectFlavorsRef.current.value = ""
    }

    const handleOnclickX = (event) => {
        event.preventDefault()
        if (selectedFlavors.length - 1 < 1) {
            setSelectedFlavors([])
            setErrors(Validations({ ...newUser, favorites_tastes: [] }))
        }
        const updatedSelectedFlavors = selectedFlavors.filter((f) => f !== event.target.value)
        setSelectedFlavors(updatedSelectedFlavors)

    }

    const handleSubmit = (event) => {
         event.preventDefault()
        setErrors(Validations({ ...newUser, [event.target.name]: event.target.value }))
        const arrayErrors = Object.keys(errors)
        // chequea si existe name para que si no pones nada en ningun campo no se cree el usuario 
        if (arrayErrors.length || !newUser.name) {
            alert("Usuario no creado verificar errores en el formulario"+ " " + '\ud83e\uddd0')
        } else {
           // dispatch(addUser(newUser))
            alert("Felicitaciones has creado tu usuario !!" + " "+ '\ud83c\udf0d')
            setNewUser({
                name: "",
                surname: "",
                date_of_birth: "",
                mail: "",
                phone: "",
                password: "",
                favorites_tastes: [],
            })
            history.push("/login")
        }
    }
    

    console.log(" selected Flavors", selectedFlavors);
    console.log("NewUser", newUser);
    return (

        <div className={style.container}>
            <form onSubmit = {handleSubmit}>
                <div className={style.formContainer}>
                    <div className={style.volverButton}>
                        <Link to="/login"><Button text="X" /></Link>
                    </div>
                    <h2>Crea tu Cuenta! </h2>

                    <div className={style.inputContainer}>
                        <label htmlFor="name">Nombre: </label>
                        <input type="text" value={newUser.name} onChange={handleInputChange} name="name" placeholder='nombre' required />
                        <span>{errors.name}</span>
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="Surname">Apellido: </label>
                        <input type="text" value={newUser.surname} onChange={handleInputChange} name="surname" placeholder='apellido' required />
                        <span>{errors.surname}</span>
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="date_of_birth">Fecha de Nacimiento: </label>
                        <input type="date" value={newUser.date_of_birth} onChange={handleInputChange} name="date_of_birth" placeholder='fecha de nacimiento' required />
                        <span>{errors.date_of_birth}</span>
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="mail">Mail: </label>
                        <input type="email" value={newUser.mail} onChange={handleInputChange} name="mail" placeholder="mail" required />
                        <span>{errors.mail}</span>
                    </div>


                    <div className={style.inputContainer}>
                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" value={newUser.password} onChange={handleInputChange} name="password" placeholder='contraseña' required />
                        <span>{errors.password}</span>
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="phone">Celular: </label>
                        <input type="tel" value={newUser.phone} onChange={handleInputChange} name="phone" placeholder='celular' required />
                        <span>{errors.phone}</span>
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="chocolates">Elige tus chocolates favoritos:</label>
                        <input name="chocolates" id="chocolates" list="dataList" ref={inputSelectFlavorsRef} />
                        <datalist id="dataList">
                            {flavors.map(flav => {
                                return <option value={flav} key={flav}></option>
                            })}
                        </datalist>
                        <button onClick={handleOnClickAdd}>Añadir</button>
                        <span>{errors.favorites_tastes}</span>
                    </div>
                    <div className={style.inputContainer}>
                    
                        {
                            selectedFlavors.map(flav => {
                                return (
                                    <div>
                                        <span>{flav} </span>
                                        <button value={flav} onClick={handleOnclickX}>X</button>
                                    </div>

                                )

                            })
                        }
                    </div>
                    <br />
                    <input type="submit" value = "Crear Cuenta"/>


                </div>
            </form>
        </div>
    )
}