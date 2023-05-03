import { useSelector } from "react-redux"
import style from '../createProduct/CreateProduct.module.css'
import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { GetAllCategories, GetAllIngredientWithId, GetAllTypesWithId, PutProduct } from "../../Redux/Actions/Actions"
import Button from "../../Components/Button/Button"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import CreateProdCard from "../createProduct/ProductCard"
import Validations from "../createProduct/validations"
import { Fade } from "react-reveal"

export default function Edit() {

    const history = useHistory()
    const dispatch = useDispatch()

    const inputSelectedIngredientRef = useRef(null)
    const inputSelectedTypeRef = useRef(null)
    const inputSelectedCategoryRef = useRef(null)

    const editedProduct = useSelector(state => state.editedProduct)

    const stateTypes = useSelector((state) => state.types)
    const types = stateTypes.map(t => t.name)

    const statecategories = useSelector((state) => state.categories)
    const categories = statecategories.map(c => c.name)
    const stateIngredients = useSelector((state) => state.ingredients)
    const ingredients = stateIngredients.map(i => i.name)
    console.log(types, categories, ingredients, "somos lo que se filta")

    const [selectedIngredients, setSelectedIngredients] = useState(editedProduct.ingredients)
    const [selectedTypes, setSelectedTypes] = useState(editedProduct.types)
    const [selectedCategories, setSelectedCategories] = useState(editedProduct.categories)
    const [errors, setErrors] = useState({})

    const [finalEditedProduct, setFinalEditedProduct] = useState({
        id: editedProduct.id,
        name: editedProduct.name,
        price: editedProduct.price,
        stock: editedProduct.stock,
        image: editedProduct.image,
        types: editedProduct.types,
        categories: editedProduct.categories,
        ingredients: editedProduct.ingredients,
    })
    console.log("soy el cambio", finalEditedProduct)

    useEffect(() => {
        dispatch(GetAllCategories())
        dispatch(GetAllIngredientWithId())
        dispatch(GetAllIngredientWithId())
        setFinalEditedProduct({ ...finalEditedProduct, types: selectedTypes, ingredients: selectedIngredients, categories: selectedCategories })

    }, [dispatch, selectedCategories, selectedIngredients, selectedTypes]
    )
    const handleOnChangeInput = (event) => {
        event.preventDefault()
        setFinalEditedProduct({ ...finalEditedProduct, [event.target.name]: event.target.value })
        setErrors(Validations({ ...finalEditedProduct, [event.target.name]: event.target.value }))

    }
    const handleOnClickAddIngredient = (event) => {
        event.preventDefault()
        const selectedIngredient = inputSelectedIngredientRef.current.value
        if (!ingredients.includes(selectedIngredient)) { return alert("Elige un ingrediente válido! ", '\ud83e\udd28') }
        if (selectedIngredient && !selectedIngredients.includes(selectedIngredient)) {
            setSelectedIngredients([...selectedIngredients, selectedIngredient])
            setErrors(Validations({ ...finalEditedProduct, ingredients: selectedIngredient }))
        }
        inputSelectedIngredientRef.current.value = ""
    }
    const handleOnclickXIngredient = (event) => {
        event.preventDefault()
        if (selectedIngredients.length - 1 < 1) {
            setSelectedIngredients([])
            setErrors(Validations({ ...finalEditedProduct, ingredients: [] }))
        }
        const updatedSelectedIngredients = selectedIngredients.filter((ing) => ing !== event.target.value)
        setSelectedIngredients(updatedSelectedIngredients)
    }
    const handleOnClickAddType = (event) => {
        event.preventDefault()
        const selectedType = inputSelectedTypeRef.current.value
        if (!types.includes(selectedType)) { return alert("Elige un tipo válido! ", '\ud83e\udd28') }
        if (selectedType && !selectedTypes.includes(selectedType)) {
            setSelectedTypes([...selectedTypes, selectedType])
            setErrors(Validations({ ...finalEditedProduct, types: selectedType }))
        }
        inputSelectedTypeRef.current.value = ""
    }
    const handleOnclickXType = (event) => {
        event.preventDefault()
        if (selectedTypes.length - 1 < 1) {
            setSelectedTypes([])
            setErrors(Validations({ ...finalEditedProduct, types: [] }))
        }
        const updatedSelectedTypes = selectedTypes.filter((t) => t !== event.target.value)
        setSelectedTypes(updatedSelectedTypes)
    }
    const handleOnClickAddCategory = (event) => {
        event.preventDefault()
        const selectedCategory = inputSelectedCategoryRef.current.value
        if (!categories.includes(selectedCategory)) { return alert("Elige una categoría válida! ", '\ud83e\udd28') }
        if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
            setSelectedCategories([...selectedCategories, selectedCategory])
            setErrors(Validations({ ...finalEditedProduct, categories: selectedCategory }))

        }
        inputSelectedCategoryRef.current.value = ""
    }
    const handleOnclickXCategory = (event) => {
        event.preventDefault()
        if (selectedCategories.length - 1 < 1) {
            setSelectedCategories([])
            setErrors(Validations({ ...finalEditedProduct, categories: [] }))
        }
        const updatedSelectedCategories = selectedCategories.filter((c) => c !== event.target.value)
        setSelectedCategories(updatedSelectedCategories)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setErrors(Validations(finalEditedProduct))
        const arrayErrors = Object.keys(errors)
        if (arrayErrors.length || !finalEditedProduct.name) {
            alert("Producto no creado verificar errores en el formulario ", '\ud83e\uddd0')
        } else {
            dispatch(PutProduct(finalEditedProduct))
            console.log(finalEditedProduct, "sooy lo que se despacha a la action")
            alert(`Has editado el producto con id ${finalEditedProduct.id} !! " + " "+ '\ud83c\udf89`)
            setFinalEditedProduct({
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
    
    function goBack() {
        window.history.back();
    }


    if (editedProduct.name) {
        return (
            <Fade left cascade>
                <div className="bg-[url('https://cdn.pixabay.com/photo/2017/08/01/02/10/dark-2562840_1280.jpg')] bg-cover w-full h-full flex justify-start items-center font-serif bg-chocolate-blanco text-chocolate-oscuro">

                    <form className="flex flex-col items-center justify-center h-full w-[50%] bg-chocolate-blanco" onSubmit={handleSubmit} >
                        <div className="flex justify-between w-full">
                            <button className="flex items-center justify-center p-2 m-4 border-none shadow-lg w-fit h-fit bg-chocolate-oscuro text-chocolate-blanco rounded-2xl shadow-chocolate-bombom hover:bg-chocolate-bombom" onClick={goBack}>
                                <img src="https://res.cloudinary.com/dsaocvav7/image/upload/v1681707019/arrow_zxesaq.png" alt="" className="w-5 mr-4 invert " />
                                Volver
                            </button>
                        </div>

                        <div className='flex justify-between w-[100%]'>
                            <div className="flex flex-col flex-wrap items-center justify-center w-[50%] h-36">
                                <label htmlFor="name">
                                    Nombre del Producto:
                                </label>
                                <input onChange={handleOnChangeInput} type="text" name="name" placeholder="nombre del producto" value={finalEditedProduct.name} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                                <Fade bottom opposite cascade >
                                    <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.name}</span>
                                </Fade>
                            </div>
                            <div className="flex flex-col flex-wrap items-center justify-center w-[50%] mr-2 h-36">
                                <label htmlFor="price">
                                    Precio:
                                </label>
                                <input onChange={handleOnChangeInput} type="number" name="price" placeholder="precio del producto" value={finalEditedProduct.price} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                                <Fade bottom opposite cascade >
                                    <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.price}
                                    </span>
                                </Fade>
                            </div>
                        </div>

                        <div className='flex justify-evenly w-[100%]'>
                            <div className="flex flex-col flex-wrap items-center justify-start w-[40%] ml-10 h-36">
                                <label htmlFor="stock">
                                    Cantidad en stock:
                                </label>
                                <input onChange={handleOnChangeInput} type="number" name="stock" placeholder="stock del producto" value={finalEditedProduct.stock} className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                                <Fade bottom opposite cascade >
                                    <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.stock}</span>
                                </Fade>
                            </div>
                            <div className="flex flex-col flex-wrap items-center justify-start w-[60%] ml-8 max-h-96">
                                <label htmlFor="category">Categorias:</label>
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
                                                    <span className='m-1 break-words'>
                                                        -{type}
                                                    </span>
                                                    <button value={type} onClick={handleOnclickXCategory} className='p-1 rounded-lg shadow-sm h-fit bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol'>
                                                        X
                                                    </button>
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
                                        return <option value={ingred} key={ingred}></option>
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
                                        selectedIngredients?.map((ingred) => {
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
                                <input name="types" id="type" list="dataListTypes" ref={inputSelectedTypeRef}
                                    className="flex flex-col justify-between p-2 mb-3 text-base border-none shadow-sm rounded-2xl bg-chocolate-mantecol w-44 text-chocolate-oscuro shadow-chocolate-bombom focus:outline focus:outline-chocolate-oscuro" />
                                <datalist id="dataListTypes">
                                    {types.map(type => {
                                        return <option value={type} key={type}></option>
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
                                                    <span className='m-1'>
                                                        -{type}
                                                    </span>
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
                                <input onChange={handleOnChangeInput} type="text" name="image" placeholder="url imagen del producto" value={editedProduct.image} className="p-1 mb-3 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol" />

                                <Fade bottom opposite cascade >
                                    <span className="p-0 m-0 text-xs text-chocolate-bombom">{errors.image}</span>
                                </Fade>
                            </div>
                        </div>
                        <input type="submit" value="Editar Producto" className='p-1 mb-4 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-mantecol' />
                    </form>

                    <div className='w-[50%] h-full flex flex-col justify-center items-center '>
                        <h2 className="text-2xl text-chocolate-blanco">
                            Pre-Visualización
                        </h2>
                        <CreateProdCard name={finalEditedProduct.name} image={finalEditedProduct.image} price={finalEditedProduct.price} ingredients={finalEditedProduct.ingredients} type={finalEditedProduct.types} categories={finalEditedProduct.categories} />
                    </div>
                </div>
            </Fade>
        )
    }
    else {
        return (
            <Fade>
                <div className="bg-[url('https://cdn.pixabay.com/photo/2017/08/01/02/10/dark-2562840_1280.jpg')] bg-cover w-full h-screen flex justify-center items-start font-serif bg-chocolate-blanco text-chocolate-oscuro">
                    <Link to="/crudProducts">
                        <p className="text-3xl mt-7 text-chocolate-blanco hover:underline">
                            Elegir producto a Editar
                        </p>
                    </Link>
                </div>
            </Fade>
        )
    }
}