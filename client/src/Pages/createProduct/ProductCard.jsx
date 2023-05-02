
import style from "./CreateProduct.module.css"
const CreateProdCard = ({ name, image, price, ingredients, type, categories }) => {
    return (
        <div className="border rounded border-chocolate-blanco bg-chocolate-oscuro p-2.5 w-96 max-h-full m-1 shadow-lg text-chocolate-blanco flex flex-col items-center">
            <h1 className="text-xl ">{name}</h1>
            <img src={image} alt={name} className=" w-52 h-52" />
            <h3 className="text-lg ">$ {price}</h3>

            <div className="flex justify-around w-full text-left">
                <div className="m-2 w-[35%]">
                    <h4>Ingredientes:</h4>
                    {
                        ingredients.map(ing => {
                            return (
                                <div>
                                    <h6>- {ing}</h6>
                                </div>
                            )
                        })
                    }</div>
                <div className="m-2 w-[35%]">
                    <h4>Tipos:</h4>
                    {
                        type.map(type => {
                            return (
                                <div>
                                    <h6>- {type}</h6>
                                </div>
                            )
                        })
                    }</div>
                <div className="m-2 w-[35%]">
                    <h4>Categorias:</h4>
                    {
                        categories.map(cat => {
                            return (
                                <div>
                                    <h6>- {cat}</h6>
                                </div>
                            )
                        })
                    }</div>
            </div>
        </div>
    )
}

export default CreateProdCard