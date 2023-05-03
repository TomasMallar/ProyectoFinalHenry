import { useDispatch, useSelector } from 'react-redux'
import { DeleteElement, getProductsAdvanceController, GetAllCategories, GetAllIngredientWithId, GetAllTypesWithId, PutElement } from '../../Redux/Actions/Actions'
import { useState, useEffect } from 'react'
import { addIngredientCategoryType } from '../../Redux/Actions/Actions'
import style from './editCTI.module.css'
import { Fade } from 'react-reveal'


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

    function goBack() {
        window.history.back();
    }

    return (
        <div className='min-h-screen font-serif bg-chocolate-blanco'>
            <Fade>
                <div className="w-[50%] flex justify-between">
                    <button className="flex items-center justify-center p-2 m-6 border-none shadow-lg w-fit h-fit bg-chocolate-oscuro text-chocolate-blanco rounded-2xl shadow-chocolate-bombom hover:bg-chocolate-bombom" onClick={goBack}>
                        <img src="https://res.cloudinary.com/dsaocvav7/image/upload/v1681707019/arrow_zxesaq.png" alt="" className="w-5 mr-4 invert " />
                        Volver
                    </button>
                </div>

                <button onClick={handleOnClickEdit} className="inline-block px-5 py-2 mx-6 mb-6 text-base text-center duration-300 ease-in border-none rounded shadow-lg bg-chocolate-oscuro text-chocolate-blanco hover:bg-chocolate-mantecol hover:shadow-xl hover:text-chocolate-oscuro" value={"ingredient"}>
                    EDITAR INGREDIENTE
                </button>
                <button onClick={handleOnClickEdit} className="inline-block px-5 py-2 mx-6 mb-6 text-base text-center duration-300 ease-in border-none rounded shadow-lg bg-chocolate-oscuro text-chocolate-blanco hover:bg-chocolate-mantecol hover:shadow-xl hover:text-chocolate-oscuro" value={"categories"}>
                    EDITAR CATEGORÍA
                </button>
                <button onClick={handleOnClickEdit} className="inline-block px-5 py-2 mx-6 mb-6 text-base text-center duration-300 ease-in border-none rounded shadow-lg bg-chocolate-oscuro text-chocolate-blanco hover:bg-chocolate-mantecol hover:shadow-xl hover:text-chocolate-oscuro" value={"types"}>
                    EDITAR TIPO
                </button>

                <div className="font-serif flex justify-center items-center mt-2.5 mb-5 ">
                    {toAdd !== "" && <div>
                        <br />
                        {toAdd === "ingredient" && <label className="mr-3 text-lg font-bold " htmlFor="toAdd">
                            {`AÑADIR INGREDIENTE`}
                        </label>}
                        {toAdd === "categories" && <label className="mr-3 text-lg font-bold " htmlFor="toAdd">
                            {`AÑADIR CATEGORÍA`}
                        </label>}
                        {toAdd === "types" && <label className="mr-3 text-lg font-bold " htmlFor="toAdd">
                            {`AÑADIR TIPO`}
                        </label>}

                        <div className="flex items-center p-2.5 ml-2.5 flex-1 mt-2.5">
                            <input className="w-5 h-5 mr-2 " type="image" src='https://res.cloudinary.com/dhh0nhqny/image/upload/v1683056755/Dise%C3%B1o_sin_t%C3%ADtulo__13_-removebg-preview_vd4tnr.png' alt="search" />

                            <input className="p-4 m-2 text-base border-none shadow-sm bg-chocolate-mantecol w-45 rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom cursor-text focus:outline-chocolate-bombom" type="text" name="search" value={searchBar} placeholder='Buscar o Añadir' onChange={handleOnChangeSearchBar} />

                            <button className="inline-block px-5 py-2 mx-1 my-2.5 text-base text-center duration-300 ease-in border-none rounded shadow-lg bg-chocolate-oscuro text-chocolate-blanco hover:bg-chocolate-mantecol hover:shadow-xl hover:text-chocolate-oscuro" value={toAdd} onClick={handleOnClickAdd}>
                                AÑADIR
                            </button>
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
            </Fade>
        </div>
    )
}

