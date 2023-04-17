import { useSelector } from "react-redux"
import style from '../createProduct/CreateProduct.module.css'
import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { GetAllCategories, GetAllIngredient, GetAllTypes, PutProduct } from "../../Redux/Actions/Actions"
import Button from "../../Components/Button/Button"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import CreateProdCard from "../createProduct/ProductCard"
import Validations from "../createProduct/validations"

export default function Edit() {

    const history = useHistory()
    const dispatch = useDispatch()

    const inputSelectedIngredientRef= useRef(null)
    const inputSelectedTypeRef = useRef(null)
    const inputSelectedCategoryRef = useRef(null)

    const editedProduct = useSelector(state => state.editedProduct)
   
    const types = useSelector((state) => state.types)
    const statecategories = useSelector((state) => state.categories)
    const categories = statecategories.map(c => c.name)
    const ingredients = useSelector((state) => state.ingredients)
    console.log(editedProduct, "soy editedProd")

    const [selectedIngredients, setSelectedIngredients] = useState(editedProduct.ingredients)
    const [selectedTypes, setSelectedTypes] = useState(editedProduct.types)
    const [selectedCategories, setSelectedCategories] = useState(editedProduct.categories)
    const [errors, setErrors] = useState({})

    const [finalEditedProduct, setFinalEditedProduct] = useState({
        id:editedProduct.id,
        name: editedProduct.name,
        price: editedProduct.price,
        stock: editedProduct.stock,
        image: editedProduct.image,
        types: editedProduct.types,
        categories: editedProduct.categories, 
        ingredients:editedProduct.ingredients, 
    })
    console.log("soy el cambio", finalEditedProduct)

    useEffect(() => {
        dispatch(GetAllCategories())
        dispatch(GetAllIngredient())
        dispatch(GetAllTypes())
        setFinalEditedProduct ({...finalEditedProduct, types:selectedTypes, ingredients:selectedIngredients, categories:selectedCategories})

    }, [dispatch,selectedCategories, selectedIngredients, selectedTypes]
    )
    const handleOnChangeInput = (event) => {
        event.preventDefault()
        setFinalEditedProduct({...finalEditedProduct, [event.target.name]:event.target.value})
        setErrors (Validations({...finalEditedProduct, [event.target.name]:event.target.value}))
    
    }
    const handleOnClickAddIngredient = (event) => {
        event.preventDefault()
        const selectedIngredient = inputSelectedIngredientRef.current.value
        if (!ingredients.includes(selectedIngredient)) { return alert("Elige un ingrediente válido!" + " " + '\ud83e\udd28') }
        if (selectedIngredient && !selectedIngredients.includes(selectedIngredient)) {
            setSelectedIngredients([...selectedIngredients, selectedIngredient])
           setErrors(Validations({...finalEditedProduct, ingredients:selectedIngredient}))
        }
        inputSelectedIngredientRef.current.value = ""
    }
    const handleOnclickXIngredient = (event) => {
        event.preventDefault()
        if (selectedIngredients.length - 1 < 1) {
            setSelectedIngredients([])
            setErrors(Validations({...finalEditedProduct, ingredients:[]}))
        }
        const updatedSelectedIngredients = selectedIngredients.filter((ing) => ing !== event.target.value)
        setSelectedIngredients(updatedSelectedIngredients)
    }
    const handleOnClickAddType = (event) => {
        event.preventDefault()
        const selectedType = inputSelectedTypeRef.current.value
        if (!types.includes(selectedType)) { return alert("Elige un tipo válido!" + " " + '\ud83e\udd28') }
        if (selectedType && !selectedTypes.includes(selectedType)) {
            setSelectedTypes([...selectedTypes, selectedType])
           setErrors(Validations({...finalEditedProduct, types:selectedType}))
        }
        inputSelectedTypeRef.current.value = ""
    }
    const handleOnclickXType = (event) => {
        event.preventDefault()
        if (selectedTypes.length - 1 < 1) {
            setSelectedTypes([])
            setErrors(Validations({...finalEditedProduct, types:[]}))
        }
        const updatedSelectedTypes = selectedTypes.filter((t) => t !== event.target.value)
        setSelectedTypes(updatedSelectedTypes)
    }
    const handleOnClickAddCategory = (event) => {
        event.preventDefault()
        const selectedCategory = inputSelectedCategoryRef.current.value
        if (!categories.includes(selectedCategory)) { return alert("Elige una categoría válida!" + " " + '\ud83e\udd28') }
        if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
            setSelectedCategories([...selectedCategories, selectedCategory])
            setErrors(Validations({...finalEditedProduct, categories:selectedCategory}))

        }
        inputSelectedCategoryRef.current.value = ""
    }
    const handleOnclickXCategory = (event) => {
        event.preventDefault()
        if (selectedCategories.length - 1 < 1) {
            setSelectedCategories([])
            setErrors(Validations({...finalEditedProduct, categories:[]}))
        }
        const updatedSelectedCategories = selectedCategories.filter((c) => c !== event.target.value)
        setSelectedCategories(updatedSelectedCategories)
    }
    const handleSubmit = (event)=> {
        event.preventDefault()
        setErrors(Validations(finalEditedProduct))
        const arrayErrors=Object.keys(errors)
        if (arrayErrors.length || !finalEditedProduct.name) {
            alert("Producto no creado verificar errores en el formulario"+ " " + '\ud83e\uddd0')
        } else {
           dispatch(PutProduct(finalEditedProduct))
           console.log(finalEditedProduct, "sooy lo que se despacha a la action")
            alert(`Has editado el producto con id ${finalEditedProduct.id} !!" + " "+ '\ud83c\udf89`)
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

    if(editedProduct.name){
    return (
        <div className={style.container}>
            <form className={style.formContainer} onSubmit={handleSubmit} >
                <div className={style.inputContainer}>
                    <label htmlFor="name">Nombre del Producto: </label>
                    <input onChange={handleOnChangeInput} type="text" name="name" placeholder="nombre del producto" value={finalEditedProduct.name} />
                    <p className={style.error}>{errors.name}</p>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="price">Precio: </label>
                    <input onChange={handleOnChangeInput} type="number" name="price" placeholder="precio del producto" value={finalEditedProduct.price} />
                    <p className={style.error}>{errors.price}</p>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="stock">Cantidad en stock: </label>
                    <input onChange={handleOnChangeInput} type="number" name="stock" placeholder="stock del producto" value={finalEditedProduct.stock} />
                    <p className={style.error}>{errors.stock}</p>
                </div>

                <div className={style.inputContainer}>
                    <label htmlFor="image">Imagen (url): </label>
                    <input onChange={handleOnChangeInput} type="text" name="image" placeholder="url imagen del producto" value={editedProduct.image} />
                    <p className={style.error}>{errors.image}</p>
                </div>

                <div className={style.inputContainer}>
                    <label htmlFor="ingredients">Ingredientes:</label>
                    <input name="ingredients" id="type" list="dataListIngredients" ref={inputSelectedIngredientRef} />
                    <datalist id="dataListIngredients">
                        {ingredients.map(ingred => {
                            return <option value={ingred} key={ingred}></option>
                        })}
                    </datalist>
                    <Button text="Añadir Ingrediente" onClick={handleOnClickAddIngredient}></Button>
                    <p className={style.error}>{errors.ingredients}</p>
                </div>
                <div className={style.inputContainer}>
                    {
                        selectedIngredients?.map((ingred) => {
                            return (
                                <div>
                                    <span>{ingred} </span>
                                    <button value={ingred} onClick={handleOnclickXIngredient}>X</button>
                                </div>

                            )

                        })
                    }
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="types">Tipos:</label>
                    <input name="types" id="type" list="dataListTypes" ref={inputSelectedTypeRef} />
                    <datalist id="dataListTypes">
                        {types.map(type => {
                            return <option value={type} key={type}></option>
                        })}
                    </datalist>
                    <Button text="Añadir Tipo" onClick={handleOnClickAddType}></Button>
                    <p className={style.error}>{errors.types}</p>
                </div>
                <div className={style.inputContainer}>
                    {
                        selectedTypes.map((type) => {
                            return (
                                <div>
                                    <span>{type} </span>
                                    <button value={type} onClick={handleOnclickXType}>X</button>
                                </div>

                            )

                        })
                    }
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="category">Categorias:</label>
                    <input name="category" id="category" list="dataListCategories" ref={inputSelectedCategoryRef} />
                    <datalist id="dataListCategories">
                        {categories.map((c) => {
                            return <option value={c} key={c}></option>
                        })}
                    </datalist>
                    <Button text="Añadir Categoria" onClick={handleOnClickAddCategory}></Button>
                    <p className={style.error}>{errors.categories}</p>
                </div>
                <div className={style.inputContainer}>

                    {
                        selectedCategories.map((type) => {
                            return (
                                <div>
                                    <span>{type} </span>
                                    <button value={type} onClick={handleOnclickXCategory}>X</button>
                                </div>

                            )

                        })
                    }
                </div>
                <input type="submit" value="Editar Producto"/>
            </form>
            <div>
                <h2 className={style.visTitle}>Pre-Visualización</h2>
                    <CreateProdCard  name={finalEditedProduct.name} image={finalEditedProduct.image} price={finalEditedProduct.price} ingredients={finalEditedProduct.ingredients} type={finalEditedProduct.types} categories={finalEditedProduct.categories} />
            </div>
        </div>
    )}
    else {
       return  <Link to="/crudProducts">Elegir producto a Editar </Link>
    }
}