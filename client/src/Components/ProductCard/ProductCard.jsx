import { Link } from "react-router-dom"
import style from "./card.module.css"
const ProductCard = ({id, name, image, price}) => {
    return (
        <div className={style.container}>
            <Link className={style.cardLink} to= {`/products/${id}`}>
                <h1> {name} </h1>
                <img src={image} alt={name} className={style.pictures}/>
                <h3>{price}</h3>
            </Link>
            
        </div>
    )
}

export default ProductCard