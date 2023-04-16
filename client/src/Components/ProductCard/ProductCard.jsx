import { Link } from "react-router-dom"
import style from "./card.module.css"
const ProductCard = ({id, name, image, price, category}) => {
    return (
        <div className={style.container}>
            <button><img src={carImagen} alt=""  className={style.carImagen}/></button>
            <Link className={style.cardLink} to= {`/products/${id}`}>
                <h1> {name} </h1>
                <img src={image} alt={name} className={style.pictures}/>
                <div> {category?.map((c)=>{
                    return <p>{c}</p>
                
                })} </div>
                <h3>$ {price}</h3>
            </Link>
            
        </div>
    )
}

export default ProductCard