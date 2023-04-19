import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { GetAllCategories, getProductsAdvanceController, GetAllTypes, DeleteProduct, EditedProduct } from "../../Redux/Actions/Actions"
import style from './crud_products.module.css'
import { Link} from "react-router-dom"
import Edit from "../editProduct/editProduct"
import Paginated from "../../Components/Paginated/paginated"


export default function CrudProducts() {
   // const history = useHistory()
    const dispatch = useDispatch()

    const [queries, setQueries] = useState({
        name: "",
        category: [""],
        type: [""],
        orderBy: "",
        orderDirection: "",
        deleted:"",
        page: 1
    })

    const allProducts = useSelector((state) => state.chocolates)
    console.log("admin allProd", allProducts)
    const allCategories = useSelector((state) => state.categories)
    const allTypes = useSelector((state) => state.types)

    useEffect(() => {
        dispatch(getProductsAdvanceController(queries.name, queries.category, queries.type, queries.orderBy, queries.orderDirection, queries.page))
        dispatch(GetAllCategories())
        dispatch(GetAllTypes())
    }, [dispatch, queries])


    const handleInputChangeSearchBar = (event) => {
        setQueries({ ...queries, [event.target.name]: event.target.value })
    }

    const handleOnClickDelete = (event) => {
        event.preventDefault()
        dispatch(DeleteProduct(event.target.value))
        setQueries({...queries, deleted:event.target.value})

       //dispatch(getProductsAdvanceController())

    }

    const handleOnChangeFilter = (event) => {
        if (event.target.value !== "CATEGORIAS" && event.target.value !== "TIPOS") {
            const selectedFilter = [event.target.value]
            setQueries({ ...queries, [event.target.name]: selectedFilter })
        } else {
            setQueries({ ...queries, [event.target.name]: [""] })
        }
    }

    const handleOnClickEdit = (c) => {
        dispatch(EditedProduct(c))
    }

    return (
        
        <div>
            <div className={style.searchBar}>
                <img className={style.img} alt="lupa" src="https://res.cloudinary.com/dgxs2jcyu/image/upload/v1681582108/lupa_yidfrt.png" />
                <input type="search" name="name" value={queries.name} placeholder="Buscar Producto" onChange={handleInputChangeSearchBar} />
                <Link to="/createProduct"> <button className={style.buttonNewProd}>AGREGAR NUEVO PRODUCTO</button></Link>
            </div>
            
        <div>
            <Paginated />
        </div>

            <div className={style.container}>
                <h3 className={style.cell}>ID</h3>
                <h3 className={style.cell}>NOMBRE PRODUCTO</h3>
                <h3 className={style.cell}>PRECIO</h3>
                <h3 className={style.cell}>STOCK</h3>
                <h3 className={style.cell}>IMAGEN</h3>
                <h3 className={style.cell}>INGREDIENTES</h3>
                <select className={style.cell} name="type" onChange={handleOnChangeFilter}>
                    <option className={style.cell} value="TIPOS" defaultValue="TIPOS">TIPOS</option>
                    {
                        allTypes.map(t => {
                            return (

                                <option className={style.cell} value={t}>{t}</option>
                            )
                        })
                    }
                </select>
                <select className={style.cell} name="category" onChange={handleOnChangeFilter}>
                    <option className={style.cell} value="CATEGORIAS" defaultValue="CATEGORIAS">CATEGORIAS</option>
                    {
                        allCategories.map(c => {
                            return (

                                <option className={style.cell} value={c.name}>{c.name}</option>
                            )
                        })
                    }
                </select>

                <h3 className={style.cell}>EDITAR</h3>
                <h3 className={style.cell}>ELIMINAR</h3>

            </div>
            <div>
                {
                    allProducts.products?.map(c => {
                        return (
                            <div className={style.container}>
                                <p className={style.cell}>{c.id}</p>
                                <p className={style.cell}>{c.name}</p>
                                <p className={style.cell}>{c.price}</p>
                                <p className={style.cell}>{c.stock}</p>
                                <img src={c.image} alt={c.name} className={style.image} />
                                <div>
                                    {
                                        c.ingredients.length ? c.ingredients.map(i => {
                                            return (
                                                <p className={style.cell}>{i}</p>
                                            )
                                        }) : <p className={style.cell}>N/A</p>
                                    }
                                </div>
                                <div>
                                    {
                                        c.types.length ? c.types.map(t => {
                                            return (
                                                <p className={style.cell}>{t}</p>
                                            )
                                        }) : <p className={style.cell}>N/A</p>
                                    }
                                </div>

                                <div>
                                    {
                                        c.categories.length ? c.categories.map(t => {
                                            return (
                                                <p className={style.cell}>{t}</p>
                                            )
                                        }) : <p className={style.cell}>N/A</p>
                                    }
                                </div>

                              <Link to="/editProduct"><button className={style.cell} value={c} onClick={() => { handleOnClickEdit(c) }} >Editar</button> </Link>
                                <button className={style.cell} value={c.id} onClick={handleOnClickDelete}>Eliminar</button>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}