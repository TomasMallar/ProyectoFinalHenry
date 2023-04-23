import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function ButtonMPTotal({ products }) {
  const history = useHistory();

  const handleOnClick = () => {
    let order
    console.log(products, 'soy products');
    axios.post('http://localhost:3001/payment/create-order', { userId: 1, cartItems: products.bodyOrder })
      .then((response) => {
        console.log("ESTA ES LA ORDER ID?", response.data.order.id);
        order = response.data.order.id;
        return axios.post('http://localhost:3001/payment/create-payment-preference', {orderId: order});
      })
      .then((mpResponse) => {
        // Guardar responseData y redirigir al componente PaymentSelector
        console.log("ESTA ES LA MP RESPONSE?", mpResponse.data);
        const responseData = mpResponse.data.id;
        console.log("ESTA ES LA MP RESPONSE?", responseData);
        history.push({
            pathname: '/purchase/payment-selector',
            state: {  responseData, order}
          });
      });
  }

  return (
    <button onClick={handleOnClick}>COMPRAR TODO</button>
  )
}