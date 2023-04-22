import axios from "axios"

export default function ButtonMPTotal({ products }) {

    const handleOnClick = () => {
        console.log(products, "soy products");
        axios.post('http://localhost:3001/pay/', products)
            .then((response) => {
                console.log(response);
                window.location.href = response.data.init_point;
            });
    }

    return (
        <button onClick={handleOnClick}>COMPRAR TODO</button>
    )

}
