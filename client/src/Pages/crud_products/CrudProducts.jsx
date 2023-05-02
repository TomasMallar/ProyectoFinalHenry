import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { GetAllCategories, getProductsAdvanceController, DeleteProduct, EditedProduct, GetAllTypesWithId, GetAllIngredientWithId } from "../../Redux/Actions/Actions"
import style from './crud_products.module.css'
import { Link } from "react-router-dom"
import ModalMailing from "../../Components/ModalMailing/ModalMailing"
import SideBar from "../../Components/SideBar/SideBar"
import Fade from "react-reveal"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
    const pages = useSelector((state) => state.chocolates.totalPages)

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

    const handleChange = (event, value) => {
        setQueries({ ...queries, page: value });
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="flex">
            <SideBar />
            <div className="ml-4">
                <Fade cascade>
                    <p className="relative inline-block w-full px-8 py-4 text-5xl font-bold leading-tight tracking-wide uppercase rounded-lg shadow-md text-chocolate-oscuro bg-chocolate-mantecol box h-fit">
                        PRODUCTS
                    </p>
                    <div className="flex items-center justify-center p-3 h-fit ">

                        <input type="search" name="name" value={queries.name} placeholder="Buscar Producto" onChange={handleInputChangeSearchBar} className="p-2 text-base border-none shadow-sm bg-chocolate-mantecol w-45 rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom cursor-text focus:outline-chocolate-bombom" />

                        <Link to="/createProduct">
                            <button className="p-1 ml-10 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-mantecol hover:text-chocolate-oscuro">
                                AGREGAR NUEVO PRODUCTO
                            </button>
                        </Link>
                        <Link to="/editCategoryTypeIngredient">

                            <button className="p-1 ml-10 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-mantecol hover:text-chocolate-oscuro">
                                EDITAR INGREDIENTES / TIPOS / CATEGORIAS
                            </button>
                        </Link>
                        <div>
                            <button className="p-1 ml-10 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-mantecol hover:text-chocolate-oscuro" onClick={handleOpenModal}>
                                MAILING
                            </button>

                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-around border p-2.5 w-[80vw] mx-2.5">
                        <h3 className="">
                            ID
                        </h3>
                        <h3 className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                            NOMBRE PRODUCTO
                        </h3>
                        <h3 className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                            PRECIO
                        </h3>
                        <h3 className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                            STOCK
                        </h3>
                        <h3 className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                            IMAGEN
                        </h3>
                        <h3 className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                            INGREDIENTES
                        </h3>
                        <select className="w-32 mr-2 text-sm text-center h-fit basis-36 " name="type" onChange={handleOnChangeFilter}>
                            <option className="w-32 mr-2 text-sm text-center h-fit basis-36 " value="TIPOS" defaultValue="TIPOS">
                                TIPOS
                            </option>
                            {allTypes?.map(t => {
                                return (
                                    <option className="w-32 mr-2 text-sm text-center h-fit basis-36 " value={t.name}>
                                        {t.name}
                                    </option>
                                )
                            })}
                        </select>
                        <select className="w-32 mr-2 text-sm text-center h-fit basis-36 " name="category" onChange={handleOnChangeFilter}>

                            <option className="w-32 mr-2 text-sm text-center h-fit basis-36 " value="CATEGORIAS" defaultValue="CATEGORIAS">
                                CATEGORIAS
                            </option>
                            {allCategories.map(c => {
                                return (
                                    <option className="w-32 mr-2 text-sm text-center h-fit basis-36 " value={c.name}>
                                        {c.name}
                                    </option>
                                )
                            })}
                        </select>

                        <h3 className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                            EDITAR
                        </h3>
                        <h3 className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                            ELIMINAR
                        </h3>

                    </div>
                    <div>
                        {allProducts.products?.map(c => {
                            return (
                                <div key={c.id} className="flex flex-row items-center justify-around border p-2.5 w-[80vw] mx-2.5">
                                    <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                                        {c.id}
                                    </p>
                                    <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                                        {c.name}
                                    </p>
                                    <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                                        {c.price}
                                    </p>
                                    <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">
                                        {c.stock}
                                    </p>
                                    <img src={c.image} alt={c.name} className="w-24 h-16 " />

                                    <div>
                                        {c.ingredients.length ? c.ingredients.map(i => {
                                            return (

                                                <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">{i}</p>
                                            )
                                        }) : <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">N/A</p>}
                                    </div>

                                    <div>
                                        {c.types.length ? c.types.map(t => {
                                            return (
                                                <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">{t}</p>
                                            )
                                        }) : <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">N/A</p>}
                                    </div>

                                    <div>
                                        {c.categories.length ? c.categories.map(t => {
                                            return (
                                                <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">{t}</p>
                                            )
                                        }) : <p className="w-32 mr-2 text-sm text-center h-fit basis-36 ">N/A</p>}
                                    </div>

                                    <Link to="/editProduct">
                                        <button className="p-1 mx-6 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-mantecol hover:text-chocolate-oscuro" value={c} onClick={() => { handleOnClickEdit(c) }}>
                                            Editar
                                        </button>
                                    </Link>

                                    <button className="p-1 mx-6 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-mantecol hover:text-chocolate-oscuro" value={c.id} onClick={handleOnClickDelete}>
                                        Eliminar
                                    </button>

                                </div>
                            )
                        })}
                        {modalOpen && <ModalMailing onClose={handleCloseModal} />}
                    </div>

                    <Stack spacing={2} className="my-2.5 items-center">
                        <Pagination count={pages} onChange={handleChange} size="large" />
                    </Stack>

                </Fade>
            </div>
        </div>
    )
}