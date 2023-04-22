import axios from "axios"

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
        <button onClick={handleOnClick}>COMPRAR TODO</button>
    )

}
