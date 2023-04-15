import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getChocolatesByName } from "../../Redux/Actions/Actions"
import style from './crud_products.module.css'
export default function CrudProducts() {

    const dispatch = useDispatch()
    const [queries, setQueries] = useState({
        name: "",
        category: "",
        type: "",
        orderBy: "",
        orderDirection: "",
        page: 1
    })


    useEffect(() => {
        dispatch(getChocolatesByName(queries.name))
    }, [dispatch, queries])

    const allProducts = useSelector((state) => state.chocolates)

    console.log(allProducts)
    const handleInputChangeSearchBar = (event)=>{
        const value = event.target.value
       const  property= event.target.name
        setQueries({...queries, [property]: value})
    }

    return (
        <div>
            <div className={style.searchBar}>
                <img className={style.img}  src="https://res.cloudinary.com/dgxs2jcyu/image/upload/v1681582108/lupa_yidfrt.png" />
                <input type="search" name="name" value={queries.name} placeholder="Buscar Producto" onChange={handleInputChangeSearchBar}/>
            </div>
            <div className={style.container}>
                <h3 className={style.cell}>ID</h3>
                <h3 className={style.cell}>NOMBRE PRODUCTO</h3>
                <h3 className={style.cell}>PRECIO</h3>
                <h3 className={style.cell}>STOCK</h3>
                <h3 className={style.cell}>IMAGEN</h3>
                <h3 className={style.cell}>PUNTUACION</h3>
                <h3 className={style.cell}>EDITAR</h3>
                <h3 className={style.cell}>ELIMINAR</h3>

            </div>
            <div>
                {
                    allProducts.map(c => {
                        return (
                            <div className={style.container}>
                                <p className={style.cell}>{c.id}</p>
                                <p className={style.cell}>{c.name}</p>
                                <p className={style.cell}>{c.price}</p>
                                <p className={style.cell}>{c.stock}</p>
                                <img src={c.image} alt={c.name} className={style.image} />
                                <p className={style.cell}>{c.score}</p>
                                <button className={style.cell}>Editar</button>
                                <button className={style.cell}>Eliminar</button>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}