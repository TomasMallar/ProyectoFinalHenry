import { useDispatch, useSelector } from 'react-redux'
import { DeleteCategorie, GetAllCategories, GetAllIngredient, GetAllTypes, PutCategorie } from '../../Redux/Actions/Actions'
import { useState, useEffect } from 'react'
import { addIngredientCategoryType } from '../../Redux/Actions/Actions'
import style from './editCTI.module.css'

export default function EditCategoryTypeIngredient() {


    const dispatch = useDispatch()
    const allIngredients = useSelector(state => state.ingredients)
    const allCategories = useSelector(state => state.categories)
    const allTypes = useSelector(state => state.types)
    const [toEdit, setToEdit] = useState([])
    const [toAdd, setToAdd] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputEdit, setInputEdit] = useState('');
    const [idToEdit, setIdToEdit] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(GetAllIngredient())
        dispatch(GetAllCategories())
        dispatch(GetAllTypes())

    }, [dispatch])

    const handleOnClickEdit = (event) => {
        event.preventDefault()
        const value = event.target.value
        if (value === "ingredient") {
            setToEdit(allIngredients)
            setToAdd(value)
        } else if (value === "categories") {
            setToEdit(allCategories)
            setToAdd(value)

        } else if (value === "types") {
            setToEdit(allTypes)
            setToAdd(value)

        }
    }
    const handleOnChangeAdd = (event) => {
        setInputValue(event.target.value)
    }

    const handleOnClickAdd = (event) => {
        const objToAdd = { name: inputValue }
        dispatch(addIngredientCategoryType(objToAdd, toAdd))
        setInputValue("")

    }

    const handleDelete = (event) => {
        const id = event.target.value
        if (toAdd === "categories") {
            dispatch(DeleteCategorie(id))
            setToEdit([])
        } if (toAdd === "types") {
        }

    }
    const handleEdit = (event) => {
        setIdToEdit(event.target.value);
        setShowModal(true);
    }
    const handleOnChangeEdit = (event) => {
        setInputEdit(event.target.value)
    }

    const handleSave = () => {
        const objCategorie = {
            name : inputEdit
        }
        dispatch(PutCategorie(objCategorie, idToEdit, toAdd))
        setShowModal(false);
    }
    return (
        <div>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement} value={"ingredient"}>EDITAR INGREDIENTE </button>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement}  value={"categories"}>EDITAR CATEGORÍA </button>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement} value={"types"}>EDITAR TIPO </button>
            <div className={style.addContainer}>
                {toAdd !== "" && <div>
                    <br />
                    {toAdd === "ingredient" && <label  className={style.label} htmlFor="toAdd">{`AÑADIR INGREDIENTE`} </label>}
                    {toAdd === "categories" && <label className={style.label} htmlFor="toAdd">{`AÑADIR CATEGORÍA`} </label>}
                    {toAdd === "types" && <label className={style.label} htmlFor="toAdd">{`AÑADIR TIPO`} </label>}
                    <input  className={style.input} type="text" onChange={handleOnChangeAdd} value={inputValue} />
                    <button className={style.button} value={toAdd} onClick={handleOnClickAdd}>AÑADIR</button>
                </div>}
            </div>

            {
                toEdit?.map(element => {
                    return (
                        <div className={style.container}>
                            <div className={style.cell}>{element.name || element}</div>
                          <div className={style.options}>
                           <div className={style.cell}> <button  className={style.editButton}value={element.id} onClick={handleEdit}>Editar</button></div>
                           <div className={style.cell}> <button className={style.deleteButton}  value={element.id} onClick={handleDelete}>Eliminar</button> </div>
                           </div>
                        </div>

                    )
                })
            }
            <div className={style.modal} style={{ display: showModal ? 'flex' : 'none' }}>
                <div className={style.modalContent}>
                    <h2>Editar elemento</h2>
                    <input type="text" value={inputEdit} onChange={handleOnChangeEdit}  />
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}