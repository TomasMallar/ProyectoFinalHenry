import { useDispatch, useSelector } from 'react-redux'
import { DeleteElement, getProductsAdvanceController,GetAllCategories, GetAllIngredientWithId, GetAllTypesWithId, PutElement } from '../../Redux/Actions/Actions'
import { useState, useEffect } from 'react'
import { addIngredientCategoryType } from '../../Redux/Actions/Actions'
import style from './editCTI.module.css'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Validations from './validations'


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
    const [errors, setErrors] = useState("")
    const [errorsModal, setErrorsModal] = useState(false)
    const [failModal, setFailsModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)



    useEffect(() => {
        dispatch(GetAllIngredientWithId())
        dispatch(GetAllCategories())
        dispatch(GetAllTypesWithId())
        dispatch(getProductsAdvanceController())
       setErrors( Validations(searchBar))


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
        setErrors(Validations(searchBar))
        if(errors==="Ingrese un ingrediente válido"){
            setFailsModal(true)
        }else{
        dispatch(addIngredientCategoryType(objToAdd, toAdd))
        // setSearchBar("")
        // setErrors("")
        // setToEdit([])
        // setToAdd("")
        setErrorsModal(true)
        }

    }

    const handleDelete = (event) => {
        const id = event.target.value
        dispatch(DeleteElement(id, toAdd))
        // setToEdit([])
        // setToAdd("")
        setDeleteModal(true)

    }
    const handleEdit = (event) => {
        setIdToEdit(event.target.value);
        setShowModal(true);
        setInputEdit(event.target.name)
    }
    const handleOnChangeEdit = (event) => {
        setInputEdit(event.target.value)
        setErrors(Validations(event.target.value))
    }

    const handleSave = () => {
        const objChanged = {
            name: inputEdit
        }
        if(errors){
setFailsModal(true)     
   }else{
        dispatch(PutElement(objChanged, idToEdit, toAdd))
        setShowModal(false);
        // setInputEdit("")
        // setToEdit([])
        // setToAdd("")
        // setErrors("")
        setErrorsModal(true)
        }
    }
    const handleSaveOk = (event) => {
        setSearchBar("")
        setInputEdit("")
        setToEdit([])
        setToAdd("")
        setErrors("")
        setErrorsModal(false)
        setDeleteModal(false)
        
    }
    const handleSaveFail = (event) => {
       
       setFailsModal(false)
        
    }

    const handleOnChangeSearchBar = (event) => {
        setSearchBar(event.target.value)

        if (toAdd === "ingredient") {
            const searched = allIngredients.filter(e => e.name.includes(event.target.value))
            setToEdit(searched)
        } else if (toAdd === "types") {
            const searched = allTypes.filter(e => e.name.includes(event.target.value))
            setToEdit(searched)
        } else if (toAdd === "categories") {
            const searched = allCategories.filter(e => e.name.includes(event.target.value))
            setToEdit(searched)
        }

    }
    return (
        <div className={style.page}>
           <Link to="/crudProducts"> <button  className={style.buttonGoBack} ><ArrowBackIcon/>VOLVER A PRODUCTOS</button></Link>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement} value={"ingredient"}>EDITAR INGREDIENTE </button>
            <button onClick={handleOnClickEdit} className={style.buttonEditElement} value={"categories"}>EDITAR CATEGORÍA </button>
            <button  onClick={handleOnClickEdit} className={style.buttonEditElement} value={"types"}>EDITAR TIPO </button>

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

            <div className={style.modal} style={{ display: errorsModal ? 'flex' : 'none' }}>
                <div className={style.modalContent}>
                    <h2>Elemento añadido!!</h2>
                    <button onClick={handleSaveOk}>OK</button>
                </div>
            </div>
            <div className={style.modal} style={{ display: failModal ? 'flex' : 'none' }}>
                <div className={style.modalContent}>
                    <h2>Agrege un elemento válido!!</h2>
                    <button onClick={handleSaveFail}>OK</button>
                </div>
            </div>
            <div className={style.modal} style={{ display: deleteModal ? 'flex' : 'none' }}>
                <div className={style.modalContent}>
                    <h2>Elemento eliminado!</h2>
                    <button onClick={handleSaveOk}>OK</button>
                </div>
            </div>
        </div>
    )
}

