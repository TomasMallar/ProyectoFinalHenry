import style from './CreateProduct.module.css'
import { useRef, useEffect, useState } from 'react'
import { GetAllTypes, GetAllCategories, GetAllIngredient, addChocolate } from '../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import CreateProdCard from './ProductCard'
import Button from '../../Components/Button/Button'
import Validations from './validations'
import { useHistory } from 'react-router-dom'

export default function CreateProduct() {
    
    const history = useHistory()

    const inputSelectedTypeRef = useRef(null)
    const inputSelectedCategoryRef = useRef(null)
    const inputSelectedIngredientRef= useRef(null)

    const dispatch = useDispatch()

    const types = useSelector((state) => state.types)
    const statecategories = useSelector((state) => state.categories)
    const categories = statecategories.map(c => c.name)
    const ingredients = useSelector((state)=> state.ingredients)

    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [errors, setErrors] = useState({})
    const [newChocolate, setNewChocolate] = useState({
        name:"",
        price:"",
        stock:"",
        image:"",
        types: [],
        categories:[], 
        ingredients:[]
    })
    const newChocolatePost = {...newChocolate, price:Number(newChocolate.price), stock:Number(newChocolate.stock)}

    console.log("Chocolate a post",newChocolatePost)
    useEffect(() => {
        dispatch(GetAllTypes())
        dispatch(GetAllCategories())
        dispatch(GetAllIngredient())
       
        setNewChocolate ({...newChocolate, types:selectedTypes, ingredients:selectedIngredients, categories:selectedCategories})
    }, [dispatch, selectedCategories, selectedIngredients, selectedTypes])

    const handleOnChangeInput = (event) => {
        event.preventDefault()
        setErrors (Validations({...newChocolate, [event.target.name]:event.target.value}))
        setNewChocolate({...newChocolate, [event.target.name]:event.target.value})
    }
    const handleOnClickAddType = (event) => {
        event.preventDefault()
        const selectedType = inputSelectedTypeRef.current.value
        if (!types.includes(selectedType)) { return alert("Elige un tipo válido! ", '\ud83e\udd28') }
        if (selectedType && !selectedTypes.includes(selectedType)) {
            setSelectedTypes([...selectedTypes, selectedType])
            setErrors(Validations({...newChocolate, types:selectedType}))

        }
        inputSelectedTypeRef.current.value = ""
    }
    const handleOnClickAddCategory = (event) => {
        event.preventDefault()
        const selectedCategory = inputSelectedCategoryRef.current.value
        if (!categories.includes(selectedCategory)) { return alert("Elige una categoría válida! ", '\ud83e\udd28') }
        if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
            setSelectedCategories([...selectedCategories, selectedCategory])
            setErrors(Validations({...newChocolate, categories:selectedCategory}))

        }
        inputSelectedCategoryRef.current.value = ""
    }
    const handleOnClickAddIngredient = (event) => {
        event.preventDefault()
        const selectedIngredient = inputSelectedIngredientRef.current.value
        if (!ingredients.includes(selectedIngredient)) { return alert("Elige un ingrediente válido! ", '\ud83e\udd28') }
        if (selectedIngredient && !selectedIngredients.includes(selectedIngredient)) {
            setSelectedIngredients([...selectedIngredients, selectedIngredient])
            setErrors(Validations({...newChocolate, ingredients:selectedIngredient}))
        }
        inputSelectedIngredientRef.current.value = ""
    }

    const handleOnclickXType = (event) => {
        event.preventDefault()
        if (selectedTypes.length - 1 < 1) {
            setSelectedTypes([])
            setErrors(Validations({...newChocolate, types:[]}))
        }
        const updatedSelectedTypes = selectedTypes.filter((t) => t !== event.target.value)
        setSelectedTypes(updatedSelectedTypes)
    }
    const handleOnclickXCategory = (event) => {
        event.preventDefault()
        if (selectedCategories.length - 1 < 1) {
            setSelectedCategories([])
            setErrors(Validations({...newChocolate, categories:[]}))
        }
        const updatedSelectedCategories = selectedCategories.filter((c) => c !== event.target.value)
        setSelectedCategories(updatedSelectedCategories)
    }

    const handleOnclickXIngredient = (event) => {
        event.preventDefault()
        if (selectedIngredients.length - 1 < 1) {
            setSelectedIngredients([])
            setErrors(Validations({...newChocolate, ingredients:[]}))
        }
        const updatedSelectedIngredients = selectedIngredients.filter((ing) => ing !== event.target.value)
        setSelectedIngredients(updatedSelectedIngredients)
    }
   
    const handleSubmit = (event)=> {
        event.preventDefault()
        setErrors(Validations(newChocolate))
        const arrayErrors=Object.keys(errors)
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


    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.formContainer}>
                <div className={style.inputContainer}>
                    <label htmlFor="name">Nombre del Producto: </label>
                    <input onChange={handleOnChangeInput} type="text" name="name" placeholder="nombre del producto" value={newChocolate.name}/>
                    <p className={style.error}>{errors.name}</p>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="price">Precio: </label>
                    <input onChange={handleOnChangeInput} type="number" name="price" placeholder="precio del producto" value={newChocolate.price}/>
                    <p className={style.error}>{errors.price}</p>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="stock">Cantidad en stock: </label>
                    <input onChange={handleOnChangeInput} type="number" name="stock" placeholder="stock del producto" value={newChocolate.stock}/>
                    <p className={style.error}>{errors.stock}</p>
                </div>

                <div className={style.inputContainer}>
                    <label htmlFor="image">Imagen (url): </label>
                    <input onChange={handleOnChangeInput} type="text" name="image" placeholder="url imagen del producto" value={newChocolate.image} />
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
                        selectedIngredients.map((ingred) => {
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
                <input type="submit" value="Crear Producto"/>
            </form>
            <div>
                <h2 className={style.visTitle}>Pre-Visualización</h2>
                    <CreateProdCard  name={newChocolate.name} image={newChocolate.image} price={newChocolate.price} ingredients={newChocolate.ingredients} type={newChocolate.types} categories={newChocolate.categories} />
            </div>
        </div>
    )
}