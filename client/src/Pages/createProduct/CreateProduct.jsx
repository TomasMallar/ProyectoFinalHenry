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
        if (arrayErrors.length || !newChocolate.name) {
            alert("Producto no creado verificar errores en el formulario ", '\ud83e\uddd0')
        } else {
            dispatch(addChocolate(newChocolatePost))
            alert("Felicitaciones has creado el producto !! ", '\ud83c\udf89')
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
            const response = await axios.post('http://localhost:3001/upload/product', { data: base64EncodedImage });
            console.log(response.data.secure_url)
            setNewChocolate({ ...newChocolate, image: response.data.secure_url })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="bg-[url('https://cdn.pixabay.com/photo/2017/08/01/02/10/dark-2562840_1280.jpg')] bg-cover w-full h-full flex justify-start items-center font-serif bg-chocolate-blanco text-chocolate-oscuro">

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-full p-8 w-[50%] bg-chocolate-blanco">

                <div className='flex'>
                    <div className="flex flex-col flex-wrap items-center justify-center w-56 h-36">
                        <label htmlFor="name">
                            Nombre del Producto:
                        </label>
                        <input onChange={handleOnChangeInput} type="text" name="name" placeholder="nombre del producto" value={newChocolate.name} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.name}</span>
                        </Fade>
                    </div>
                    <div className="flex flex-col flex-wrap items-center justify-center w-56 mr-2 h-36">
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

                <div className='flex'>
                    <div className="flex flex-col flex-wrap items-center justify-start w-56 mr-2 h-36">
                        <label htmlFor="stock">
                            Cantidad en stock:
                        </label>
                        <input onChange={handleOnChangeInput} type="number" name="stock" placeholder="stock del producto" value={newChocolate.stock} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                        <Fade bottom opposite cascade >
                            <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.stock}</span>
                        </Fade>
                    </div>

                    <div className="flex flex-col flex-wrap items-center justify-center w-56 mr-2 max-h-96">
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
                        <div className="flex flex-col flex-wrap items-center justify-center w-56 mr-2 h-36">
                            {
                                selectedCategories.map((type) => {
                                    return (
                                        <div >
                                            <span>{type} </span>
                                            <button value={type} onClick={handleOnclickXCategory}>X</button>
                                        </div>

                                    )

                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='flex'>
                    <div className="flex flex-col flex-wrap items-center justify-center w-56 mr-2 max-h-96">
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
                        <div className="flex flex-col flex-wrap items-center justify-center w-56 mr-2 h-36">
                            {
                                selectedIngredients.map((ingred) => {
                                    return (
                                        <div>
                                            <span>
                                                {ingred}
                                            </span>
                                            <button value={ingred} onClick={handleOnclickXIngredient}>
                                                X
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap items-center justify-center w-56 mr-2 max-h-96 ">
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
                        <div className="flex flex-col flex-wrap items-center justify-center w-56 mr-2 h-36">
                            {
                                selectedTypes.map((type) => {
                                    return (
                                        <div>
                                            <span>{type} </span>
                                            <button value={type} onClick={handleOnclickXType}>
                                                X
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>



                <div className="flex flex-col items-center justify-start w-56 h-36">
                        <label htmlFor="image">
                            Imagen (url):
                        </label>
                        <div>
                            <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState}  className="p-1 mb-3 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol"/>

                            <button type="button" onClick={handleSubmitFile} className="p-1 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol">
                                aceptar
                            </button>
                        </div>
                    </div>
                <input type="submit" value="Crear Producto" />
            </form>
            <div>
                <h2 className={style.visTitle}>
                    Pre-Visualización
                </h2>
                <CreateProdCard name={newChocolate.name} image={previewSource} price={newChocolate.price} ingredients={newChocolate.ingredients} type={newChocolate.types} categories={newChocolate.categories} />
            </div>
        </div>
    )
}