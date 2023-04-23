import axios from "axios";

export default function ButtonMPTotal({ products }) {
  const handleOnClick = () => {
    console.log(products, "soy products");
    axios.post("http://localhost:3001/payment/", products).then((response) => {
      console.log(response);
      window.open(response.data.init_point, "_blank");
    });
  };

  return <button onClick={handleOnClick}>COMPRAR TODO</button>;
}
