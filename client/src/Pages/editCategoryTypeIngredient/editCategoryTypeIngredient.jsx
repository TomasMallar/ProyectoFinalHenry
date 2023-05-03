import { useDispatch, useSelector } from 'react-redux'
import { DeleteElement, getProductsAdvanceController, GetAllCategories, GetAllIngredientWithId, GetAllTypesWithId, PutElement } from '../../Redux/Actions/Actions'
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
        setErrors(Validations(searchBar))


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
        if (errors === "Ingrese un ingrediente válido") {
            setFailsModal(true)
        } else {
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
        if (errors) {
            setFailsModal(true)
        } else {
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

    function goBack() {
        window.history.back();
    }

    return (
        <div className="min-h-screen font-serif bg-chocolate-blanco">
            <Link to="/crudProducts"> <button className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ease-in duration-300" ><ArrowBackIcon />VOLVER A PRODUCTOS</button></Link>
            <button onClick={handleOnClickEdit} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ease-in duration-300" value={"ingredient"}>EDITAR INGREDIENTE </button>
            <button onClick={handleOnClickEdit} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ease-in duration-300" value={"categories"}>EDITAR CATEGORÍA </button>
            <button onClick={handleOnClickEdit} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ease-in duration-300" value={"types"}>EDITAR TIPO </button>

            <div className="flex justify-center items-center mt-2.5 mb-5">
                {toAdd !== "" && <div>
                    <br />
                    {toAdd === "ingredient" && <label className=" text-lg font-bold mr-2.5" htmlFor="toAdd">{`AÑADIR INGREDIENTE`} </label>}
                    {toAdd === "categories" && <label className=" text-lg font-bold mr-2.5" htmlFor="toAdd">{`AÑADIR CATEGORÍA`} </label>}
                    {toAdd === "types" && <label className=" text-lg font-bold mr-2.5" htmlFor="toAdd">{`AÑADIR TIPO`} </label>}
                    <div className="flex items-center rounded p-1 ml-2.5 flex-1 mt-2.5">
                        <input className="w-5 h-5 " type="image" src='https://res.cloudinary.com/dhh0nhqny/image/upload/v1683056755/Dise%C3%B1o_sin_t%C3%ADtulo__13_-removebg-preview_vd4tnr.png' alt="search" />
                        <input className="flex-1 border-none ml-2.5 mr-2.5 text-base" type="text" name="search" value={searchBar} placeholder='Buscar o Añadir' onChange={handleOnChangeSearchBar} />
                        <button className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl " value={toAdd} onClick={handleOnClickAdd}>AÑADIR</button>
                    </div>
                </div>}
            </div>

            {
                toEdit?.map(element => {
                    return (
                        <div className="table w-full mb-5 font-serif border-collapse table-fixed ">
                            <div className=" table-cell p-2.5 border-b text-center break-all w-[50%]">{element.name}</div>
                            <div className='table-cell p-2.5 border-b text-center break-all w-[50%]'>
                                <div className="table-cell p-2.5  text-center break-all">
                                    <button className="inline-block px-5 py-2 ml-20 my-2.5 text-base text-center duration-300 ease-in border-none rounded shadow-lg bg-chocolate-bombom text-chocolate-blanco hover:bg-chocolate-oscuro hover:shadow-xl hover:text-chocolate-blanco" value={element.id} onClick={handleEdit} name={element.name}>
                                        Editar
                                    </button>
                                </div>
                                <div className="table-cell p-2.5  text-center break-all">
                                    <button className="inline-block px-5 py-2 mx-1 ml-20 text-base text-center duration-300 ease-in border-none rounded shadow-lg bg-chocolate-bombom text-chocolate-blanco hover:bg-chocolate-oscuro hover:shadow-xl hover:text-chocolate-blanco" value={element.id} onClick={handleDelete}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-blacky" style={{ display: showModal ? 'flex' : 'none' }}>
                <div className="flex flex-col items-center justify-center w-full max-w-lg p-5 rounded shadow-lg bg-chocolate-blanco">
                    <h2>Editar elemento</h2>
                    <input type="text" value={inputEdit} onChange={handleOnChangeEdit} className='block mb-2.5 w-full p-2.5 text-base rounded-md border' />
                    <button onClick={handleSave} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ">Guardar</button>
                    <button onClick={() => setShowModal(false)} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ">Cancelar</button>
                </div>
            </div>

            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-blacky" style={{ display: errorsModal ? 'flex' : 'none' }}>
                <div className="flex flex-col items-center justify-center w-full max-w-lg p-5 rounded shadow-lg bg-chocolate-blanco">
                    <h2>Elemento añadido!!</h2>
                    <button onClick={handleSaveOk} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ">OK</button>
                </div>
            </div>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-blacky" style={{ display: failModal ? 'flex' : 'none' }}>
                <div className="flex flex-col items-center justify-center w-full max-w-lg p-5 rounded shadow-lg bg-chocolate-blanco">
                    <h2>Agrege un elemento válido!!</h2>
                    <button onClick={handleSaveFail} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ">OK</button>
                </div>
            </div>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-blacky" style={{ display: deleteModal ? 'flex' : 'none' }}>
                <div className="flex flex-col items-center justify-center w-full max-w-lg p-5 rounded shadow-lg bg-chocolate-blanco">
                    <h2>Elemento eliminado!</h2>
                    <button onClick={handleSaveOk} className="py-2.5 px-5  bg-chocolate-oscuro text-chocolate-blanco border-none rounded text-base mr-2.5 mt-2.5 hover:bg-chocolate-bombom hover:shadow-xl ">OK</button>
                </div>
            </div>
        </div>
    )
}

