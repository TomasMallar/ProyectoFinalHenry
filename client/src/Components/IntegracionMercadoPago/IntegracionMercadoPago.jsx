import axios from "axios"
import { Link } from "react-router-dom"

export default function ButtonMP(props) {
    //const products = {
    //    bodyOrder: [
    //        {
    //            title: props.title,
    //            unit_price: props.unit_price,
    //            quantity: 1
    //        }
    //    ]
    //}

    const items = {
        cartItems: [
            {
                id: props.id,
                quantity: props.quantity
            }
        ]
    }

    const handleOnClick = () => {
        console.log(items, "soy products", props.unit_price, "soy price")
        axios.post('http://localhost:3001/payment/create-order', items)
            .then((response) => {
                console.log(response)
                window.location.href = response.data.init_point
            })
    }


    return (
        <Link to='/purchase/payment-selector'><button onClick={handleOnClick}>COMPRAR</button></Link>
    )

}