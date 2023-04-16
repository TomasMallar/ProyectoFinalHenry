
import style from "./CreateProduct.module.css"
const CreateProdCard = ({ name, image, price, ingredients, type, categories }) => {
    return (
        <div className={style.containerCard}>
            <h1> {name} </h1>
            <img src={image} alt={name} className={style.pictures} />
            <h3>{price}</h3>
            <div>
                <h4>Ingredientes:</h4>
                {
                    ingredients.map(ing => {
                        return (
                            <div>
                                <h6>{ing}</h6>
                            </div>
                        )
                    })
                }</div>
            <div>
                <h4>Tipos:</h4>
                {
                    type.map(type => {
                        return (
                            <div>
                                <h6>{type}</h6>
                            </div>
                        )
                    })
                }</div>
            <div>
                <h4>Categorias:</h4>
                {
                    categories.map(cat => {
                        return (
                            <div>
                                <h6>{cat}</h6>
                            </div>
                        )
                    })
                }</div>



        </div>
    )
}

export default CreateProdCard