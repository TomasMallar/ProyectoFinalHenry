import style from './CreateProduct.module.css'
import { useRef, useEffect, useState } from 'react'
import { GetAllTypes, GetAllCategories, GetAllIngredient, addChocolate } from '../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import CreateProdCard from './ProductCard'
import Button from '../../Components/Button/Button'
import Validations from './validations'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Fade } from 'react-reveal'

export default function CreateProduct() {

    const history = useHistory()

    const inputSelectedTypeRef = useRef(null)
    const inputSelectedCategoryRef = useRef(null)
    const inputSelectedIngredientRef = useRef(null)

    const dispatch = useDispatch()

    const types = useSelector((state) => state.types)
    const statecategories = useSelector((state) => state.categories)
    const categories = statecategories.map(c => c.name)
    const ingredients = useSelector((state) => state.ingredients)

    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [errors, setErrors] = useState({})
    const [showModalOk, setShowModalOk] = useState(false)
    const [showModalNotOk, setShowModalNotOk] = useState(false)

    const [newChocolate, setNewChocolate] = useState({
        name: "",
        price: "",
        stock: "",
        image: "",
        types: [],
        categories: [],
        ingredients: []
    })
    const newChocolatePost = { ...newChocolate, price: Number(newChocolate.price), stock: Number(newChocolate.stock) }

    console.log("Chocolate a post", newChocolatePost)
    useEffect(() => {
        dispatch(GetAllTypes())
        dispatch(GetAllCategories())
        dispatch(GetAllIngredient())

        setNewChocolate({ ...newChocolate, types: selectedTypes, ingredients: selectedIngredients, categories: selectedCategories })
    }, [dispatch, selectedCategories, selectedIngredients, selectedTypes])

    const handleOnChangeInput = (event) => {
        event.preventDefault()
        setErrors(Validations({ ...newChocolate, [event.target.name]: event.target.value }))
        setNewChocolate({ ...newChocolate, [event.target.name]: event.target.value })
    }
    const handleOnClickAddType = (event) => {
        event.preventDefault()
        const selectedType = inputSelectedTypeRef.current.value
        if (!types.includes(selectedType)) { return alert("Elige un tipo válido! ", '\ud83e\udd28') }
        if (selectedType && !selectedTypes.includes(selectedType)) {
            setSelectedTypes([...selectedTypes, selectedType])
            setErrors(Validations({ ...newChocolate, types: selectedType }))

        }
        inputSelectedTypeRef.current.value = ""
    }
    const handleOnClickAddCategory = (event) => {
        event.preventDefault()
        const selectedCategory = inputSelectedCategoryRef.current.value
        if (!categories.includes(selectedCategory)) { return alert("Elige una categoría válida! ", '\ud83e\udd28') }
        if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
            setSelectedCategories([...selectedCategories, selectedCategory])
            setErrors(Validations({ ...newChocolate, categories: selectedCategory }))

        }
        inputSelectedCategoryRef.current.value = ""
    }
    const handleOnClickAddIngredient = (event) => {
        event.preventDefault()
        const selectedIngredient = inputSelectedIngredientRef.current.value
        if (!ingredients.includes(selectedIngredient)) { return alert("Elige un ingrediente válido! ", '\ud83e\udd28') }
        if (selectedIngredient && !selectedIngredients.includes(selectedIngredient)) {
            setSelectedIngredients([...selectedIngredients, selectedIngredient])
            setErrors(Validations({ ...newChocolate, ingredients: selectedIngredient }))
        }
        inputSelectedIngredientRef.current.value = ""
    }

    const handleOnclickXType = (event) => {
        event.preventDefault()
        if (selectedTypes.length - 1 < 1) {
            setSelectedTypes([])
            setErrors(Validations({ ...newChocolate, types: [] }))
        }
        const updatedSelectedTypes = selectedTypes.filter((t) => t !== event.target.value)
        setSelectedTypes(updatedSelectedTypes)
    }
    const handleOnclickXCategory = (event) => {
        event.preventDefault()
        if (selectedCategories.length - 1 < 1) {
            setSelectedCategories([])
            setErrors(Validations({ ...newChocolate, categories: [] }))
        }
        const updatedSelectedCategories = selectedCategories.filter((c) => c !== event.target.value)
        setSelectedCategories(updatedSelectedCategories)
    }

    const handleOnclickXIngredient = (event) => {
        event.preventDefault()
        if (selectedIngredients.length - 1 < 1) {
            setSelectedIngredients([])
            setErrors(Validations({ ...newChocolate, ingredients: [] }))
        }
        const updatedSelectedIngredients = selectedIngredients.filter((ing) => ing !== event.target.value)
        setSelectedIngredients(updatedSelectedIngredients)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrors(Validations(newChocolate))
        const arrayErrors = Object.keys(errors)
        console.log("soy errors", errors)
        if (arrayErrors.length || !newChocolate.name || !newChocolate.image) {
            setShowModalNotOk(true)
        } else {
            dispatch(addChocolate(newChocolatePost))
            // alert("Felicitaciones has creado el producto !! ", '\ud83c\udf89')
            setShowModalOk(true)
            // setNewChocolate({
            //     name: "",
            //     surname: "",
            //     date_of_birth: "",
            //     mail: "",
            //     phone: "",
            //     password: "",
            //     favorites_tastes: [],
            // })
            // history.push("/crudProducts")
        }
    }
    const handleSaveOk = (event) => {
        // history.push("/crudProducts")
        setShowModalOk(false)
        setNewChocolate({
            name: "",
            surname: "",
            date_of_birth: "",
            mail: "",
            phone: "",
            password: "",
            favorites_tastes: [],
        })
        history.push("/crudProducts")
    }
    const handleSaveNotOk = (event) => {
        // history.push("/crudProducts")
        setShowModalNotOk(false)
    }
    //--------------- CLOUDINARY ------------------------------

    const [fileInputState, setFileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState()

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleSubmitFile = (e) => {
        if (!previewSource) return
        uploadImage(previewSource)
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage);

        try {
            const response = await axios.post('/upload', { data: base64EncodedImage });
            console.log(response.data.secure_url)
            setNewChocolate({ ...newChocolate, image: response.data.secure_url })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="bg-[url('https://cdn.pixabay.com/photo/2017/08/01/02/10/dark-2562840_1280.jpg')] bg-cover w-full h-full flex justify-start items-center font-serif bg-chocolate-blanco text-chocolate-oscuro">

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-full w-[50%] bg-chocolate-blanco">

                <div className='flex justify-between w-[100%]'>
                    <div className="flex flex-col flex-wrap items-center justify-center w-[50%] h-36">
                        <label htmlFor="name">
                            Nombre del Producto:
                        </label>
                        <input onChange={handleOnChangeInput} type="text" name="name" placeholder="nombre del producto" value={newChocolate.name} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.name}</span>
                        </Fade>
                    </div>
                    <div className="flex flex-col flex-wrap items-center justify-center w-[50%] mr-2 h-36">
                        <label htmlFor="price">
                            Precio:
                        </label>
                        <input onChange={handleOnChangeInput} type="number" name="price" placeholder="precio del producto" value={newChocolate.price}
                            className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.price}</span>
                        </Fade>
                    </div>
                </div>

                <div className='flex justify-evenly w-[100%]'>
                    <div className="flex flex-col flex-wrap items-center justify-start w-[40%] ml-10 h-36">
                        <label htmlFor="stock">
                            Cantidad en stock:
                        </label>
                        <input onChange={handleOnChangeInput} type="number" name="stock" placeholder="stock del producto" value={newChocolate.stock} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.stock}</span>
                        </Fade>
                    </div>

                    <div className="flex flex-col flex-wrap items-center justify-start w-[60%] ml-8 max-h-96">
                        <label htmlFor="category">
                            Categorias:
                        </label>
                        <input name="category" id="category" list="dataListCategories" ref={inputSelectedCategoryRef} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <datalist id="dataListCategories">
                            {categories.map((c) => {
                                return <option value={c} key={c}></option>
                            })}
                        </datalist>
                        <button onClick={handleOnClickAddCategory} className="p-1 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol">
                            Añadir Categoria
                        </button>
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.categories}</span>
                        </Fade>
                        <div className="flex flex-col flex-wrap items-start justify-start w-full mt-2 mr-2 max-h-36">
                            {
                                selectedCategories.map((type) => {
                                    return (
                                        <div className='flex mt-1 mr-1 text-left w-fit justify-evenly '>
                                            <span className='m-1 break-words'>-{type} </span>
                                            <button value={type} onClick={handleOnclickXCategory} className='p-1 rounded-lg shadow-sm h-fit bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol'>X</button>
                                        </div>

                                    )

                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='flex justify-between w-[100%]'>
                    <div className="flex flex-col flex-wrap items-center justify-start w-[50%] mr-2 max-h-96">
                        <label htmlFor="ingredients">
                            Ingredientes:
                        </label>
                        <input name="ingredients" id="type" list="dataListIngredients" ref={inputSelectedIngredientRef} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <datalist id="dataListIngredients">
                            {ingredients.map(ingred => {
                                // para que no se rompa
                                if (typeof ingred === 'string') {
                                    return <option value={ingred} key={ingred}></option>
                                } else {
                                    return null;
                                }
                            })}
                        </datalist>
                        <button onClick={handleOnClickAddIngredient} className="p-1 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol">
                            Añadir Ingrediente
                        </button>
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.ingredients}</span>
                        </Fade>
                        <div className="flex flex-col flex-wrap items-start justify-end w-full mt-2 ml-1 max-h-36">
                            {
                                selectedIngredients.map((ingred) => {
                                    return (
                                        <div className='flex mt-1 mr-1 text-left w-fit justify-evenly'>
                                            <span className='m-1'>
                                                -{ingred}
                                            </span>
                                            <button value={ingred} onClick={handleOnclickXIngredient} className='p-1 rounded-lg shadow-sm h-fit bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol'>
                                                X
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap items-center justify-start w-[50%] mr-2 max-h-96 ">
                        <label htmlFor="types">
                            Tipos:
                        </label>
                        <input name="types" id="type" list="dataListTypes" ref={inputSelectedTypeRef} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <datalist id="dataListTypes">
                            {types.map(type => {
                                if (typeof type === 'string') {
                                    return <option value={type} key={type}></option>
                                } else {
                                    return null;
                                }
                            })}
                        </datalist>
                        <button onClick={handleOnClickAddType} className="p-1 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol">
                            Añadir Tipo
                        </button>
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.types}</span>
                        </Fade>
                        <div className="flex flex-col flex-wrap items-center justify-center w-[50%] mr-2 max-h-36">
                            {
                                selectedTypes.map((type) => {
                                    return (
                                        <div className='flex justify-between m-1 text-left'>
                                            <span className='m-1'>-{type} </span>
                                            <button value={type} onClick={handleOnclickXType} className='p-1 rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol'>
                                                X
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>



                <div className="flex flex-col items-center justify-start w-56 mt-5 h-36">
                    <label htmlFor="image">
                        Imagen (url):
                    </label>
                    <div>
                        <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="p-1 mb-3 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol" />

                        <button type="button" onClick={handleSubmitFile} className="p-1 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol">
                            aceptar
                        </button>
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{!newChocolate.image && " Inserte imágen"}</span>
                        </Fade>

                    </div>
                </div>
                <input type="submit" value="Crear Producto" className='p-1 mb-4 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol' />
            </form>

            <div className='w-[50%] h-full flex flex-col justify-center items-center '>
                <h2 className="text-2xl text-chocolate-blanco">
                    Pre-Visualización
                </h2>
                <CreateProdCard name={newChocolate.name} image={previewSource} price={newChocolate.price} ingredients={newChocolate.ingredients} type={newChocolate.types} categories={newChocolate.categories} />
            </div>
            <div className={style.modal} style={{ display: showModalOk ? 'flex' : 'none' }}>
                <div className={style.modalContent}>
                    <h2>Producto Creado!</h2>
                    <button onClick={handleSaveOk}>OK</button>
                </div>
            </div>
            <div className={style.modal} style={{ display: showModalNotOk ? 'flex' : 'none' }}>
                <div className={style.modalContent}>
                    <h2>Producto no creado, verifica errores en el formulario!</h2>
                    <button onClick={handleSaveNotOk}>OK</button>
                </div>
            </div>
        </div>
    )
}