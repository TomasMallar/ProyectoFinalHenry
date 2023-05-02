import { useDispatch, useSelector } from 'react-redux'
import { DeleteElement, getProductsAdvanceController, GetAllCategories, GetAllIngredientWithId, GetAllTypesWithId, PutElement } from '../../Redux/Actions/Actions'
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
    const [inputEdit, setInputEdit] = useState('');
    const [idToEdit, setIdToEdit] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [searchBar, setSearchBar] = useState("")
    useEffect(() => {
        dispatch(GetAllIngredientWithId())
        dispatch(GetAllCategories())
        dispatch(GetAllTypesWithId())
        dispatch(getProductsAdvanceController())

    }, [dispatch, searchBar])

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


    const handleOnClickAdd = (event) => {
        const objToAdd = { name: searchBar }
        dispatch(addIngredientCategoryType(objToAdd, toAdd))
        setSearchBar("")
        setToEdit([])
        setToAdd("")

    }

    const handleDelete = (event) => {
        const id = event.target.value
        dispatch(DeleteElement(id, toAdd))
        setToEdit([])
        setToAdd("")

    }
    const handleEdit = (event) => {
        setIdToEdit(event.target.value);
        setShowModal(true);
        setInputEdit(event.target.name)
    }
    const handleOnChangeEdit = (event) => {
        setInputEdit(event.target.value)
    }

    const handleSave = () => {
        const objChanged = {
            name: inputEdit
        }
        dispatch(PutElement(objChanged, idToEdit, toAdd))
        setShowModal(false);
        setInputEdit("")
        setToEdit([])
        setToAdd("")
    }
    const handleOnChangeSearchBar = (event) => {
        setSearchBar(event.target.value)

        if (toAdd === "ingredient") {
            const searched = allIngredients.filter(e => e.name.includes(event.target.value))
            setToEdit(searched)
        } else if (toAdd === "types") {
            const searched = allTypes.filter(e => e.name.includes(event.target.value))
            console.log("soy allTypes", allTypes, "y searched", searched)
            setToEdit(searched)
        } else if (toAdd === "categories") {
            const searched = allCategories.filter(e => e.name.includes(event.target.value))
            setToEdit(searched)
        }

    }
    return (
        <div className='min-h-screen'>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement} value={"ingredient"}>EDITAR INGREDIENTE </button>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement} value={"categories"}>EDITAR CATEGORÍA </button>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement} value={"types"}>EDITAR TIPO </button>
            <div className={style.addContainer}>
                {toAdd !== "" && <div>
                    <br />
                    {toAdd === "ingredient" && <label className={style.label} htmlFor="toAdd">{`AÑADIR INGREDIENTE`} </label>}
                    {toAdd === "categories" && <label className={style.label} htmlFor="toAdd">{`AÑADIR CATEGORÍA`} </label>}
                    {toAdd === "types" && <label className={style.label} htmlFor="toAdd">{`AÑADIR TIPO`} </label>}
                    <div className={style.searchBarContainer}>
                        <input className={style.searchBarImg} type="image" src='https://res.cloudinary.com/dgxs2jcyu/image/upload/v1682157431/lupa_1_nxqaw2.png' alt="search" />
                        <input className={style.searchBar} type="text" name="search" value={searchBar} placeholder='Buscar o Añadir' onChange={handleOnChangeSearchBar} />
                        <button className={style.button} value={toAdd} onClick={handleOnClickAdd}>AÑADIR</button>
                    </div>
                </div>}
            </div>

            {
                toEdit?.map(element => {
                    return (
                        <div className={style.container}>
                            <div className={style.cell}>{element.name}</div>
                            <div className={style.options}>
                                <div className={style.cell}> <button className={style.editButton} value={element.id} onClick={handleEdit} name={element.name}>Editar</button></div>
                                <div className={style.cell}> <button className={style.deleteButton} value={element.id} onClick={handleDelete}>Eliminar</button> </div>
                            </div>
                        </div>

                    )
                })
            }
            <div className={style.modal} style={{ display: showModal ? 'flex' : 'none' }}>
                <div className={style.modalContent}>
                    <h2>Editar elemento</h2>
                    <input type="text" value={inputEdit} onChange={handleOnChangeEdit} />
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

