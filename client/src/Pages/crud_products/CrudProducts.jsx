import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { GetAllCategories, getProductsAdvanceController, DeleteProduct, EditedProduct, GetAllTypesWithId, GetAllIngredientWithId } from "../../Redux/Actions/Actions"
import style from './crud_products.module.css'
import { Link } from "react-router-dom"
import ModalMailing from "../../Components/ModalMailing/ModalMailing"
import SideBar from "../../Components/SideBar/SideBar"
import Fade from "react-reveal"


export default function CrudProducts(props) {
    // const history = useHistory()
    const dispatch = useDispatch()

    const [queries, setQueries] = useState({
        name: "",
        category: [""],
        type: [""],
        orderBy: "",
        orderDirection: "",
        deleted: "",
        edited: "",
        page: 1
    })
    const [modalOpen, setModalOpen] = useState(false);


    const allProducts = useSelector((state) => state.chocolates)
    const allCategories = useSelector((state) => state.categories)
    const allTypes = useSelector((state) => state.types)

    useEffect(() => {
        dispatch(getProductsAdvanceController(queries.name, queries.category, queries.type, queries.orderBy, queries.orderDirection, queries.page))
        dispatch(GetAllCategories())
        dispatch(GetAllTypesWithId())
        dispatch(GetAllIngredientWithId())
    }, [dispatch, queries])


    const handleInputChangeSearchBar = (event) => {
        setQueries({ ...queries, [event.target.name]: event.target.value, page: 1 })
    }

    const handleOnClickDelete = (event) => {
        dispatch(DeleteProduct(event.target.value))
        setQueries({ ...queries, deleted: event.target.value })
        dispatch(getProductsAdvanceController())

    }

    const handleOnChangeFilter = (event) => {
        if (event.target.value !== "CATEGORIAS" && event.target.value !== "TIPOS") {
            const selectedFilter = [event.target.value]
            setQueries({ ...queries, [event.target.name]: selectedFilter, page: 1 })
        } else {
            setQueries({ ...queries, [event.target.name]: [""], page: 1 })
        }
    }

    const handleOnClickEdit = (c) => {
        dispatch(EditedProduct(c))
        setQueries({ ...queries, edited: c })
    }

    //-----------------------------------------Pages-----------------------------------
    const handleonClickPages = (event) => {
        if (event.target.value > 0 && event.target.value <= allProducts.totalPages) {
            setQueries({ ...queries, page: event.target.value })
        }

    }
    const totalPages = allProducts.totalPages
    const TotalPagesArray = []
    for (let i = 1; i <= totalPages; i++) {
        TotalPagesArray.push(i)
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>

            <div className={style.cont}>
                <SideBar />
                <div className={style.totalContainer}>
                    <Fade cascade>
                        <p className={style.top}>PRODUCTS</p>
                        <div className={style.searchBar}>
                            <img className={style.img} alt="lupa" src="https://res.cloudinary.com/dgxs2jcyu/image/upload/v1681582108/lupa_yidfrt.png" />
                            <input type="search" name="name" value={queries.name} placeholder="Buscar Producto" onChange={handleInputChangeSearchBar} />
                            <Link to="/createProduct"> <button className={style.buttonNewProd}>AGREGAR NUEVO PRODUCTO</button></Link>
                            <Link to="/editCategoryTypeIngredient"> <button className={style.buttonNewProd}>EDITAR INGREDIENTES / TIPOS / CATEGORIAS</button></Link>
                            <div>
                                <button className={style.buttonNewProd} onClick={handleOpenModal}>
                                    MAILING
                                </button>
                                {modalOpen && <ModalMailing onClose={handleCloseModal} />}
                            </div>
                        </div>

                        <div className={style.pagesButtons}>
                            {/* Buttons of the Pages */}
                            <button value={1} onClick={handleonClickPages}>Inicio</button>
                            <button value={queries.page - 1} onClick={handleonClickPages}>Página anterior</button>
                            {TotalPagesArray.map(p => {
                                return <button value={p} onClick={handleonClickPages} className={Number(queries.page) === (p) ? style.selected : ''}> {p} </button>
                            })}
                            <button value={Number(queries.page) + 1} onClick={handleonClickPages}>Página Siguiente</button>
                            <button value={Number(allProducts.totalPages)} onClick={handleonClickPages}>Final</button>
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
                                {allTypes?.map(t => {
                                    return (
                                        <option className={style.cell} value={t.name}>{t.name}</option>
                                    )
                                })}
                            </select>
                            <select className={style.cell} name="category" onChange={handleOnChangeFilter}>
                                <option className={style.cell} value="CATEGORIAS" defaultValue="CATEGORIAS">CATEGORIAS</option>
                                {allCategories.map(c => {
                                    return (

                                        <option className={style.cell} value={c.name}>{c.name}</option>
                                    )
                                })}
                            </select>

                            <h3 className={style.cell}>EDITAR</h3>
                            <h3 className={style.cell}>ELIMINAR</h3>

                        </div>
                        <div>
                            {allProducts.products?.map(c => {
                                return (
                                    <div key={c.id} className={style.container}>
                                        <p className={style.cell}>{c.id}</p>
                                        <p className={style.cell}>{c.name}</p>
                                        <p className={style.cell}>{c.price}</p>
                                        <p className={style.cell}>{c.stock}</p>
                                        <img src={c.image} alt={c.name} className={style.image} />
                                        <div>
                                            {c.ingredients.length ? c.ingredients.map(i => {
                                                return (

                                                    <p className={style.cell}>{i}</p>
                                                )
                                            }) : <p className={style.cell}>N/A</p>}
                                        </div>
                                        <div>
                                            {c.types.length ? c.types.map(t => {
                                                return (
                                                    <p className={style.cell}>{t}</p>
                                                )
                                            }) : <p className={style.cell}>N/A</p>}
                                        </div>

                                        <div>
                                            {c.categories.length ? c.categories.map(t => {
                                                return (
                                                    <p className={style.cell}>{t}</p>
                                                )
                                            }) : <p className={style.cell}>N/A</p>}
                                        </div>

                                        <Link to="/editProduct"><button className={style.editButton} value={c} onClick={() => { handleOnClickEdit(c) }}>Editar</button> </Link>
                                        <button className={style.deleteButton} value={c.id} onClick={handleOnClickDelete}>Eliminar</button>

                                    </div>
                                )
                            })}
                        </div>
                    </Fade>
                </div>
            </div>
        </>
    )
}