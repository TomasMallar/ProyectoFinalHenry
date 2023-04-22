import axios from "axios"

export default function ButtonMP (props) {
const products = {
    bodyOrder:[
        {
            title:props.title,
            unit_price: props.unit_price,
            quantity:1
        }
    ]
}

    const handleOnClick = () => {
        console.log(products,"soy products", props.unit_price, "soy price")
        axios.post('http://localhost:3001/payment/create-order',products)
        .then((response) => {
            console.log(response)
            window.location.href = response.data.init_point
        })
    }


    return (
        <button onClick={handleOnClick}>COMPRAR</button>
    )

}