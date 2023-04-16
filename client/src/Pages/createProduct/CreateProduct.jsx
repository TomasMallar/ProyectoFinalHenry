import style from './CreateProduct.module.css'
import { useRef, useEffect, useState } from 'react'
import { GetAllTypes, GetAllCategories } from '../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Button from '../../Components/Button/Button'

export default function CreateProduct() {
    const inputSelectedTypeRef = useRef(null)
    const inputSelectedCategoryRef = useRef(null)
    const dispatch = useDispatch()

    const types = useSelector((state) => state.types)
    const statecategories = useSelector((state) => state.categories)
    const categories = statecategories.map(c => c.name)

    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [newChocolate, setNewChocolate] = useState({
        name:"",
        price:"",
        stock:"",
        image:"",
        types: [],
        categories:[], 
    })
    console.log("soy newChocolate", newChocolate);
    useEffect(() => {
        dispatch(GetAllTypes())
        dispatch(GetAllCategories())
    }, [dispatch])

    const handleOnChangeInput = (event) => {
        event.preventDefault()
        setNewChocolate({...newChocolate, [event.target.name]:event.target.value})
    }
    const handleOnClickAddType = (event) => {
        event.preventDefault()
        const selectedType = inputSelectedTypeRef.current.value
// eslint-disable-next-line
        if (!types.includes(selectedType)) { return alert("Elige un tipo válido!" + " " + '\ud83e\udd28') }
        if (selectedType && !selectedTypes.includes(selectedType)) {
            setSelectedTypes([...selectedTypes, selectedType])
        }
        inputSelectedTypeRef.current.value = ""
    }
    const handleOnClickAddCategory = (event) => {
        event.preventDefault()
        const selectedCategory = inputSelectedCategoryRef.current.value
// eslint-disable-next-line
        if (!categories.includes(selectedCategory)) { return alert("Elige una categoría válida!" + " " + '\ud83e\udd28') }
        if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
            setSelectedCategories([...selectedCategories, selectedCategory])
        }
        inputSelectedCategoryRef.current.value = ""
    }

    const handleOnclickXType = (event) => {
        event.preventDefault()
        if (selectedTypes.length - 1 < 1) {
            setSelectedTypes([])
        }
        const updatedSelectedTypes = selectedTypes.filter((t) => t !== event.target.value)
        setSelectedTypes(updatedSelectedTypes)
    }
    const handleOnclickXCategory = (event) => {
        event.preventDefault()
        if (selectedCategories.length - 1 < 1) {
            setSelectedCategories([])
        }
        const updatedSelectedCategories = selectedCategories.filter((c) => c !== event.target.value)
        setSelectedCategories(updatedSelectedCategories)
    }


    return (
        <div className={style.container}>
            <div className={style.formContainer}>
                <div className={style.inputContainer}>
                    <label htmlFor="name">Nombre del Producto: </label>
                    <input onChange={handleOnChangeInput} type="text" name="name" placeholder="nombre del producto" value={newChocolate.name}/>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="price">Precio: </label>
                    <input onChange={handleOnChangeInput} type="number" name="price" placeholder="precio del producto" value={newChocolate.price}/>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="stock">Cantidad en stock: </label>
                    <input onChange={handleOnChangeInput} type="number" name="stock" placeholder="stock del producto" value={newChocolate.stock}/>
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="image">Imagen (url): </label>
                    <input onChange={handleOnChangeInput} type="text" name="image" placeholder="url imagen del producto" value={newChocolate.image} />
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
                <Button text="CREAR PRODUCTO" />
            </div>
            <div>
                <h2 className={style.visTitle}>Pre-Visualización</h2>
                    <ProductCard   name={newChocolate.name} image={newChocolate.image} price={newChocolate.price} />
            </div>
        </div>
    )
}