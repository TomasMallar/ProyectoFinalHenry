import axios from "axios"
import { Link } from "react-router-dom"

export default function ButtonMPTotal({ products }) {

    const items = {
        cartItems: products.bodyOrder.map(p => {
            return {
                id: p.id,
                quantity: p.quantity
            }
        })
    }

    const handleOnClick = () => {
        console.log(items);
        axios.post('http://localhost:3001/payment/create-order', items)
            .then((response) => {
                console.log(products.bodyOrder);
            });
    }

    return (
        <Link to='/purchase/payment-selector'><button onClick={handleOnClick}>COMPRAR TODO</button></Link>
    )

}
